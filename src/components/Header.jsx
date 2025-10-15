// src/components/Header.jsx
import React, { useState } from "react";
import "../App.css";

const Header = ({ isLoggedIn, onLoginClick, onLogoutClick, monedas, puntos = 1200, nivel = 5 }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [perfilVisible, setPerfilVisible] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const mostrarPerfil = () => {
    setPerfilVisible(true);
    setMenuOpen(false);
  };
  const cerrarPerfil = () => setPerfilVisible(false);

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
            <p><strong>Nivel:</strong> {nivel}</p>
            <p><strong>Puntos:</strong> {puntos}</p>
            <div className="barra-progreso">
              <div className="progreso" style={{ width: `${(puntos % 1000) / 10}%` }}></div>
            </div>
            <button className="cerrar-perfil" onClick={cerrarPerfil}>Cerrar</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
