import React, { useState } from "react";
import TablasClientes from "./Tablas/TablasClientes";
import TablasVentas from "./Tablas/TablasVentas";
import TablasProductos from "./Tablas/TablasProductos";
import TablasCreditos from "./Tablas/TablasCreditos";
import { obtenerReporteSemanal } from "./Conexiones/reporteServicios"; // NUEVO

import logo from './assets/logo.png'; // mismo logo del login

function Dashboard({ onLogout }) {
  const [tablaActual, setTablaActual] = useState("InventarioDiario");

  const renderTabla = () => {
    switch (tablaActual) {
      case "GestionClientes":
        return <TablasClientes />;
      case "InventarioSemanal":
        return <TablasVentas />;
      case "CreditosDocentes":
        return <TablasProductos />;
      case "CreditosEstudiantes":
        return <TablasCreditos />;
      default:
        return null;
    }
  };

  return (
    <div className="container-fluid vh-100" style={{ backgroundColor: "#f5f5f5", color: "#000" }}> {/* Fondo beige claro */}
      {/* Barra superior */}
      <header className="py-3 px-4 d-flex justify-content-between align-items-center border-bottom" style={{ backgroundColor: "#0d0d0d", borderBottom: "1px solid #d4af37" }}>
        <div className="d-flex align-items-center gap-3">
          <img src={logo} alt="Logo" style={{ width: "60px" }} />
          <div>
            <h4 className="mb-0" style={{ color: "#d4af37" }}>Bienvenido a Maida's</h4>
            <small style={{ fontStyle: "italic", color: "#f8e8c0" }}>Sabor, cuidado y alegría para tu recreo</small>
          </div>
        </div>
      </header>

      <div className="row h-100">
        {/* Barra lateral */}
        <nav className="col-md-3 col-lg-2 p-3" style={{ backgroundColor: "#1a1a1a" }}>
          <ul className="nav flex-column gap-2">
            <li>
              <button className="btn w-100" style={{ backgroundColor: "#d4af37", color: "#000" }} onClick={() => setTablaActual("GestionClientes")}>
                Gestionar Clientes
              </button>
            </li>
            <li>
              <button className="btn w-100" style={{ backgroundColor: "#d4af37", color: "#000" }} onClick={() => setTablaActual("InventarioSemanal")}>
                Gestionar Ventas
              </button>
            </li>
            <li>
              <button className="btn w-100" style={{ backgroundColor: "#d4af37", color: "#000" }} onClick={() => setTablaActual("CreditosDocentes")}>
                Gestionar Productos
              </button>
            </li>
            <li>
              <button className="btn w-100" style={{ backgroundColor: "#d4af37", color: "#000" }} onClick={() => setTablaActual("CreditosEstudiantes")}>
                Gestionar Créditos
              </button>
            </li>
            <li>
              <button
                className="btn w-100"
                style={{ backgroundColor: "#4caf50", color: "#fff" }}
                onClick={obtenerReporteSemanal}
              >
                Descargar Reporte Semanal
              </button>
            </li>
          </ul>
          <button className="btn mt-4 w-100" style={{ backgroundColor: "#a00", color: "#fff" }} onClick={onLogout}>
            Cerrar Sesión
          </button>
        </nav>

        {/* Contenido principal */}
        <main className="col-md-9 col-lg-10 p-4" style={{ backgroundColor: "#f5f5f5", color: "#000" }}>
          <h2 className="text-center mb-4" style={{ color: "#000" }}>Tablas</h2>
          <div className="border rounded p-4" style={{ backgroundColor: "#fff", color: "#000", borderColor: "#1c1c1c" }}>
            {renderTabla()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
