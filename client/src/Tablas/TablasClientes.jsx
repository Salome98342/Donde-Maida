import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { getClientes, createCliente, deleteCliente, updateCliente } from "../Conexiones/clienteServicios";

function TablasClientes() {
  const [clientes, setClientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [formData, setFormData] = useState({
    nombre_1: "",
    nombre_2: "",
    apellido_1: "",
    apellido_2: "",
    tipo: "",
    saldo: "",
  });

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    const data = await getClientes();
    setClientes(data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCrear = async () => {
    await createCliente(formData);
    fetchClientes();
    setShowForm(false);
  };

  const handleEliminar = async (id, nombre) => {
    const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar a: ${nombre}?`);
    if (confirmacion) {
      await deleteCliente(id);
      fetchClientes();
    }
  };

  const handleActualizar = async (cliente) => {
    const confirmacion = window.confirm(`¿Estás seguro de que deseas actualizar a: ${cliente.nombre_1} ${cliente.apellido_1}?`);
    if (!confirmacion) return;

    const password = prompt("Introduce la contraseña de administrador:");
    if (password !== "admin123") {
      alert("Contraseña incorrecta. No tienes permisos para actualizar.");
      return;
    }

    setSelectedCliente(cliente);
    setFormData({
      nombre_1: cliente.nombre_1,
      nombre_2: cliente.nombre_2,
      apellido_1: cliente.apellido_1,
      apellido_2: cliente.apellido_2,
      tipo: cliente.tipo,
      saldo: cliente.saldo,
    });
    setShowUpdateForm(true);
  };

  const handleGuardarActualizacion = async () => {
    if (!selectedCliente) return;
    await updateCliente(selectedCliente.id_cliente, formData);
    fetchClientes();
    setShowUpdateForm(false);
  };

  const clientesFiltrados = clientes.filter((cliente) =>
    `${cliente.nombre_1} ${cliente.apellido_1}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Button variant="success" onClick={() => setShowForm(true)}>Crear Cliente</Button>
      <Form.Control
        type="text"
        placeholder="Buscar cliente..."
        className="mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Tipo</th>
            <th>Saldo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientesFiltrados.map((cliente) => (
            <tr key={cliente.id_cliente}>
              <td>{cliente.id_cliente}</td>
              <td>{cliente.nombre_1} {cliente.nombre_2}</td>
              <td>{cliente.apellido_1} {cliente.apellido_2}</td>
              <td>{cliente.tipo}</td>
              <td>{cliente.saldo}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleEliminar(cliente.id_cliente, `${cliente.nombre_1} ${cliente.apellido_1}`)}
                >
                  Eliminar
                </Button>{" "}
                <Button
                  variant="warning"
                  onClick={() => handleActualizar(cliente)}
                >
                  Actualizar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Primer Nombre</Form.Label>
              <Form.Control type="text" name="nombre_1" onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Segundo Nombre</Form.Label>
              <Form.Control type="text" name="nombre_2" onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Primer Apellido</Form.Label>
              <Form.Control type="text" name="apellido_1" onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Segundo Apellido</Form.Label>
              <Form.Control type="text" name="apellido_2" onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tipo</Form.Label>
              <Form.Control type="text" name="tipo" onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Saldo</Form.Label>
              <Form.Control type="number" name="saldo" onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowForm(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleCrear}>Crear Cliente</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showUpdateForm} onHide={() => setShowUpdateForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Primer Nombre</Form.Label>
              <Form.Control type="text" name="nombre_1" value={formData.nombre_1} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Segundo Nombre</Form.Label>
              <Form.Control type="text" name="nombre_2" value={formData.nombre_2} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Primer Apellido</Form.Label>
              <Form.Control type="text" name="apellido_1" value={formData.apellido_1} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Segundo Apellido</Form.Label>
              <Form.Control type="text" name="apellido_2" value={formData.apellido_2} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tipo</Form.Label>
              <Form.Control type="text" name="tipo" value={formData.tipo} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Saldo</Form.Label>
              <Form.Control type="number" name="saldo" value={formData.saldo} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateForm(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleGuardarActualizacion}>Guardar Cambios</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TablasClientes;
