const { Router } = require('express');
const { getAllDetallesVentas, getDetalleVenta, postDetalleVenta, deleteDetalleVenta, putDetalleVenta } = require('../controllers/detalleVentas.controllers');

const router = Router();

router.get('/detalle-ventas', getAllDetallesVentas);
router.get('/detalle-ventas/:id', getDetalleVenta);
router.post('/detalle-ventas', postDetalleVenta);
router.delete('/detalle-ventas/:id', deleteDetalleVenta);
router.put('/detalle-ventas/:id', putDetalleVenta);

module.exports = router;
