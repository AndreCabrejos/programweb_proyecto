import './ComprarMonedas.css';
import { useState } from 'react';

export default function ComprarMonedas({ onBuy }) {
    const [cantidad, setCantidad] = useState(0);

    const manejarCompra = () => {
        if (cantidad > 0) {
            onBuy(cantidad);
            alert(`¡Has comprado ${cantidad} monedas! 💰`);
            setCantidad(0);
        } else {
            alert('Por favor, ingresa una cantidad válida.');
        }
    };

    return (
        <section className="comprar-monedas">
            <h2>Comprar Monedas</h2>
            <p>Adquiere más monedas para apoyar a tus streamers favoritos.</p>

            <input
                type="number"
                min="1"
                placeholder="Cantidad"
                value={cantidad}
                onChange={(e) => setCantidad(Number(e.target.value))}
            />

            <button onClick={manejarCompra}>Comprar</button>
        </section>
    );
}
