import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CanalesRecomendados from "../components/CanalesRecomendados";
import Regalos from "../components/Regalos";
import mensajesData from "../data/mensajes.json";
import canalesData from "../data/canales.json";
import "./ViewerPage.css";

export default function ViewerPage({ monedas, setMonedas }) {
  const { canal } = useParams();
  const [canalSeleccionado, setCanalSeleccionado] = useState(null);
  const [mostrarRegalos, setMostrarRegalos] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [puntos, setPuntos] = useState(0);
  const [mensajes, setMensajes] = useState(mensajesData);

  useEffect(() => {
    const encontrado = canalesData.find(
      (c) => c.nombre.toLowerCase() === canal.toLowerCase()
    );
    setCanalSeleccionado(encontrado || canalesData[0]);
  }, [canal]);

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
      setPuntos((prev) => prev + 1);
    }
  };

  if (!canalSeleccionado) {
    return <div className="text-white text-center mt-10">Cargando...</div>;
  }

  return (
    <div className="viewer-layout">
      {/* 🟣 Izquierda: Canales recomendados */}
      <aside className="viewer-canales">
        <CanalesRecomendados />
      </aside>

      {/* 🟢 Centro: Stream principal */}
      <main className="viewer-stream">
        <div className="stream-video">
          🎥 Transmisión en vivo de <strong>{canalSeleccionado.nombre}</strong>
        </div>

        <div className="stream-info">
          {/* Izquierda: logo + nombre + categoría */}
          <div className="stream-left">
            <img
              src={canalSeleccionado.imagen}
              alt={canalSeleccionado.nombre}
              className="stream-logo"
            />
            <div className="stream-detalle">
              <h2 className="stream-name">
                {canalSeleccionado.nombre} <span className="verified">✅</span>
              </h2>
              <p className="stream-category">{canalSeleccionado.categoria}</p>
            </div>
          </div>

          {/* Derecha: botón seguir + espectadores */}
          <div className="stream-right">
            <button className="btn-follow">🤍 Seguir</button>
            <div className="stream-viewers">
              <span className="person-icon">👤</span>
              <span className="label-espectadores">Espectadores:</span>
              <span className="num-viewers">
                {canalSeleccionado.viewers.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* 🔵 Derecha: Chat y regalos */}
      <aside className="viewer-chat">
        <div className="chat-box">
          <div className="chat-mensajes">
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
