import { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import logo from './assets/logo.png';

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showContact, setShowContact] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      (email === "admin@example.com" && password === "123456") ||
      (email === "usuario@example.com" && password === "123456")
    ) {
      onLogin();
    } else {
      alert("Credenciales Incorrectas");
    }
  };

  const toggleContact = () => {
    setShowContact(!showContact);
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center" style={{ backgroundColor: "#0d0d0d", position: "relative" }}>
      <form onSubmit={handleSubmit} className="login-container">
        <div className="text-center mb-4">
          <img
            src={logo}
            alt="Logo Maida's"
            style={{ width: "120px", marginBottom: "0.5rem" }}
          />
          <h2 style={{ color: "#fff" }}>Bienvenido a Maida's</h2>
          <p style={{ fontStyle: "italic", fontSize: "0.9rem", color: "#d4af37" }}>
            Sabor, cuidado y alegría para tu recreo
          </p>
        </div>

        <div className="text-center mb-3">
          <p style={{ fontSize: "0.85rem", color: "#f8e8c0" }}>
            Inicia sesión para acceder al sistema de pedidos escolares
          </p>
        </div>

        <div className="mb-3">
          <label style={{ color: "#fff" }}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label style={{ color: "#fff" }}>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn w-100 mt-2" style={{ backgroundColor: "#d4af37", color: "#000" }}>
          Iniciar Sesión
        </button>

        <div className="text-center mt-3">
          <small style={{ color: "#aaa" }}>
            ¿Olvidaste tu contraseña? Contacta al administrador.
          </small>
        </div>
      </form>

      {/* Botón flotante de contacto */}
      <button
        onClick={toggleContact}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#d4af37',
          color: '#000',
          border: 'none',
          borderRadius: '30px',
          padding: '10px 15px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          cursor: 'pointer',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <FaPhoneAlt />
        Contacto
      </button>

      {/* Panel emergente de contacto */}
      {showContact && (
        <div
          style={{
            position: 'fixed',
            bottom: '70px',
            right: '20px',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '15px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
            width: '250px',
            zIndex: 999,
            color: '#333',
            fontSize: '0.9rem',
          }}
        >
          <strong>Administrador:</strong>
          <p style={{ margin: '4px 0' }}>
            Ana Rodríguez<br />
            <small>📧 admin@maidas.com</small>
          </p>
          <strong>Técnico:</strong>
          <p style={{ margin: '4px 0' }}>
            Juan Pérez<br />
            <small>📧 soporte@maidas.com</small>
          </p>
        </div>
      )}
    </div>
  );
}

export default Login;
