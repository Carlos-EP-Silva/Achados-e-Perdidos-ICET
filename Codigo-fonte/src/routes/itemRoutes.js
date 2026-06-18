// itemRoutes.js
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const roleMiddleware = require('../middlewares/roleMiddleware');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// 1. Configura as credenciais da nuvem
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 2. Configura o CloudinaryStorage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'achados_perdidos_ufam',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp']
  },
});

// 3. Substitui o Multer antigo por este
const upload = multer({ 
    storage: storage, 
    limits: { fileSize: 10 * 1024 * 1024 } 
});
// --- Definição das Rotas ---

// GET /itens -> Lista tudo (Público)
router.get('/', itemController.listarItens);

// POST /itens -> Cadastra (Protegido: Apenas Guarda/Admin)
// Ordem: 1. Upload da foto -> 2. Verifica se é Guarda -> 3. Cria o item
router.post('/', upload.single('foto'), roleMiddleware.isGuarda, itemController.criarItem);

module.exports = router;