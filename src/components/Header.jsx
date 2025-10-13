export default function Header({ isLoggedIn, onLoginClick, onLogoutClick }) {
  return (
    <header className="header">
      <h1 className="logo">Streamoria</h1>
      <nav className="nav">
        <a href="#nosotros">Nosotros</a>
        <a href="#tyc">TyC</a>
        {isLoggedIn ? (
          <button onClick={onLogoutClick} className="logout-btn">
            Cerrar sesión
          </button>
        ) : (
          <button onClick={onLoginClick} className="login-btn">
            Iniciar sesión
          </button>
        )}
      </nav>
    </header>
  );
}
