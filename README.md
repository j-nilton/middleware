# Atividade: Redirecionamento e Middleware

Este projeto implementa uma API REST construída com Fastify, TypeScript e Prisma ORM, integrada a um fluxo de requisições avançado utilizando middlewares globais, hooks de autenticação e mecanismos de redirecionamento condicional.

## Instalação de Dependências

### 1. Clonar o repositório
```bash
git clone https://github.com/j-nilton/middleware.git
cd middleware
```

### 2. Instalar dependências
```bash
npm install
# ou
yarn install
```

### 3. Gere o banco de dados e o client do Prisma
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Inicie o servidor
```bash
npm run dev
```
