// src/components/PromoterDashboard.js
import React, { useState, useEffect } from 'react';
import Header from './Header';  // Importa el Header
import Footer from './Footer';  // Importa el Footer
import Chatbot from './Chatbot'; // Importa el Chatbot
import './PromoterDashboard.css'; // Importa el archivo CSS
import axios from 'axios';

const PromoterDashboard = () => {
  const [advisors, setAdvisors] = useState([]);
  const [expandedAdvisor, setExpandedAdvisor] = useState(null); // Para mostrar clientes de un asesor
  const [events, setEvents] = useState([]); // Para la agenda
  const [exchangeRates, setExchangeRates] = useState({});
  const [expandedProduct, setExpandedProduct] = useState(null); // Para mostrar información del producto
  const [showChatbot, setShowChatbot] = useState(false); // Controla la visibilidad del chatbot modal

  // Simulando datos de asesores
  useEffect(() => {
    setAdvisors([
      { id: 1, name: 'Juan Pérez', agentNumber: '12345', clients: ['Cliente A', 'Cliente B'] },
      { id: 2, name: 'Ana López', agentNumber: '67890', clients: ['Cliente C', 'Cliente D'] },
      { id: 3, name: 'Carlos Martínez', agentNumber: '54321', clients: ['Cliente E'] },
    ]);
    // Simulando eventos
    setEvents([{ date: '2024-09-10', event: 'Reunión con cliente A' }, { date: '2024-09-11', event: 'Cita de presentación' }]);

    // Llamada API para obtener tipo de cambio (ejemplo)
    axios.get('https://api.exchangerate-api.com/v4/latest/USD')
      .then((response) => {
        setExchangeRates({ usd: response.data.rates.MXN, udi: 6.57 }); // Simulando el tipo de cambio UDI
      });
  }, []);

  // Expansión de la lista de clientes de un asesor
  const toggleExpandAdvisor = (id) => {
    setExpandedAdvisor(expandedAdvisor === id ? null : id);
  };

  // Función para mostrar información del producto
  const toggleExpandProduct = (product) => {
    setExpandedProduct(expandedProduct === product ? null : product);
  };

  // Función para cerrar el modal del chatbot
  const closeChatbot = () => {
    setShowChatbot(false);
  };

  return (
    <div className="promoter-dashboard">
      <Header />  {/* Agregando el Header */}

      <div className="main-content">
        <div className="left-section">
          {/* Mi cuenta */}
          <button className="account-btn container">Mi cuenta</button>

          {/* Productos */}
          <div className="products-section container">
            <h2>Productos</h2>
            <div className="product-options">
              <button onClick={() => toggleExpandProduct('Imagina Ser')}>Imagina Ser</button>
              <button onClick={() => toggleExpandProduct('Star Dotal')}>Star Dotal</button>
              <button onClick={() => toggleExpandProduct('Orvi 99')}>Orvi 99</button>
              <button onClick={() => toggleExpandProduct('Vida Mujer')}>Vida Mujer</button>
              <button onClick={() => toggleExpandProduct('SeguBeca')}>SeguBeca</button>
            </div>
            {expandedProduct && (
              <div className="product-info">
                {expandedProduct === 'Imagina Ser' && <p>Información general sobre Imagina Ser...</p>}
                {expandedProduct === 'Star Dotal' && <p>Información general sobre Star Dotal...</p>}
                {expandedProduct === 'Orvi 99' && <p>Información general sobre Orvi 99...</p>}
                {expandedProduct === 'Vida Mujer' && <p>Información general sobre Vida Mujer...</p>}
                {expandedProduct === 'SeguBeca' && <p>Información general sobre SeguBeca...</p>}
              </div>
            )}
          </div>

          {/* Asesores */}
          <div className="advisors-section container">
            <h2>Asesores</h2>
            {advisors.map((advisor) => (
              <div key={advisor.id} className="advisor">
                <div onClick={() => toggleExpandAdvisor(advisor.id)}>
                  <span className="bold">{advisor.name}</span> - {advisor.agentNumber}
                </div>
                {expandedAdvisor === advisor.id && (
                  <ul className="clients-list">
                    {advisor.clients.map((client, index) => (
                      <li key={index}>{client}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Renovaciones */}
          <div className="renewals-section container">
            <h2>Renovaciones del mes</h2>
            <p>Renovación de cliente X - Septiembre 2024</p>
            <p>Renovación de cliente Y - Septiembre 2024</p>
          </div>

          {/* Presentaciones */}
          <button className="presentation-btn container">Presentaciones con Rendimientos Financieros</button>
        </div>

        {/* Contenedores de la derecha */}
        <div className="right-section">
          {/* Agenda */}
          <div className="agenda-section container">
            <h2>Calendario - {new Date().toLocaleDateString()}</h2>
            <ul>
              {events.map((event, index) => (
                <li key={index}>{event.event} - {event.date}</li>
              ))}
            </ul>
            <button className="schedule-event-btn">Agendar Evento</button>
          </div>

          {/* Tipo de cambio */}
          <div className="exchange-rate-section container">
            <h2>Tipo de Cambio</h2>
            <p>Dólar: {exchangeRates.usd ? exchangeRates.usd.toFixed(2) : 'Cargando...'} MXN</p>
            <p>UDI: {exchangeRates.udi} MXN</p>
          </div>

          {/* Asistente Virtual */}
          <div className="virtual-assistant-section container">
            <h2>Asistente Virtual</h2>
            <button className="open-assistant-btn" onClick={() => setShowChatbot(true)}>Abrir Asistente</button>
          </div>
        </div>
      </div>

      {/* Modal del Chatbot */}
      {showChatbot && (
        <div className="chatbot-modal">
          <div className="chatbot-modal-content">
            <span className="close-button" onClick={closeChatbot}>&times;</span>
            <Chatbot userType="promotor" /> {/* Integra el chatbot en el modal */}
          </div>
        </div>
      )}

      <Footer /> {/* Agregando el Footer */}
    </div>
  );
};

export default PromoterDashboard;
