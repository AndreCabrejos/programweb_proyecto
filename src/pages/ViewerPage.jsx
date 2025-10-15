
import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import CanalesRecomendados from "../components/CanalesRecomendados";
import Regalos from "../components/Regalos";
import mensajesData from "../data/mensajes.json";

import "./ViewerPage.css";


const ViewerProfileCard = ({ coins }) => {
    const [viewerData, setViewerData] = useState({
        nombre: "André",
        nivel: 5,
        puntos: 1240,
    });
    
    // Simulación de ganancia de puntos en tiempo real
    useEffect(() => {
        const interval = setInterval(() => {
            setViewerData((prev) => ({
                ...prev,
                puntos: prev.puntos + Math.floor(Math.random() * 10),
            }));
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // Cálculo del progreso al siguiente nivel (cada 1000 puntos)
    const progreso = (viewerData.puntos % 1000) / 10;

    return (
        <div className="profile-card">
            <div className="profile-header">
                <div className="profile-icon" style={{ fontSize: "60px" }}>👤</div>
                <h2 className="profile-title">Perfil de {viewerData.nombre}</h2>
            </div>
            
            {/* Sección de Progreso y Datos del Perfil (Tu Avance) */}
            <div className="progress-section mb-1">
                <div className="info-row">
                    <span className="icon">⭐</span>
                    <span className="label">Nivel:</span>
                    <strong className="value">{viewerData.nivel}</strong>
                </div>

                <div className="info-row">
                    <span className="icon">🏆</span>
                    <span className="label">Puntos:</span>
                    <strong className="value">{viewerData.puntos}</strong>
                </div>
                
                {/* Saldo de Monedas (Usamos el prop 'coins' de App.jsx) */}
                <div className="info-row coin-row">
                    <span className="icon">🪙</span> 
                    <span className="label">Saldo Actual:</span>
                    <strong className="value coin-value">{coins}</strong>
                </div>


                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progreso}%` }}></div>
                </div>
                <p className="progress-text">
                    Progreso al siguiente nivel: {progreso.toFixed(1)}%
                </p>
            </div>
        </div>
    );
};
// ----------------------------------------------------


// Componente principal que fusiona el Stream con el Chat/Sidebar
export default function ViewerPage({ monedas, setMonedas }) {


  const { canal } = useParams();
  const [mostrarRegalos, setMostrarRegalos] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [puntos, setPuntos] = useState(0);
  const [mensajes, setMensajes] = useState(mensajesData);

  const mensajesRef = useRef(null);

  // 🔹 Desplazar automáticamente hacia el final
  useEffect(() => {
    if (mensajesRef.current) {
      mensajesRef.current.scrollTop = mensajesRef.current.scrollHeight;
    }
  }, [mensajes]);

  const handleEnviarRegalo = (regalo) => {
    setMonedas((prev) => prev - regalo.costo);
    setPuntos((prev) => prev + (regalo.puntos || 0));
  };

  const handleEnviarMensaje = (e) => {
    e.preventDefault();
    if (mensaje.trim() !== "") {
      const nuevoMensaje = {
        id: mensajes.length + 1,
        usuario: "Tú",
        texto: mensaje,
      };
      setMensajes([...mensajes, nuevoMensaje]);
      setMensaje("");
      setPuntos((prev) => prev + 1); // +1 punto por mensaje
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleEnviarMensaje(e);

    }
  };

  return (

    <div className="viewer-layout">
      <aside className="viewer-canales">
        <CanalesRecomendados />
      </aside>

      <main className="viewer-stream">
        <div className="stream-video">
          🎥 Transmisión en vivo de <strong>{canal}</strong>
        </div>
        <div className="stream-info">
          <img src={`/images/${canal}.jpg`} alt={canal} className="stream-logo" />
          <div className="stream-detalle">
            <h2>{canal}</h2>
            <p className="stream-categoria">Categoría: Just Chatting</p>
          </div>
        </div>
      </main>

      <aside className="viewer-chat">
        <div className="chat-box">
          <div className="chat-mensajes" ref={mensajesRef}>
            {mensajes.map((m) => (
              <p key={m.id}>
                <strong>{m.usuario}:</strong> {m.texto}
              </p>
            ))}
          </div>
        </div>

        <form className="chat-input" onSubmit={handleEnviarMensaje}>
          <textarea
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enviar un mensaje..."
          />
          <button type="submit">➤</button>
        </form>

        <div className="chat-footer">
          <div className="puntos">
            <img src="/images/puntos.png" alt="puntos" className="icono-puntos" />
            <span>{puntos}</span>
          </div>
          <button
            className="btn-tienda"
            onClick={() => setMostrarRegalos(!mostrarRegalos)}
          >
            🏪
          </button>
        </div>

        {mostrarRegalos && (
          <Regalos
            monedas={monedas}
            onEnviarRegalo={handleEnviarRegalo}
            onClose={() => setMostrarRegalos(false)}
          />
        )}

      </aside>
    </div>
  );
}
