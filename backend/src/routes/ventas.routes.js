const { Router } = require('express');
const { getAllVentas, getVenta, postVenta, deleteVenta, putVenta } = require('../controllers/ventas.controllers');

const router = Router();

router.get('/ventas', getAllVentas);
router.get('/ventas/:id', getVenta);
router.post('/ventas', postVenta);
router.delete('/ventas/:id', deleteVenta);
router.put('/ventas/:id', putVenta);
     

module.exports = router;
