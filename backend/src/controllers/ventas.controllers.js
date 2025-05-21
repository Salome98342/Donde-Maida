const pool = require('../db');

const getAllVentas = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM Ventas');
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const getVenta = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM Ventas WHERE id_venta = $1', [id]);

    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Venta no encontrada' });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const postVenta = async (req, res, next) => {
  try {
    const { id_cliente, fecha_venta, monto_total, tipo_pago } = req.body;

    if (!id_cliente || !fecha_venta || !monto_total || !tipo_pago) {
      return res.status(400).json({ message: 'Campos incompletos' });
    }

    const result = await pool.query(
      'INSERT INTO Ventas (id_cliente, fecha_venta, monto_total, tipo_pago) VALUES ($1, $2, $3, $4) RETURNING *',
      [id_cliente, fecha_venta, monto_total, tipo_pago]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al insertar venta:', error);
    res.status(500).json({ message: 'Error al insertar venta' });
  }
};

const deleteVenta = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM Ventas WHERE id_venta = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Venta no encontrada' });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const putVenta = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id_cliente, fecha_venta, monto_total, tipo_pago } = req.body;

    const result = await pool.query(
      'UPDATE Ventas SET id_cliente = $1, fecha_venta = $2, monto_total = $3, tipo_pago = $4 WHERE id_venta = $5 RETURNING *',
      [id_cliente, fecha_venta, monto_total, tipo_pago, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Venta no encontrada' });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllVentas,
  getVenta,
  postVenta,
  deleteVenta,
  putVenta,
};
