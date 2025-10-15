import React, { useState } from "react";
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

const Header = ({ isLoggedIn, onLoginClick, onLogoutClick, monedas, puntos = 1200 }) => {
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
      <div className="logo">Streamoria</div>
      <nav className="nav-links">
        <a href="/">Inicio</a>
        <a href="/nosotros">Nosotros</a>
        <a href="/tyc">TyC</a>

        {isLoggedIn && (
          <>
            <div className="user-menu-container">
              <button className="login-button emoji-btn" onClick={toggleMenu}>
                👤
              </button>
              {menuOpen && (
                <div className="dropdown-menu">
                  <button onClick={mostrarPerfil}>Perfil</button>
                  <button onClick={onLogoutClick}>Cerrar sesión</button>
                </div>
              )}
            </div>
            <span className="monedas-display">🪙 {monedas}</span>
          </>
        )}

        {!isLoggedIn && (
          <button className="login-button" onClick={onLoginClick}>
            Iniciar Sesión
          </button>
        )}
      </nav>

      {perfilVisible && (
        <div className="perfil-modal">
          <div className="perfil-contenido">
            <h3>Mi Perfil</h3>
            <p><strong>Nivel:</strong> {nivelActual.nivel}</p>
            <p><strong>Puntos:</strong> {puntos}</p>

            {siguienteNivel ? (
              <p className="texto-avance">
                Te faltan <strong>{puntosFaltantes}</strong> puntos para el nivel <strong>{siguienteNivel.nivel}</strong>.
              </p>
            ) : (
              <p className="texto-avance">¡Has alcanzado el nivel máximo!</p>
            )}

            <div className="barra-progreso">
              <div className="progreso" style={{ width: `${porcentaje}%` }}></div>
            </div>
            <p className="texto-progreso">
              Progreso hacia el siguiente nivel: {porcentaje.toFixed(1)}%
            </p>

            <button className="cerrar-perfil" onClick={cerrarPerfil}>Cerrar</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;