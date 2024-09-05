// src/components/Chatbot.js
import React, { useState } from 'react';
import './Chatbot.css'; // Estilos para el chatbot

const Chatbot = ({ userType }) => {
  const [activeTab, setActiveTab] = useState('preguntas');
  const [questions, setQuestions] = useState([
    { question: '¿Cómo puedo cambiar mi contraseña?', answer: 'Dirígete a la sección de configuración para cambiar tu contraseña.' },
    { question: '¿Cómo actualizo mi información personal?', answer: 'Puedes actualizar tu información en la sección de perfil.' }
  ]);

  // Función para editar preguntas (solo disponible para promotores/administradores)
  const handleEdit = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-tabs">
        <button
          className={`tab ${activeTab === 'preguntas' ? 'active' : ''}`}
          onClick={() => setActiveTab('preguntas')}
        >
          Preguntas y Respuestas
        </button>
        {userType === 'asesor' && (
          <button
            className={`tab ${activeTab === 'sugerencias' ? 'active' : ''}`}
            onClick={() => setActiveTab('sugerencias')}
          >
            Sugerencias de Productos
          </button>
        )}
      </div>

      {/* Preguntas y Respuestas */}
      {activeTab === 'preguntas' && (
        <div className="chatbot-content">
          <h3>Preguntas y Respuestas</h3>
          <ul className="questions-list">
            {questions.map((q, index) => (
              <li key={index}>
                <strong>Pregunta: </strong>
                {userType === 'promotor' ? (
                  <input
                    type="text"
                    value={q.question}
                    onChange={(e) => handleEdit(index, 'question', e.target.value)}
                  />
                ) : (
                  q.question
                )}
                <br />
                <strong>Respuesta: </strong>
                {userType === 'promotor' ? (
                  <input
                    type="text"
                    value={q.answer}
                    onChange={(e) => handleEdit(index, 'answer', e.target.value)}
                  />
                ) : (
                  q.answer
                )}
              </li>
            ))}
          </ul>

          {/* Redirección a WhatsApp si no hay respuesta */}
          <div className="whatsapp-redirect">
            <p>
              ¿No encuentras la respuesta?{' '}
              <a href="https://wa.me/3334648999" target="_blank" rel="noopener noreferrer">
                Contacta a un capacitador en WhatsApp
              </a>
            </p>
          </div>
        </div>
      )}

      {/* Sugerencias de Productos (solo visible para Asesores) */}
      {activeTab === 'sugerencias' && userType === 'asesor' && (
        <div className="chatbot-content">
          <h3>Sugerencias de Productos</h3>
          <select>
            <option>Cliente 1</option>
            <option>Cliente 2</option>
            <option>Cliente 3</option>
          </select>
          <p>Basado en las notas de la última reunión, sugerimos el producto XYZ.</p>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
