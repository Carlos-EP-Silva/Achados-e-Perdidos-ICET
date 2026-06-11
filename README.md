# 📦 Achados & Perdidos – ICET/UFAM

Sistema Web completo para registro, gerenciamento e devolução de itens perdidos no campus do ICET – UFAM.
Feito com **Node.js**, **Express**, **MySQL** e Frontend em **HTML/CSS/JS**.

## 🎯 Objetivo

Modernizar o processo de Achados e Perdidos do campus, substituindo anotações manuais por um sistema seguro, rápido e acessível tanto para alunos quanto para a equipe de guardas e administradores.

## 👤 Perfis de Usuário

| Perfil | Ações permitidas |
| :--- | :--- |
| **Usuário comum** (Aluno/Visitante) | Visualizar itens, reivindicar item, editar perfil |
| **Guarda** | Cadastrar itens, aprovar/recusar reivindicações, realizar baixa presencial |
| **Administrador** | Todas as ações + gerenciar guardas e visualizar dashboard |

## 🗂️ Estrutura do Projeto

*Retirada diretamente do PDF do código-fonte:*

```
Codigo-Fonte/
│
├── node_modules/
│
├── public/               # Frontend (HTML, CSS, JS)
│   ├── css/style.css
│   ├── script/
│   │   ├── admin.js
│   │   ├── auth.js
│   │   ├── guarda.js
│   │   ├── main.js
│   │   └── perfil.js
│   ├── uploads/          # Fotos enviadas
│   ├── admin.html
│   ├── cadastro.html
│   ├── guarda.html
│   ├── index.html
│   ├── login.html
│   └── perfil.html
│
├── src/                  # Backend (Node.js + Express)
│   ├── config/db.js
│   ├── controllers/
│   ├── middlewares/
│   └── routes/
│
├── .env
├── achados_perdidos.sql
├── package.json
└── server.js

```
## ⚙️ Tecnologias Utilizadas

### 📔 Modelagem

- **Draw.io**
- **BrModelo**

### 🖥️ Frontend
- **HTML5**
- **CSS3**
- **JavaScript (Vanilla)**
- **Bootstrap 5**

### 🛠️ Backend
- **Node.js**
- **Express.js**
- **Multer** (upload de imagens)
- **JWT** (autenticação)
- **Bcrypt.js** (hash de senhas)

### 🗄️ Banco de Dados
- **MySQL 8**
- **Script:** `achados_perdidos.sql` (Contém todas as tabelas, relacionamentos e dados iniciais)
## ▶️ Como Rodar o Projeto

### 1️⃣ Instalar dependências

- npm install

### 2️⃣ Configurar as Denpendencia no arquivo .env

``DB_HOST=localhost
DB_USER=root
DB_PASSWORD=senha
DB_NAME=achados_perdidos
JWT_SECRET=chave_super_secreta``

### 3️⃣ Importar o banco de dados
- Rode o arquivo `achados_perdidos.sql` no my sql ou xampp

### 4️⃣ Rodar o servidor

- Na diretorio em que esta o arquivo server.js abra um cmd e digite o comando:

``node server.js``
