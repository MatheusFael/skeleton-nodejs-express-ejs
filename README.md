# Skeleton NodeJS + ExpressJS

<div align="center">

[![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-black?style=for-the-badge&logo=express)](https://expressjs.com/)
[![EJS](https://img.shields.io/badge/EJS-Template-9933cc?style=for-the-badge&logo=ejs)](https://ejs.co/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

Um repositório base completo, profissional e pronto para produção para projetos NodeJS + ExpressJS

[Recursos](#recursos) • [Instalação](#instalação) • [Uso](#uso) • [Estrutura](#estrutura-do-projeto) • [Contribuindo](#contribuindo)

</div>

---

## Sobre o Projeto

Skeleton moderno e bem estruturado para iniciar rapidamente seus projetos web com **Node.js**, **Express.js** e **EJS**. 

Inclui configuração profissional com **Prisma** para gerenciamento de banco de dados, estrutura escalável de pastas, rotas e templates prontos para uso.

**Ideal para:**
- Prototipagem rápida
- Aprendizado de Node.js + Express
- Base sólida para aplicações web
- Projetos que precisam escalar

---

## Recursos

- **Node.js + Express** - Framework web rápido e minimalista
- **EJS Template Engine** - Templates dinâmicos e eficientes
- **Prisma ORM** - Gerenciamento moderno e type-safe de banco de dados
- **Estrutura Escalável** - Organização clara de rotas, views e modelos
- **Pronto para Produção** - Configuração otimizada e segura
- **Fácil de Estender** - Arquitetura limpa e modular

---

## Tecnologias

| Tecnologia | Versão | Descrição |
|-----------|--------|-----------|
| **Node.js** | 18+ | Runtime JavaScript |
| **Express.js** | 4.x | Framework web minimalista |
| **EJS** | Latest | Template engine |
| **Prisma** | Latest | ORM moderno |

---

## Estrutura do Projeto

```
skeleton-nodejs-express-ejs/
├── bin/
│   └── www                    # Entry point da aplicacao
├── generated/
│   └── prisma/               # Arquivos gerados pelo Prisma
├── models/                    # Modelos de dados
├── prisma/
│   └── schema.prisma         # Schema do banco de dados
├── public/
│   └── stylesheets/          # Arquivos CSS e assets estaticos
├── routes/
│   ├── index.js              # Rotas principais
│   └── users.js              # Rotas de usuarios
├── views/
│   ├── layout.ejs            # Layout principal
│   ├── index.ejs             # Pagina inicial
│   ├── error.ejs             # Pagina de erro
│   └── user/                 # Templates de usuarios
├── app.js                    # Configuracao principal do Express
├── package.json              # Dependencias e scripts
└── README.md                 # Este arquivo
```

---

## Instalação

### Pré-requisitos
- **Node.js** 18 ou superior
- **npm** ou **yarn**

### Passo a Passo

#### 1. Clone o repositório

```bash
git clone https://github.com/luizpicolo/skeleton-nodejs-express-ejs.git
cd skeleton-nodejs-express-ejs
```

#### 2. Instale as dependências

```bash
npm install
```

Ou com yarn:
```bash
yarn install
```

#### 3. Configure o banco de dados

```bash
npx prisma migrate dev --name init
```

#### 4. Execute o projeto

```bash
npm start
```

#### 5. Acesse no navegador

Abra seu navegador em:
```
http://localhost:3000
```

---

## Uso

### Comandos Disponíveis

```bash
# Inicia o servidor em modo desenvolvimento
npm start

# Inicia com auto-reload (nodemon)
npm run dev

# Migra o banco de dados
npx prisma migrate dev

# Abre o Prisma Studio (visualizar dados)
npx prisma studio

# Executa a seed do banco
npx prisma db seed
```

### Estrutura de Rotas

As rotas estão organizadas em `/routes` para melhor modularização:

```javascript
// routes/index.js
router.get('/', (req, res) => {
  res.render('index', { title: 'Pagina Inicial' });
});

// routes/users.js
router.get('/:id', (req, res) => {
  // Logica para buscar usuario
  res.render('user/profile', { userId: req.params.id });
});
```

### Usando Templates EJS

Os templates utilizam EJS para renderização dinâmica:

```html
<!-- views/layout.ejs -->
<!DOCTYPE html>
<html>
<head>
    <title><%= title %></title>
    <link rel="stylesheet" href="/stylesheets/style.css">
</head>
<body>
    <%- body %>
    <script src="/javascripts/app.js"></script>
</body>
</html>
```

Renderizando com dados:

```javascript
res.render('index', { 
  title: 'Bem-vindo',
  user: { name: 'João' }
});
```

### Trabalhando com Prisma

Defina seus modelos em `prisma/schema.prisma`:

```prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id    Int     @id @default(autoincrement())
  title String
  content String
  authorId Int
  author User @relation(fields: [authorId], references: [id])
}
```

Depois use nos seus controllers:

```javascript
// Criar usuario
const user = await prisma.user.create({
  data: { email: 'user@example.com', name: 'João' }
});

// Buscar usuarios
const users = await prisma.user.findMany();

// Buscar por ID com posts
const user = await prisma.user.findUnique({
  where: { id: 1 },
  include: { posts: true }
});

// Atualizar
await prisma.user.update({
  where: { id: 1 },
  data: { name: 'Novo Nome' }
});

// Deletar
await prisma.user.delete({ where: { id: 1 } });
```

---

## Schema do Banco de Dados

Exemplo completo em `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  posts Post[]
}

model Post {
  id    Int     @id @default(autoincrement())
  title String
  content String
  published Boolean @default(false)
  authorId Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  author User @relation(fields: [authorId], references: [id], onDelete: Cascade)
}
```

---

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Banco de dados
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

# Servidor
PORT=3000
NODE_ENV=development

# Opcional
DEBUG=true
```

Exemplo de `.env.example` (para versionamento):

```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
PORT=3000
NODE_ENV=development
```

---

## Estrutura de Pastas Recomendada

Para projetos maiores, considere expandir assim:

```
src/
├── controllers/         # Logica de negocio
├── middleware/          # Middlewares customizados
├── services/            # Servicos reutilizaveis
├── utils/              # Funcoes auxiliares
├── validators/         # Validacoes
└── config/             # Arquivos de configuracao
```

---

## Boas Praticas

1. **Sempre use variáveis de ambiente** para senhas e chaves
2. **Valide inputs** do usuario antes de usar
3. **Use try-catch** para tratamento de erros
4. **Commit migrations** do Prisma no git
5. **Crie testes** para suas rotas e logica de negocio
6. **Use um linter** (ESLint) para codigo consistente

---

## Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faca um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudancas (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Diretrizes

- Mantenha o codigo consistente com o estilo existente
- Adicione testes para novas features
- Atualize a documentacao conforme necessario
- Use commit messages claras e descritivas

---

## Licenca

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## Autor

**Luiz Picolo**

- GitHub: [@luizpicolo](https://github.com/luizpicolo)
- Site: [luizpicolo.dev](https://luizpicolo.dev)

---

## Suporte e Duvidas

Tem dúvidas ou encontrou um bug?

- Abra uma [Issue](https://github.com/luizpicolo/skeleton-nodejs-express-ejs/issues)
- Inicie uma [Discussão](https://github.com/luizpicolo/skeleton-nodejs-express-ejs/discussions)
- Envie um email para suporte

---

<div align="center">

Made with care by [Luiz Picolo](https://github.com/luizpicolo)

Se este projeto te ajudou, considere dar uma estrela!

[⭐ Star no GitHub](https://github.com/luizpicolo/skeleton-nodejs-express-ejs)

</div>
#   s k e l e t o n - n o d e j s - e x p r e s s - e j s 
 
 