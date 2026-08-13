const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Substitua por uma chave segura
const prisma = new PrismaClient();

//registro
router.post('/register', async function (req, res) {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await prisma.user.create({
      data: {
        name: username,
        password: hashedPassword,
        email,
      },
      
    });

    res.status(201).json({ message: 'User created successfully', user });
    res.render("index", { title: "Home" });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Email already in use' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

//login 
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: 3600 });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    console.error(error);

  }
});


router.get("/", (req, res) => {
  res.render("index", { title: "Home" }); // Renderiza a página 'index.ejs'
});


router.get('/login', (req, res) => {
  res.render('user/login', { title: 'Login' }); // Renderiza a página 'login.ejs'
});


router.get('/register', (req, res) => {
  res.render('user/register', { title: 'Register' }); // Renderiza a página 'register.ejs'
});

module.exports = router;