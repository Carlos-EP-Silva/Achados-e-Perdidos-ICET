// itemRoutes.js
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const roleMiddleware = require('../middlewares/roleMiddleware');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const cloudinaryConfigurado = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

// 1. Configura as credenciais da nuvem
if (cloudinaryConfigurado) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
}

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

const uploadItem = (req, res, next) => {
    if (!cloudinaryConfigurado && req.headers['content-type']?.includes('multipart/form-data')) {
        return res.status(500).json({
            message: 'Cloudinary nao configurado no servidor. Verifique as variaveis CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY e CLOUDINARY_API_SECRET no Render.'
        });
    }

    upload.single('foto')(req, res, (err) => {
        if (err) {
            console.error('Erro no upload da imagem:', err);
            return res.status(400).json({ message: err.message || 'Erro ao enviar imagem.' });
        }

        next();
    });
};
// --- Definição das Rotas ---

// GET /itens -> Lista tudo (Público)
router.get('/', itemController.listarItens);

// POST /itens -> Cadastra (Protegido: Apenas Guarda/Admin)
// Ordem: 1. Upload da foto -> 2. Verifica se é Guarda -> 3. Cria o item
router.post('/', roleMiddleware.isGuarda, uploadItem, itemController.criarItem);

module.exports = router;
