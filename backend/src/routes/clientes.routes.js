const { Router } = require('express');
const { getAllClientes, getClientes, postClientes, deleteClientes, putClientes } = require('../controllers/clientes.controllers');

const router = Router();

router.get('/clientes', getAllClientes);     
router.get('/clientes/:id_cliente', getClientes);     
router.post('/clientes', postClientes);       
router.delete('/clientes/:id_cliente', deleteClientes); 
router.put('/clientes/:id_cliente', putClientes);      

module.exports = router;
