import './ComprarMonedas.css';
import { useState } from 'react';

/**
 * Componente para la compra simple de monedas mediante input de cantidad.
 * Utiliza el prop onBuy para actualizar el saldo en el componente padre.
 */
export default function ComprarMonedas({ onBuy }) {
    const [cantidad, setCantidad] = useState(0);
    const [purchaseMessage, setPurchaseMessage] = useState(null);

    const manejarCompra = () => {
        const amount = Number(cantidad);

        if (amount > 0) {
            onBuy(amount);
            setPurchaseMessage(`✅ ¡Compra exitosa! Se añadieron ${amount} monedas.`);
            setTimeout(() => setPurchaseMessage(null), 3000);
            setCantidad(0);
        } else {
            setPurchaseMessage('⚠️ Por favor, ingresa una cantidad válida.');
            setTimeout(() => setPurchaseMessage(null), 3000);
        }
    };

    // --- NUEVO: packs predefinidos ---
    const packs = [
  { id: 1, name: "Pack Bronce", coins: 100, price: "S/ 3.00" },
  { id: 2, name: "Pack Plata", coins: 500, price: "S/ 12.00" },
  { id: 3, name: "Pack Oro", coins: 1000, price: "S/ 20.00" },
  { id: 4, name: "Pack Diamante", coins: 2500, price: "S/ 40.00" },
  { id: 5, name: "Pack Esmeralda", coins: 3000, price: "S/ 50.00" },
  { id: 6, name: "Pack Legendario", coins: 4000, price: "S/ 60.00" },
];


    return (
        <section className="comprar-monedas-wrapper">
            <div className="comprar-monedas">
                <h2>Comprar Monedas</h2>
                <p>Adquiere monedas para apoyar a tus streamers favoritos.</p>

                {purchaseMessage && (
                    <p className={`purchase-message ${purchaseMessage.startsWith('✅') ? 'success' : 'error'}`}>
                        {purchaseMessage}
                    </p>
                )}

                <div className="input-group">
                    <input
                        type="number"
                        min="1"
                        placeholder="Cantidad de Monedas"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        className="coin-input"
                    />
                    <button onClick={manejarCompra}>
                        Comprar Monedas
                    </button>
                </div>

                {/* --- NUEVO: Catálogo de packs predefinidos --- */}
                <div className="packs-grid">
                    {packs.map((pack) => (
                        <div className="pack-card" key={pack.id}>
                            <span className="pack-coins-icon">💰</span>
                            <h3 className="pack-name">{pack.name}</h3>
                            <p className="pack-coins">{pack.coins} 🪙</p>
                            <p className="pack-price">{pack.price}</p>
                            <button
                                className="purchase-button"
                                onClick={() => onBuy(pack.coins)}
                            >
                                Comprar
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
