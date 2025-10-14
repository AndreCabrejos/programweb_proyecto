import React, { useState } from "react";
import "./Regalos.css";

export default function Regalos({ monedas, onEnviarRegalo }) {
  // Lista de regalos disponibles
  const regalosDisponibles = [
    { id: 1, nombre: "Like", costo: 10, icono: "👍" },
    { id: 2, nombre: "Corazón", costo: 20, icono: "❤️" },
    { id: 3, nombre: "Aplausos", costo: 30, icono: "👏" },
    { id: 4, nombre: "Estrella", costo: 50, icono: "⭐" },
  ];

  // Guardamos el regalo seleccionado
  const [regaloSeleccionado, setRegaloSeleccionado] = useState(null);

  // Manejar el envío
  const handleEnviar = () => {
    if (!regaloSeleccionado) return alert("Selecciona un regalo primero.");
    if (monedas < regaloSeleccionado.costo)
      return alert("No tienes suficientes monedas.");

    onEnviarRegalo(regaloSeleccionado);
    alert(`¡Has enviado ${regaloSeleccionado.nombre}! 🎁`);
    setRegaloSeleccionado(null);
  };

  return (
    <div className="regalos-container">
      <h2>🎁 Enviar un regalo</h2>
      <p>Monedas disponibles: {monedas} 💰</p>

      <div className="lista-regalos">
        {regalosDisponibles.map((r) => (
          <div
            key={r.id}
            className={`regalo ${regaloSeleccionado?.id === r.id ? "seleccionado" : ""}`}
            onClick={() => setRegaloSeleccionado(r)}
          >
            <span className="icono">{r.icono}</span>
            <p>{r.nombre}</p>
            <small>{r.costo} monedas</small>
          </div>
        ))}
      </div>

      <button className="btn-enviar" onClick={handleEnviar}>
        Enviar regalo
      </button>
    </div>
  );
}
