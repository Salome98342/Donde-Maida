const pool = require('../db');

const getAllDetallesVentas = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM Detalle_Ventas");
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
};

const getDetalleVenta = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM Detalle_Ventas WHERE id_detalle_venta = $1", [id]);

        if (result.rows.length === 0)
            return res.status(404).json({ message: "Detalle de venta no encontrado" });

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const postDetalleVenta = async (req, res, next) => {
    const { id_venta, id_producto, cantidad, precio_unitario } = req.body;

    try {
        const result = await pool.query(
            "INSERT INTO Detalle_Ventas (id_venta, id_producto, cantidad, precio_unitario) VALUES ($1, $2, $3, $4) RETURNING *",
            [id_venta, id_producto, cantidad, precio_unitario]
        );

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const deleteDetalleVenta = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM Detalle_Ventas WHERE id_detalle_venta = $1", [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Detalle de venta no encontrado" });
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

const putDetalleVenta = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { id_venta, id_producto, cantidad, precio_unitario } = req.body;

        const result = await pool.query(
            "UPDATE Detalle_Ventas SET id_venta = $1, id_producto = $2, cantidad = $3, precio_unitario = $4 WHERE id_detalle_venta = $5 RETURNING *",
            [id_venta, id_producto, cantidad, precio_unitario, id]
        );

        if (result.rows.length === 0)
            return res.status(404).json({ message: "Detalle de venta no encontrado" });

        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllDetallesVentas,
    getDetalleVenta,
    postDetalleVenta,
    deleteDetalleVenta,
    putDetalleVenta
};
