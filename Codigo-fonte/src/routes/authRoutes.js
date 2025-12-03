// authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const middleware = require('../middlewares/roleMiddleware');

// Define que quando acessarem /login via POST, chama o controller
router.post('/login', authController.login);
router.post('/register', authController.register);

// Rotas de Perfil (Protegidas pelo verifyToken)
router.get('/profile', middleware.verifyToken, authController.getProfile);
router.put('/profile', middleware.verifyToken, authController.updateProfile); // Única definição, com segurança

module.exports = router;