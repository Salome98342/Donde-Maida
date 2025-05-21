const { Router } = require('express');
const { getAllCreditos, getCredito, postCredito, deleteCredito, putCredito } = require('../controllers/creditos.controllers');

const router = Router();

router.get('/creditos', getAllCreditos);
router.get('/creditos/:id', getCredito);
router.post('/creditos', postCredito);
router.delete('/creditos/:id', deleteCredito);
router.put('/creditos/:id', putCredito);

module.exports = router;
