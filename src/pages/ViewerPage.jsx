import React from "react";
import Regalos from "../components/Regalos";
import "./ViewerPage.css";

export default function ViewerPage({ monedas, setMonedas }) {
  const handleEnviarRegalo = (regalo) => {
    setMonedas((prev) => prev - regalo.costo);
    console.log(`Regalo enviado: ${regalo.nombre}`);
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
    </div>
  );
}