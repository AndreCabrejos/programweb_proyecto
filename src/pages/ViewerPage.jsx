import React, { useState, useEffect } from "react";
// Importamos Regalos (asumiendo que está en components/)
import Regalos from "../components/Regalos"; 
import "./ViewerPage.css";

// ----------------------------------------------------
// Componente de la Tarjeta de Perfil/Puntos (Tu Avance)
// ----------------------------------------------------
// Recibe 'coins' como prop desde App.jsx
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
  // Función para enviar regalos (MANTENIDA del código base)
  const handleEnviarRegalo = (regalo) => {
    // Asegura que tienes suficientes monedas antes de gastar
    if (monedas >= regalo.costo) {
        setMonedas((prev) => prev - regalo.costo);
        console.log(`Regalo enviado: ${regalo.nombre}`);
    } else {
        console.error("No tienes suficientes monedas para este regalo.");
    }
  };

  return (
    <div className="viewer-page">
      <div className="stream-container">
        <h1>🎥 Transmisión en vivo</h1>
        {/* Aquí iría el reproductor de video del stream */}
        <p>Contenido del Stream simulado...</p>
      </div>

      <aside className="sidebar-chat">
        {/* Tu Tarjeta de Perfil/Puntos integrada y conectada al estado central de monedas */}
        <ViewerProfileCard coins={monedas} />

        {/* Separador visual */}
        <hr className="divider" style={{ width: '80%', margin: '20px 0' }}/>
        
        {/* Componente de Regalos (de tu compañero) */}
        <Regalos monedas={monedas} onEnviarRegalo={handleEnviarRegalo} />
      </aside>
    </div>
  );
}
