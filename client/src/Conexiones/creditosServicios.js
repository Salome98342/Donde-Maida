const API_URL = "http://localhost:4000/creditos";

export async function getCreditos() {
  try {
    const response = await fetch(API_URL);
    return await response.json();
  } catch (error) {
    console.error("Error obteniendo créditos:", error);
  }
}

export async function createCredito(credito) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credito),
    });
    return await response.json();
  } catch (error) {
    console.error("Error creando crédito:", error);
  }
}

export async function updateCredito(id, credito) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credito),
    });
    return await response.json();
  } catch (error) {
    console.error("Error actualizando crédito:", error);
  }
}

export async function deleteCredito(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    return await response.json();
  } catch (error) {
    console.error("Error eliminando crédito:", error);
  }
}
