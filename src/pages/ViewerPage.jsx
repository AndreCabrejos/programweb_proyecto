// src/pages/ViewerPage.jsx
import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import CanalesRecomendados from "../components/CanalesRecomendados";
import Regalos from "../components/Regalos";
import Notificacion from "../components/Notificacion";
import mensajesData from "../data/mensajes.json";
import canalesData from "../data/canales.json";
import viewerLevelsData from "../data/viewerLevels.json";
import "./ViewerPage.css";

export default function ViewerPage({
  monedas,
  setMonedas,
  currentUserEmail,
  currentUserName,
}) {
  // clave para guardar stats por usuario
  const statsKey = currentUserEmail
    ? `viewerStats_${currentUserEmail}`
    : "viewerStats";

  const { canal } = useParams();

  // nombre que se muestra en el chat
  const displayName = currentUserName || "Tú";

  const [nivel, setNivel] = useState(() => {
    try {
      const saved = localStorage.getItem(statsKey);
      if (!saved) return 1;
      const parsed = JSON.parse(saved);
      return parsed.nivel || 1;
    } catch {
      return 1;
    }
  });

  const [puntos, setPuntos] = useState(() => {
    try {
      const saved = localStorage.getItem(statsKey);
      if (!saved) return 0;
      const parsed = JSON.parse(saved);
      return parsed.puntos || 0;
    } catch {
      return 0;
    }
  });

  const [showNotif, setShowNotif] = useState(false);
  const [mensajeNotif, setMensajeNotif] = useState("");

  const [canalSeleccionado, setCanalSeleccionado] = useState(() => {
    return (
      canalesData.find(
        (c) => c.nombre.toLowerCase() === canal.toLowerCase()
      ) || canalesData[0]
    );
  });

  const [mostrarRegalos, setMostrarRegalos] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState(mensajesData);
  const mensajesRef = useRef(null);

  const [viewerLevels] = useState(() => {
    const saved = localStorage.getItem("viewerLevels");
    return saved ? JSON.parse(saved) : viewerLevelsData;
  });

  // recargar stats cuando cambia de usuario
  useEffect(() => {
    try {
      const saved = localStorage.getItem(statsKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        setNivel(parsed.nivel || 1);
        setPuntos(parsed.puntos || 0);
      } else {
        setNivel(1);
        setPuntos(0);
      }
    } catch {
      setNivel(1);
      setPuntos(0);
    }
  }, [statsKey]);

  // actualizar canal por URL
  useEffect(() => {
    const encontrado = canalesData.find(
      (c) => c.nombre.toLowerCase() === canal.toLowerCase()
    );
    if (encontrado) setCanalSeleccionado(encontrado);
  }, [canal]);

  // scroll automático del chat
  useEffect(() => {
    if (mensajesRef.current) {
      mensajesRef.current.scrollTop = mensajesRef.current.scrollHeight;
    }
  }, [mensajes]);

  // lógica de subida de nivel
  useEffect(() => {
    const nextConfig = viewerLevels.find((l) => l.nivel === nivel + 1);
    if (!nextConfig) return;
    const puntosNecesarios = nextConfig.puntos_requeridos;

    if (puntos >= puntosNecesarios) {
      const nuevoNivel = nivel + 1;
      setNivel(nuevoNivel);
      setMensajeNotif(`🎉 ¡Has subido al nivel ${nuevoNivel}!`);
      setShowNotif(true);
    }
  }, [puntos, nivel, viewerLevels]);

  // auto-ocultar notificación
  useEffect(() => {
    if (!showNotif) return;
    const timer = setTimeout(() => setShowNotif(false), 3000);
    return () => clearTimeout(timer);
  }, [showNotif]);

  // guardar stats y avisar (Header / otros)
  useEffect(() => {
    const payload = { nivel, puntos, email: currentUserEmail || null };
    localStorage.setItem(statsKey, JSON.stringify(payload));

    window.dispatchEvent(
      new CustomEvent("viewerStatsUpdated", { detail: payload })
    );
  }, [nivel, puntos, statsKey, currentUserEmail]);

  // enviar regalo: resta monedas, suma puntos y avisa al streamer
  const handleEnviarRegalo = (regalo) => {
    setMonedas((prev) => prev - regalo.costo);
    setPuntos((prev) => prev + (regalo.puntos || 0));

    window.dispatchEvent(
      new CustomEvent("streamGift", {
        detail: {
          canal: canalSeleccionado.nombre,
          user: displayName,
          regalo,
        },
      })
    );
  };

  // enviar mensaje: +1 punto y evento para vista del streamer
  const handleEnviarMensaje = (e) => {
    e.preventDefault();
    if (!mensaje.trim()) return;

    const nuevoMensaje = {
      id: mensajes.length + 1,
      usuario: displayName,
      texto: mensaje,
      nivel,
    };

    setMensajes((prev) => [...prev, nuevoMensaje]);
    setMensaje("");
    setPuntos((prev) => prev + 1);

    window.dispatchEvent(
      new CustomEvent("streamChatMessage", {
        detail: {
          canal: canalSeleccionado.nombre,
          user: displayName,
          nivel,
          texto: mensaje,
        },
      })
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleEnviarMensaje(e);
    }
  };

  const formatNumber = (n) => n.toLocaleString("es-ES");

  const nextConfig = viewerLevels.find((l) => l.nivel === nivel + 1);
  const puntosFaltantes = nextConfig
    ? Math.max(nextConfig.puntos_requeridos - puntos, 0)
    : null;

  const progresoMiniBarra = nextConfig
    ? Math.min((puntos / nextConfig.puntos_requeridos) * 100, 100)
    : 100;

  return (
    <div className="viewer-layout">
      <aside className="viewer-canales">
        {/* Aquí sabemos que ya es viewer logueado */}
        <CanalesRecomendados isLoggedIn={true} userRole="viewer" />
      </aside>

      <main className="viewer-stream">
        <div className="stream-video">
          🎥 Transmisión en vivo de <strong>{canalSeleccionado.nombre}</strong>
        </div>

        <div className="stream-info">
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
              <p className="stream-category">
                {canalSeleccionado.categoria}
              </p>
            </div>
          </div>

          <div className="stream-right">
            <button className="btn-follow">🤍 Seguir</button>
            <div className="stream-viewers">
              <span className="person-icon">👤</span>
              <span className="num-viewers">
                {canalSeleccionado.viewers.toLocaleString()}
              </span>
              <span className="label-espectadores">Espectadores</span>
            </div>
          </div>
        </div>
      </main>

      {/* CHAT */}
      <aside className="viewer-chat">
        <div className="chat-box">
          <div className="chat-mensajes" ref={mensajesRef}>
            {mensajes.map((m) => (
              <p key={m.id}>
                <strong>
                  {m.usuario} - ⭐ Nivel {m.nivel ?? 1}:
                </strong>{" "}
                {m.texto}
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
            {/* Fila: icono + número */}
            <div className="puntos-row">
              <img
                src="/images/puntos.png"
                alt="puntos"
                className="icono-puntos"
              />
              <span className="puntos-valor">{formatNumber(puntos)}</span>
            </div>

            {/* Barra + texto debajo */}
            {nextConfig && (
              <>
                <div className="mini-barra-progreso">
                  <div
                    className="mini-barra-fill"
                    style={{ width: `${progresoMiniBarra}%` }}
                  ></div>
                </div>
                <span className="mini-texto-nivel">
                  Te faltan {formatNumber(puntosFaltantes)} pts para el nivel{" "}
                  {nextConfig.nivel}
                </span>
              </>
            )}
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

      <Notificacion
        message={mensajeNotif}
        show={showNotif}
        onClose={() => setShowNotif(false)}
      />
    </div>
  );
}
