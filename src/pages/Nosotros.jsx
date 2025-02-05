import './Nosotros.css';

export default function Nosotros() {
    return (
        <div className="nosotros-container">
            {/* Sección principal */}
            <section className="nosotros-header">
                <h1>Sobre Nosotros</h1>
                <p>Eco-Shop nació con la misión de ofrecer productos sostenibles que ayudan a reducir la huella de carbono y fomentan un estilo de vida ecoamigable.</p>
            </section>

            {/* Misión y Visión */}
            <section className="mision-vision">
                <div className="mision">
                    <h2>Nuestra Misión</h2>
                    <p>Fomentar un consumo responsable mediante productos ecológicos y sostenibles.</p>
                </div>
                <div className="vision">
                    <h2>Nuestra Visión</h2>
                    <p>Convertirnos en la plataforma líder en Ecuador para productos sustentables.</p>
                </div>
            </section>

            {/* Equipo */}
            <section className="equipo-container">
                <h2>Nuestro Equipo</h2>
                <div className="equipo-grid">
                    <div className="equipo-card">
                        <img src="/avatar1.jpg" alt="Ana Pérez" />
                        <h3>Ana Pérez</h3>
                        <p>Fundadora & CEO</p>
                    </div>
                    <div className="equipo-card">
                        <img src="/avatar2.jpg" alt="Juan López" />
                        <h3>Juan López</h3>
                        <p>Gerente de Operaciones</p>
                    </div>
                    <div className="equipo-card">
                        <img src="/avatar3.jpg" alt="Carla Torres" />
                        <h3>Carla Torres</h3>
                        <p>Marketing & Ventas</p>
                    </div>
                </div>
            </section>

        </div>
    );
}
