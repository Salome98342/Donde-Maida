const API_URL = "http://localhost:4000/ventas";

export async function getVentas() {
  try {
    const response = await fetch(API_URL);
    return await response.json();
  } catch (error) {
    console.error("Error obteniendo ventas:", error);
  }
}

export async function createVenta(venta) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(venta),
    });
    return await response.json();
  } catch (error) {
    console.error("Error creando venta:", error);
  }
}

export async function updateVenta(id, venta) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(venta),
    });
    return await response.json();
  } catch (error) {
    console.error("Error actualizando venta:", error);
  }
}

export async function deleteVenta(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  } catch (error) {
    console.error("Error eliminando venta:", error);
  }
}
