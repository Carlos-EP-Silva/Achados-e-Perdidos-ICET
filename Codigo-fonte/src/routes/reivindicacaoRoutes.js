// src/routes/reivindicacaoRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/reivindicacaoController');

router.post('/', controller.reivindicarItem);

module.exports = router;