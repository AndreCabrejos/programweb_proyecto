import { Link } from "react-router-dom";
import '../App.css';


export default function Header({ isLoggedIn, onLoginClick, onLogoutClick, monedas }) {
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
