const pool = require('../db');

const getAllCreditos = async (req, res, next) => {
    try {
        const allCreditos = await pool.query("SELECT * FROM Creditos");
        res.json(allCreditos.rows);
    } catch (error) {
        next(error);
    }
};

const getCredito = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM Creditos WHERE id_credito = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Crédito no encontrado",
            });
        }

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const postCredito = async (req, res, next) => {
    const { id_cliente, id_venta, monto, fecha_solicitud, fecha_vencimiento, estado } = req.body;

    try {
        const result = await pool.query(
            "INSERT INTO Creditos (id_cliente, id_venta, monto, fecha_solicitud, fecha_vencimiento, estado) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [id_cliente, id_venta, monto, fecha_solicitud, fecha_vencimiento, estado]
        );

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const deleteCredito = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM Creditos WHERE id_credito = $1", [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Crédito no encontrado",
            });
        }

        res.json({ message: "Crédito eliminado correctamente" });
    } catch (error) {
        next(error);
    }
};

const putCredito = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { id_cliente, id_venta, monto, fecha_solicitud, fecha_vencimiento, estado } = req.body;

        const result = await pool.query(
            "UPDATE Creditos SET id_cliente = $1, id_venta = $2, monto = $3, fecha_solicitud = $4, fecha_vencimiento = $5, estado = $6 WHERE id_credito = $7 RETURNING *",
            [id_cliente, id_venta, monto, fecha_solicitud, fecha_vencimiento, estado, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Crédito no encontrado",
            });
        }

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllCreditos,
    getCredito,
    postCredito,
    deleteCredito,
    putCredito
};
