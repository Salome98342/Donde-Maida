import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {  getProductos, createProducto, deleteProducto, updateProducto } from "../Conexiones/productosServicios";

function TablaProductos() {
  const [productos, setProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    tipo: "",
    proveedor: "",
    cantidad: "",
  });

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    const data = await getProductos();
    setProductos(data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCrear = async () => {
    await createProducto(formData);
    fetchProductos();
    setShowForm(false);
    resetFormulario();
  };

  const handleEliminar = async (id) => {
    const password = prompt("Contraseña del administrador:");
    if (password !== "admin123") {
      alert("Contraseña incorrecta.");
      return;
    }

    const confirmacion = window.confirm("¿Está seguro de que desea eliminar este producto?");
    if (confirmacion) {
      await deleteProducto(id);
      fetchProductos();
    }
  };

  const handleActualizar = (producto) => {
    const password = prompt("Contraseña del administrador:");
    if (password !== "admin123") {
      alert("Contraseña incorrecta.");
      return;
    }

    setModoEdicion(true);
    setProductoSeleccionado(producto);
    setFormData({ ...producto });
    setShowForm(true);
  };

  const handleGuardarActualizacion = async () => {
    if (!productoSeleccionado) return;

    await updateProducto(productoSeleccionado.id_producto, formData);
    fetchProductos();
    setShowForm(false);
    resetFormulario();
  };

  const resetFormulario = () => {
    setFormData({
      nombre: "",
      descripcion: "",
      precio: "",
      tipo: "",
      proveedor: "",
      cantidad: "",
    });
    setModoEdicion(false);
    setProductoSeleccionado(null);
  };

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Button variant="success" onClick={() => { setShowForm(true); setModoEdicion(false); resetFormulario(); }}>
        Crear Producto
      </Button>

      <Form.Control
        type="text"
        placeholder="Buscar producto..."
        className="mb-3 mt-2"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Tipo</th>
            <th>Proveedor</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productosFiltrados.map((producto) => (
            <tr key={producto.id_producto}>
              <td>{producto.id_producto}</td>
              <td>{producto.nombre}</td>
              <td>{producto.descripcion}</td>
              <td>{producto.precio}</td>
              <td>{producto.tipo}</td>
              <td>{producto.proveedor}</td>
              <td>{producto.cantidad}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEliminar(producto.id_producto)}
                >
                  Eliminar
                </Button>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleActualizar(producto)}
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
          <Modal.Title>{modoEdicion ? "Editar Producto" : "Agregar Producto"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                type="text"
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Proveedor</Form.Label>
              <Form.Control
                type="text"
                name="proveedor"
                value={formData.proveedor}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="number"
                name="cantidad"
                value={formData.cantidad}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowForm(false)}>Cancelar</Button>
          {modoEdicion ? (
            <Button variant="primary" onClick={handleGuardarActualizacion}>
              Guardar Cambios
            </Button>
          ) : (
            <Button variant="primary" onClick={handleCrear}>
              Crear Producto
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TablaProductos;
