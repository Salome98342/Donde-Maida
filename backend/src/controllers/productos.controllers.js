const pool = require('../db');

const getAllProductos = async (req, res, next) => {
    try {
        const allProductos = await pool.query("SELECT * FROM Productos");
        res.json(allProductos.rows);
    } catch (error) {
        next(error);
    }
};

const getProducto = async (req, res, next) => {
    try {
        const { id_producto } = req.params;
        const result = await pool.query("SELECT * FROM Productos WHERE id_producto = $1", [id_producto]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Producto no encontrado",
            });
        }

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const postProducto = async (req, res, next) => {
    const { nombre, descripcion, precio, tipo, proveedor, cantidad } = req.body;

    try {
        const result = await pool.query(
            "INSERT INTO Productos (nombre, descripcion, precio, tipo, proveedor, cantidad) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [nombre, descripcion, precio, tipo, proveedor, cantidad]
        );

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const deleteProducto = async (req, res, next) => {
    try {
        const { id_producto } = req.params;
        const result = await pool.query("DELETE FROM Productos WHERE id_producto = $1", [id_producto]);

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Producto no encontrado",
            });
        }

        res.json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        next(error);
    }
};

const putProducto = async (req, res, next) => {
    try {
        const { id_producto } = req.params;
        const { nombre, descripcion, precio, tipo, proveedor, cantidad } = req.body;

        const result = await pool.query(
            "UPDATE Productos SET nombre = $1, descripcion = $2, precio = $3, tipo = $4, proveedor = $5, cantidad = $6 WHERE id_producto = $7 RETURNING *",
            [nombre, descripcion, precio, tipo, proveedor, cantidad, id_producto]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Producto no encontrado",
            });
        }

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllProductos,
    getProducto,
    postProducto,
    deleteProducto,
    putProducto
};
