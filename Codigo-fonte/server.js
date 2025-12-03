// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./src/config/db');

const authRoutes = require('./src/routes/authRoutes');
const itemRoutes = require('./src/routes/itemRoutes'); 
const reivindicacaoRoutes = require('./src/routes/reivindicacaoRoutes');
const guardaRoutes = require('./src/routes/guardaRoutes'); // <--- 1. IMPORTE AQUI
const adminRoutes = require('./src/routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Configuração de arquivos estáticos (limpei as duplicatas que você tinha)
app.use(express.static('public')); 
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Rotas
app.use("/", adminRoutes);
app.use('/auth', authRoutes);
app.use('/itens', itemRoutes);
app.use('/reivindicacoes', reivindicacaoRoutes); // <--- 2. VOCÊ TINHA ESQUECIDO ESSA TAMBÉM NO USO
app.use('/guarda', guardaRoutes); // <--- 3. ADICIONE ESSA LINHA

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});