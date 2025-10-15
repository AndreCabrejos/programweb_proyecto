import React, { useState, useEffect } from "react";
import Regalos from "../components/Regalos";
import Notificacion from "../components/Notificacion";
import "./ViewerPage.css";

export default function ViewerPage({ monedas, setMonedas }) {

  const [nivel, setNivel] = useState(1);
  const [progreso, setProgreso] = useState(0);
  const [showNotif, setShowNotif] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleEnviarRegalo = (regalo) => {
    setMonedas((prev) => prev - regalo.costo);
    console.log(`Regalo enviado: ${regalo.nombre}`);
    const nuevoProgreso = progreso + regalo.costo;
    setProgreso(nuevoProgreso);
    
    // Cada 100 puntos subes de nivel
    if (nuevoProgreso >= nivel * 100) {
      const nuevoNivel = nivel + 1;
      setNivel(nuevoNivel);
      setMensaje(`🎉 ¡Has subido al nivel ${nuevoNivel}!`);
      setShowNotif(true);
    }
  };
  
    

  return (
    <div className="viewer-page">
      <div className="stream-container">
        <h1>🎥 Transmisión en vivo</h1>
        <p>Chat y transmisión simulada aquí...</p>
      </div>

      <aside className="sidebar-chat">
        <Regalos monedas={monedas} onEnviarRegalo={handleEnviarRegalo} />
      </aside>
      {/* Notificación solo aparece cuando showNotif es true */}
      <Notificacion
        message={mensaje}
        show={showNotif}
        onClose={() => setShowNotif(false)}
      />

      
    </div>
    
    
    


    

    
  );
}