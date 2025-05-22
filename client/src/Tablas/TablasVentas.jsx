import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { getVentas, createVenta, deleteVenta } from "../Conexiones/ventasServicios";

function TablasVentas() {
  const [ventas, setVentas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id_cliente: "",
    fecha_venta: "",
    monto_total: "",
    tipo_pago: "",
  });

  useEffect(() => {
    fetchVentas();
  }, []);

  const fetchVentas = async () => {
    const data = await getVentas();
    setVentas(data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCrear = async () => {
    await createVenta(formData);
    fetchVentas();
    setShowForm(false);
  };

  const handleEliminar = async (id) => {
    const confirmacion = window.confirm("¿Está seguro de que desea eliminar este crédito?");
    if (confirmacion) {
      await deleteVenta(id);
      fetchVentas();
    }
  };

  const ventasFiltradas = ventas.filter((venta) =>
    venta.id_cliente.toString().includes(searchTerm)
  );

  return (
    <div>
      <Button variant="success" onClick={() => setShowForm(true)}>Registrar Venta</Button>
      <Form.Control
        type="text"
        placeholder="Buscar por ID de Cliente..."
        className="mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID Venta</th>
            <th>ID Cliente</th>
            <th>Fecha</th>
            <th>Monto Total</th>
            <th>Tipo de Pago</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventasFiltradas.map((venta) => (
            <tr key={venta.id_venta}>
              <td>{venta.id_venta}</td>
              <td>{venta.id_cliente}</td>
              <td>{venta.fecha_venta}</td>
              <td>{venta.monto_total}</td>
              <td>{venta.tipo_pago}</td>
              <td>
                <Button variant="danger" onClick={() => handleEliminar(venta.id_venta)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Registrar Venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>ID Cliente</Form.Label>
              <Form.Control type="text" name="id_cliente" onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Fecha de Venta</Form.Label>
              <Form.Control type="date" name="fecha_venta" onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Monto Total</Form.Label>
              <Form.Control type="number" name="monto_total" onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tipo de Pago</Form.Label>
              <Form.Control type="text" name="tipo_pago" onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowForm(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleCrear}>Registrar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TablasVentas;
