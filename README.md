# CRUD de Professores (Fastify + TypeScript + Prisma)

Este projeto tem como objetivo implementar um CRUD completo da entidade Teacher (Professor) utilizando as tecnologias Fastify, TypeScript e Prisma ORM.
Ele dá continuidade ao desenvolvimento anterior do CRUD de alunos (Student), expandindo a aplicação para gerenciar também o cadastro de professores no sistema.

## Instalação de Dependências

### 1. Clonar o repositório
```bash
git clone https://github.com/j-nilton/professores-crud.git
cd professores-crud
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
npx prisma studio
```
