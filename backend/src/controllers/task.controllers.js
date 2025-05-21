const pool = require('../db');

const getAllClientes = async (req, res, next) => {
    try {
        const allClientes = await pool.query("SELECT * FROM Clientes");
        res.json(allClientes.rows);
    } catch (error) {
        next(error);
    }
};

const getClientes = async (req, res, next) => {
    try {
        const { id_cliente } = req.params;
        const result = await pool.query("SELECT * FROM Clientes WHERE id_cliente = $1", [id_cliente]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Cliente no encontrado",
            });
        }

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const postClientes = async (req, res, next) => {
    const { nombre_1, nombre_2, apellido_1, apellido_2, tipo, saldo } = req.body;

    try {
        const result = await pool.query(
            "INSERT INTO Clientes (nombre_1, nombre_2, apellido_1, apellido_2, tipo, saldo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [nombre_1, nombre_2, apellido_1, apellido_2, tipo, saldo]
        );

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const deleteClientes = async (req, res, next) => {
    try {
        const { id_cliente } = req.params;
        const result = await pool.query("DELETE FROM Clientes WHERE id_cliente = $1", [id_cliente]);

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Cliente no encontrado",
            });
        }

        res.json({ message: "Cliente eliminado correctamente" });
    } catch (error) {
        next(error);
    }
};

const putClientes = async (req, res, next) => {
    try {
        const { id_cliente } = req.params;
        const { nombre_1, nombre_2, apellido_1, apellido_2, tipo, saldo } = req.body;

        const result = await pool.query(
            "UPDATE Clientes SET nombre_1 = $1, nombre_2 = $2, apellido_1 = $3, apellido_2 = $4, tipo = $5, saldo = $6 WHERE id_cliente = $7 RETURNING *",
            [nombre_1, nombre_2, apellido_1, apellido_2, tipo, saldo, id_cliente]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Cliente no encontrado",
            });
        }

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllClientes,
    getClientes,
    postClientes,
    deleteClientes,
    putClientes
};
