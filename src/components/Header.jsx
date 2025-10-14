import { Link, useNavigate } from 'react-router-dom';


export default function Header({ isLoggedIn, onLoginClick, onLogoutClick, monedas }) {
  const navigate = useNavigate();

  return (
    <header className="header">
      <h1 className="logo">Streamoria</h1>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/nosotros">Nosotros</Link>
        <Link to="/tyc">TyC</Link>

        {isLoggedIn && (
          <span className="coin-display" onClick={() => navigate('/comprar')}>
            💰 {monedas} monedas
          </span>
        )}

        {!isLoggedIn ? (
          <button onClick={onLoginClick}>Iniciar sesión</button>
        ) : (
          <button onClick={onLogoutClick}>Cerrar sesión</button>
        )}
      </nav>
    </header>
  );
}
