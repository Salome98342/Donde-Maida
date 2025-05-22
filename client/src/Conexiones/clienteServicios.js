const API_URL = "http://localhost:4000/clientes"; 

export async function getClientes() {
  try {
    const response = await fetch(API_URL);
    return await response.json();
  } catch (error) {
    console.error("Error obteniendo clientes:", error);
  }
}

export async function createCliente(cliente) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente),
    });
    return await response.json();
  } catch (error) {
    console.error("Error creando cliente:", error);
  }
}

export async function updateCliente(id, cliente) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente),
    });
    return await response.json();
  } catch (error) {
    console.error("Error actualizando cliente:", error);
  }
}

export async function deleteCliente(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    return await response.json();
  } catch (error) {
    console.error("Error eliminando cliente:", error);
  }
}
