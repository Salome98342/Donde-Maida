const pool = require('../db');
const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const getReporteSemanal = async (req, res, next) => {
    try {
        const result = await pool.query(`
            SELECT 
                v.id_venta,
                v.fecha_venta,
                dv.id_producto,
                dv.cantidad,
                dv.precio_unitario,
                (dv.cantidad * dv.precio_unitario) AS total_producto
            FROM 
                Ventas v
            JOIN 
                Detalle_Ventas dv ON v.id_venta = dv.id_venta
            WHERE 
                v.fecha_venta >= CURRENT_DATE - INTERVAL '7 days'
            ORDER BY 
                v.fecha_venta DESC
        `);


        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Reporte Semanal');

        worksheet.columns = [
            { header: 'ID Venta', key: 'id_venta', width: 10 },
            { header: 'Fecha Venta', key: 'fecha_venta', width: 20 },
            { header: 'ID Producto', key: 'id_producto', width: 15 },
            { header: 'Cantidad', key: 'cantidad', width: 10 },
            { header: 'Precio Unitario', key: 'precio_unitario', width: 15 },
            { header: 'Total Producto', key: 'total_producto', width: 15 }
        ];

        result.rows.forEach(row => worksheet.addRow(row));

        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            'Content-Disposition',
            'attachment; filename="reporte_semanal.xlsx"'
        );

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getReporteSemanal
};
