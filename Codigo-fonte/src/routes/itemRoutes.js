// itemRoutes.js
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const roleMiddleware = require('../middlewares/roleMiddleware'); // Importa o middleware
const multer = require('multer');
const path = require('path');

// --- Configuração do Upload de Imagens ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Formato de arquivo inválido. Apenas JPG e PNG.'), false);
    }
};

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB
    fileFilter: fileFilter
});

// --- Definição das Rotas ---

// GET /itens -> Lista tudo (Público)
router.get('/', itemController.listarItens);

// POST /itens -> Cadastra (Protegido: Apenas Guarda/Admin)
// Ordem: 1. Upload da foto -> 2. Verifica se é Guarda -> 3. Cria o item
router.post('/', upload.single('foto'), roleMiddleware.isGuarda, itemController.criarItem);

module.exports = router;