const { Router } = require('express');
const { getAllProductos, getProducto, postProducto, deleteProducto, putProducto } = require('../controllers/productos.controllers');

const router = Router();

router.get('/productos', getAllProductos);   
router.get('/productos/:id_producto', getProducto);   
router.post('/productos', postProducto);        
router.delete('/productos/:id_producto', deleteProducto); 
router.put('/productos/:id_producto', putProducto);       
module.exports = router;
