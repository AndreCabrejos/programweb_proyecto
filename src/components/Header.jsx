import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

// Definición de niveles
const niveles = [
  { nivel: 1, xp_min: 0 },
  { nivel: 2, xp_min: 100 },
  { nivel: 3, xp_min: 300 },
  { nivel: 4, xp_min: 600 },
  { nivel: 5, xp_min: 1000 },
  { nivel: 6, xp_min: 1500 },
  { nivel: 7, xp_min: 2100 },
];

const Header = ({ isLoggedIn, userRole, onLoginClick, onLogoutClick, onRecargarClick, monedas, puntos = 1200 }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [perfilVisible, setPerfilVisible] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const mostrarPerfil = () => {
    setPerfilVisible(true);
    setMenuOpen(false);
  };
  const cerrarPerfil = () => setPerfilVisible(false);

  // Cálculo de nivel actual y siguiente
  let nivelActual = niveles[0];
  let siguienteNivel = null;

  for (let i = 0; i < niveles.length; i++) {
    if (puntos >= niveles[i].xp_min) {
      nivelActual = niveles[i];
      siguienteNivel = niveles[i + 1] || null;
    } else {
      break;
    }
  }

  const xpDesdeNivelActual = puntos - nivelActual.xp_min;
  const tramoNivel = siguienteNivel ? (siguienteNivel.xp_min - nivelActual.xp_min) : 1;
  const porcentaje = siguienteNivel
    ? Math.min((xpDesdeNivelActual / tramoNivel) * 100, 100)
    : 100;

  const puntosFaltantes = siguienteNivel ? (siguienteNivel.xp_min - puntos) : 0;


  return (
    <header className="main-header">
      <div className="header-left">
        <h1 className="logo">🎥 Streamoria</h1>
        <nav className="nav-links">
          <Link to="/">Inicio</Link>
          <Link to="/nosotros">Nosotros</Link>
          <Link to="/tyc">Términos y Condiciones</Link>
          <span className="nav-emoji">🎮</span>
        </nav>
      </div>

      <div className="header-right">
        {isLoggedIn ? (
          <>
            <Link to="/comprar" className="btn-monedas">
              🪙 {monedas}
            </Link>
            <Link to="/perfil" className="btn-perfil">
              👤 Perfil
            </Link>
            <button onClick={onLogoutClick} className="btn-logout">
              Cerrar sesión
            </button>
          </>
        ) : (
          <button onClick={onLoginClick} className="btn-login">
            Iniciar sesión
          </button>
        )}
      </div>
    </header>
  );
}
