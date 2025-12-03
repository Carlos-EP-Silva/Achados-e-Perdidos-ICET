// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminController');
const middleware = require('../middlewares/roleMiddleware'); // Importa a segurança

router.get("/admin/dados", middleware.isAdmin, controller.getDashboardData);

router.get("/admin/guardas", middleware.isAdmin, controller.listGuards);
router.post("/admin/guardas", middleware.isAdmin, controller.createGuard);
router.delete("/admin/guardas/:id", middleware.isAdmin, controller.deleteGuard);
router.get("/admin/relatorio", middleware.isAdmin, controller.gerarRelatorio);

module.exports = router;