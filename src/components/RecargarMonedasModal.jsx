import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import jsPDF from "jspdf";
import "./RecargarMonedasModal.css";

export default function RecargarMonedasModal({ onClose }) {
  const { saldo, setSaldo } = useContext(UserContext);
  const [monto, setMonto] = useState("");
  const [transaccion, setTransaccion] = useState(null);

  const simularPago = () => {
    const id = "TXN" + Date.now();
    const nueva = {
      id,
      monto: parseFloat(monto),
      fecha: new Date().toLocaleString(),
    };
    setTransaccion(nueva);
    setSaldo(prev => prev + nueva.monto);
  };

  const generarComprobante = () => {
    const doc = new jsPDF();
    doc.text("Comprobante de Recarga", 10, 10);
    doc.text(`ID Transacción: ${transaccion.id}`, 10, 20);
    doc.text(`Monto: S/. ${transaccion.monto}`, 10, 30);
    doc.text(`Fecha: ${transaccion.fecha}`, 10, 40);
    doc.save(`comprobante_${transaccion.id}.pdf`);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Recargar Monedas</h2>
        <p className="recargar-saldo">Saldo actual: S/. {saldo.toFixed(2)}</p>

        <input
          type="number"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          placeholder="Monto"
        />
        <button onClick={simularPago}>Simular Pago</button>

        {transaccion && (
          <div className="recargar-result">
            <h3>¡Recarga Exitosa!</h3>
            <p><strong>ID:</strong> {transaccion.id}</p>
            <p><strong>Monto:</strong> S/. {transaccion.monto}</p>
            <p><strong>Fecha:</strong> {transaccion.fecha}</p>
            <button onClick={generarComprobante}>
              Descargar Comprobante (PDF)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
