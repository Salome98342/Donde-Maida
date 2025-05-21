const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const clientes = require('./routes/clientes.routes');
const productos = require('./routes/productos.routes');
const ventas = require('./routes/ventas.routes');
const detalleVentas = require('./routes/detalleVentas.routes');
const creditos = require('./routes/creditos.routes');
const reporte = require('./routes/reporte.routes');

app.use('/', reporte);

app.use(reporte);
app.use(cors());
app.use(morgan('dev'));
app.use(express.json()); 
app.use(clientes);
app.use(productos);
app.use(ventas);
app.use(detalleVentas);
app.use(creditos);


app.use((err, req, res, next) => {
    return res.json({
        message: 'Error'
    })
}) 

app.listen(4000, () => {
    console.log('Server on port 4000');
});
