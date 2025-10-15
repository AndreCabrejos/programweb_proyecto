import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginModal({ onClose, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  const handleRegisterRedirect = () => {
    onClose(); // Cierra el modal si está abierto
    navigate('/register'); // Redirige a la página de registro
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Iniciar sesión</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </form>

        {/* 🔥 Sección añadida correctamente dentro del modal */}
        <div style={{ marginTop: '1rem' }}>
          <p>¿No tienes una cuenta?</p>
          <button onClick={handleRegisterRedirect}>Crear cuenta</button>
        </div>
      </div>
    </div>
  );
}
