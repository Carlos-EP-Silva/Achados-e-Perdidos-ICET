// middlewares/roleMiddleware.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'chave_super_secreta_da_ufam';

// 1. Função base de verificar Token
const verifyToken = (req, res, next) => {
    console.log('--- Middleware: Verificando Token ---'); // Log para debug
    
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        console.log('Erro: Sem header Authorization');
        return res.status(403).json({ message: 'Token não fornecido.' });
    }

    const token = authHeader.split(' ')[1]; // Remove 'Bearer'

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            console.log('Erro: Token inválido ou expirado');
            return res.status(401).json({ message: 'Sessão inválida.' });
        }
        
        console.log('Sucesso: Usuário identificado ->', decoded.id);
        req.user = decoded; // Salva o usuário na requisição
        next();
    });
};

// 2. Verifica se é Guarda ou Admin
const isGuarda = [verifyToken, (req, res, next) => {
    if (req.user.tipo === 'guarda' || req.user.tipo === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Restrito a Guardas.' });
    }
}];

// 3. Verifica se é Admin
const isAdmin = [verifyToken, (req, res, next) => {
    if (req.user.tipo === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Restrito a Administradores.' });
    }
}];

// EXPORTAÇÃO PADRÃO (Isso evita o erro de "undefined")
module.exports = { verifyToken, isGuarda, isAdmin };