import { Link } from 'react-router-dom';

export default function Header({ isLoggedIn, onLoginClick, onLogoutClick }) {
  return (
    <header className="header">
      <h1 className="logo">Streamoria</h1>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/nosotros">Nosotros</Link>
        <Link to="/tyc">TyC</Link>
        {!isLoggedIn ? (
          <button onClick={onLoginClick}>Iniciar sesión</button>
        ) : (
          <button onClick={onLogoutClick}>Cerrar sesión</button>
        )}
      </nav>
    </header>
  );
}
