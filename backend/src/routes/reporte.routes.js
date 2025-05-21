const { Router } = require('express');
const { getReporteSemanal } = require('../controllers/reporte.controllers');

const router = Router();

router.get('/reporte-semanal', getReporteSemanal);

module.exports = router;
