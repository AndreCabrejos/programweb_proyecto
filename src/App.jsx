import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import Home from './pages/Home';
import Nosotros from './pages/Nosotros';
import TyC from './pages/TyC';
import StreamerPage from './pages/StreamerPage';
import ViewerPage from './pages/ViewerPage';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (email, password) => {
    if (email === 'streamer@streamoria.com' && password === '1234') {
      setIsLoggedIn(true);
      setUserRole('streamer');
      setShowLogin(false);
      navigate('/streamer');
    } else if (email === 'viewer@streamoria.com' && password === '1234') {
      setIsLoggedIn(true);
      setUserRole('viewer');
      setShowLogin(false);
      navigate('/viewer');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    navigate('/');
  };

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setShowLogin(true)}
        onLogoutClick={handleLogout}
      />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/tyc" element={<TyC />} />
          {isLoggedIn && userRole === 'streamer' && (
            <Route path="/streamer" element={<StreamerPage />} />
          )}
          {isLoggedIn && userRole === 'viewer' && (
            <Route path="/viewer" element={<ViewerPage />} />
          )}
        </Routes>
      </main>

      <Footer />

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onLogin={handleLogin} />}
    </>
  );
}
