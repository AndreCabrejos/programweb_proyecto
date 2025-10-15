import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // ✅ Import correcto
import "./RecargarMonedasModal.css";

export default function RecargarMonedasModal({ monedas, setMonedas, onClose }) {
  const [monto, setMonto] = useState("");
  const [tarjeta, setTarjeta] = useState("");
  const [caducidad, setCaducidad] = useState("");
  const [cvv, setCvv] = useState("");
  const [transaccion, setTransaccion] = useState(null);
  const [cargando, setCargando] = useState(false);

  const simularPago = (e) => {
    e.preventDefault();
    if (!monto || !tarjeta || !caducidad || !cvv) {
      alert("Por favor complete todos los campos.");
      return;
    }

    setCargando(true);

    setTimeout(() => {
      const id = "TXN" + Date.now();
      const nueva = {
        id,
        monto: parseFloat(monto),
        fecha: new Date().toLocaleString(),
      };
      setTransaccion(nueva);
      setMonedas((prev) => prev + nueva.monto);
      setCargando(false);
    }, 2000); // Simula una demora de 2 segundos
  };

  const generarComprobante = () => {
    const doc = new jsPDF();
    const fecha = new Date().toLocaleString();

    // Encabezado
    doc.setFontSize(18);
    doc.text("Comprobante de Recarga", 60, 20);
    doc.setFontSize(12);
    doc.text(`ID Transacción: ${transaccion.id}`, 14, 35);
    doc.text(`Fecha: ${fecha}`, 14, 42);

    // Tabla con datos de la recarga
    autoTable(doc, {
      startY: 55,
      head: [["Detalle", "Valor"]],
      body: [
        ["Monto Recargado", `S/. ${transaccion.monto.toFixed(2)}`],
        ["Saldo Actual", `S/. ${(monedas + transaccion.monto).toFixed(2)}`],
      ],
      styles: { fontSize: 11 },
      headStyles: { fillColor: [22, 160, 133], textColor: 255 },
    });

    // Mensaje de cierre
    doc.text(
      "Gracias por su recarga. ¡Siga disfrutando de nuestros servicios!",
      14,
      doc.lastAutoTable.finalY + 10
    );

    // Guardar archivo
    doc.save(`comprobante_${transaccion.id}.pdf`);
  };

  return (
    <div className="modal-overlay">
      <div className="payment-modal">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        {cargando ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Procesando pago...</p>
          </div>
        ) : !transaccion ? (
          <>
            <div className="payment-header">
              <h2>Comercia Global Payments</h2>
            </div>

            <div className="payment-body">
              <div className="payment-amount">
                <span>Importe:</span>
                <input
                  type="number"
                  placeholder="Monto (Soles S/)"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                />
              </div>

              <h3>PAGAR CON TARJETA</h3>

              <form className="payment-form" onSubmit={simularPago}>
                <label>
                  Nº Tarjeta
                  <input
                    type="text"
                    placeholder="•••• •••• •••• ••••"
                    maxLength="19"
                    value={tarjeta}
                    onChange={(e) => setTarjeta(e.target.value)}
                  />
                </label>

                <div className="form-row">
                  <label>
                    Caducidad
                    <input
                      type="text"
                      placeholder="MM/AA"
                      maxLength="5"
                      value={caducidad}
                      onChange={(e) => setCaducidad(e.target.value)}
                    />
                  </label>
                  <label>
                    Cód. Seguridad
                    <input
                      type="text"
                      placeholder="CVV"
                      maxLength="3"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                    />
                  </label>
                </div>

                <div className="button-row">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={onClose}
                  >
                    CANCELAR
                  </button>
                  <button type="submit" className="pay-btn">
                    PAGAR
                  </button>
                </div>
              </form>

              <div className="payment-footer">
                <div className="logo-container">
                  <img src="src/assets/visa.svg" alt="Visa" />
                </div>
                <div className="logo-container">
                  <img src="src/assets/master.svg" alt="Mastercard" />
                </div>
                <div className="logo-container">
                  <img src="src/assets/american.svg" alt="American Express" />
                </div>
                <div className="logo-container">
                  <img src="src/assets/diners.svg" alt="Diners Club" />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="recargar-result">
            <h3>¡Recarga Exitosa!</h3>
            <p>
              <strong>ID:</strong> {transaccion.id}
            </p>
            <p>
              <strong>Monto:</strong> S/. {transaccion.monto}
            </p>
            <p>
              <strong>Fecha:</strong> {transaccion.fecha}
            </p>
            <button className="pay-btn" onClick={generarComprobante}>
              Descargar Comprobante (PDF)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
