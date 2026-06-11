// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./src/config/db');

const authRoutes = require('./src/routes/authRoutes');
const itemRoutes = require('./src/routes/itemRoutes'); 
const reivindicacaoRoutes = require('./src/routes/reivindicacaoRoutes');
const guardaRoutes = require('./src/routes/guardaRoutes'); 
const adminRoutes = require('./src/routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Configuração de arquivos estáticos
app.use(express.static('public')); 
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Rotas
app.use("/", adminRoutes);
app.use('/auth', authRoutes);
app.use('/itens', itemRoutes);
app.use('/reivindicacoes', reivindicacaoRoutes); 
app.use('/guarda', guardaRoutes); 

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});