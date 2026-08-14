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

```text
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