const express = require('express');
const expensesController = require('../controllers/expensesController');
const autenticarToken = require('../middleware/authMiddleware');

const router = express.Router();

router.use(autenticarToken);

router.get('/', expensesController.listar);
router.post('/', expensesController.criar);
router.put('/:id', expensesController.atualizar);
router.delete('/:id', expensesController.remover);
router.get('/export', expensesController.exportarCsv);

module.exports = router;
