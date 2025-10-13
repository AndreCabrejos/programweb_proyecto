import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import Home from './pages/Home';
import StreamerPage from './pages/StreamerPage';
import ViewerPage from './pages/ViewerPage';
import './App.css';

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fake login con roles
  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'streamer@streamoria.com' && password === '1234') {
      setRole('streamer');
      setIsLoggedIn(true);
      setShowLogin(false);
    } else if (email === 'viewer@streamoria.com' && password === '1234') {
      setRole('viewer');
      setIsLoggedIn(true);
      setShowLogin(false);
    } else {
      alert('Credenciales incorrectas');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setRole(null);
  };

  // Render según el rol
  let content;
  if (!isLoggedIn) {
    content = <Home />;
  } else if (role === 'streamer') {
    content = <StreamerPage />;
  } else if (role === 'viewer') {
    content = <ViewerPage />;
  }

  return (
    <div className="app-container">
      <Header
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setShowLogin(true)}
        onLogoutClick={handleLogout}
      />

      <main className="main">{content}</main>

      <Footer />

      {showLogin && (
        <LoginModal
          email={email}
          password={password}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onSubmit={handleLogin}
          onClose={() => setShowLogin(false)}
        />
      )}
    </div>
  );
}
