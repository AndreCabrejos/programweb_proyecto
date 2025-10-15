import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginModal from "./components/LoginModal";
import Home from "./pages/Home";
import Nosotros from "./pages/Nosotros";
import TyC from "./pages/TyC";
import StreamerPage from "./pages/StreamerPage";
import ViewerPage from "./pages/ViewerPage";
import RegisterPage from "./pages/RegisterPage"; // ✅ Ruta de Crear Cuenta
import ComprarMonedas from './pages/ComprarMonedas'; // ✅ Ruta de Compra de Monedas

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [userRole, setUserRole] = useState(null);
  // Estado de monedas centralizado
  const [monedas, setMonedas] = useState(100); 
  const navigate = useNavigate();

  const handleLogin = (email, password) => {
    if (email === "streamer@streamoria.com" && password === "1234") {
      setIsLoggedIn(true);
      setUserRole("streamer");
      setShowLogin(false);
      navigate("/streamer");
    } else if (email === "viewer@streamoria.com" && password === "1234") {
      setIsLoggedIn(true);
      setUserRole("viewer");
      setShowLogin(false);
      navigate("/viewer");
    } else {
      // Usamos console.error en lugar de alert()
      console.error("Credenciales incorrectas");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/");
  };

  // 🪙 Función para sumar monedas
  const manejarCompraMonedas = (cantidad) => {
    setMonedas(monedas + cantidad);
  };

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setShowLogin(true)}
        onLogoutClick={handleLogout}
        monedas={monedas}
      />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/tyc" element={<TyC />} />
          
          {/* Rutas de features nuevas y fusionadas */}
          <Route path="/register" element={<RegisterPage />} /> 
          <Route path="/comprar" element={<ComprarMonedas onBuy={manejarCompraMonedas} />} />

          {isLoggedIn && userRole === 'streamer' && (
            <Route path="/streamer" element={<StreamerPage />} />
          )}
          {isLoggedIn && userRole === 'viewer' && (
            <Route
              path="/viewer"
              element={<ViewerPage monedas={monedas} setMonedas={setMonedas} />}
            />
          )}

        </Routes>
      </main>

      <Footer />

      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} onLogin={handleLogin} />
      )}
    </>
  );
}
