const API_URL = "http://localhost:4000/productos";

export async function getProductos() {
  try {
    const response = await fetch(API_URL);
    return await response.json();
  } catch (error) {
    console.error("Error obteniendo productos:", error);
  }
}

export async function createProducto(producto) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    });
    return await response.json();
  } catch (error) {
    console.error("Error creando producto:", error);
  }
}

export async function updateProducto(id, producto) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    });
    return await response.json();
  } catch (error) {
    console.error("Error actualizando producto:", error);
  }
}

export async function deleteProducto(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  } catch (error) {
    console.error("Error eliminando producto:", error);
  }
}
