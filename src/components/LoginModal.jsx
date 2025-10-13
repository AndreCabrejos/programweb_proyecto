export default function LoginModal({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onClose
}) {
  return (
    <div className="modal" role="dialog" aria-modal="true">
      <div className="modal-content">
        <h2>Iniciar sesión</h2>
        <form onSubmit={onSubmit}>
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            required
          />

          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            required
          />

          <button type="submit" className="submit-btn">
            Entrar
          </button>
          <button type="button" className="close-btn" onClick={onClose}>
            Cerrar
          </button>
        </form>
      </div>
    </div>
  );
}
