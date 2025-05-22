import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { getCreditos, createCredito, updateCredito, deleteCredito } from "../Conexiones/creditosServicios";

function TablaCreditos() {
  const [creditos, setCreditos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id_cliente: "",
    id_venta: "",
    monto: "",
    fecha_solicitud: "",
    fecha_vencimiento: "",
    estado: "",
  });

  useEffect(() => {
    fetchCreditos();
  }, []);

  const fetchCreditos = async () => {
    const data = await getCreditos();
    setCreditos(data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCrear = async () => {
    await createCredito(formData);
    fetchCreditos();
    setShowForm(false);
  };

  const handleEliminar = async (id) => {
    const confirmacion = window.confirm("¿Está seguro de que desea eliminar este crédito?");
    if (confirmacion) {
      await deleteCredito(id);
      fetchCreditos();
    }
  };
  

  const creditosFiltrados = creditos.filter((credito) =>
    credito.estado.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Button variant="success" onClick={() => setShowForm(true)}>Crear Crédito</Button>
      <Form.Control
        type="text"
        placeholder="Buscar crédito por estado..."
        className="mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>ID Cliente</th>
            <th>ID Venta</th>
            <th>Monto</th>
            <th>Fecha Solicitud</th>
            <th>Fecha Vencimiento</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {creditosFiltrados.map((credito) => (
            <tr key={credito.id_credito}>
              <td>{credito.id_credito}</td>
              <td>{credito.id_cliente}</td>
              <td>{credito.id_venta}</td>
              <td>{credito.monto}</td>
              <td>{credito.fecha_solicitud}</td>
              <td>{credito.fecha_vencimiento}</td>
              <td>{credito.estado}</td>
              <td>
                <Button variant="danger" onClick={() => handleEliminar(credito.id_credito)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Crédito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>ID Cliente</Form.Label>
              <Form.Control type="text" name="id_cliente" onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>ID Venta</Form.Label>
              <Form.Control type="text" name="id_venta" onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Monto</Form.Label>
              <Form.Control type="number" name="monto" onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Fecha Solicitud</Form.Label>
              <Form.Control type="date" name="fecha_solicitud" onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Fecha Vencimiento</Form.Label>
              <Form.Control type="date" name="fecha_vencimiento" onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Estado</Form.Label>
              <Form.Control type="text" name="estado" onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowForm(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleCrear}>Crear Crédito</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TablaCreditos;
