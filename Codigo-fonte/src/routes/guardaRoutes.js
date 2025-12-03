// guardaRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/guardaController');
const middleware = require('../middlewares/roleMiddleware'); // Importa a 


// Só guarda/admin vê pendências
router.get('/pendencias', middleware.isGuarda, controller.listarPendencias);
router.post('/recusar', middleware.isGuarda, controller.recusarReivindicacao);
router.post('/baixa-presencial', middleware.isGuarda, controller.baixaPresencial);
router.get('/acervo', middleware.isGuarda, controller.listarItensAcervo);
// Só guarda/admin dá baixa
router.post('/devolver', middleware.isGuarda, controller.realizarDevolucao);

module.exports = router;