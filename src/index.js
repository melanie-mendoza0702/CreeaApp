import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // Importa el archivo de registro del service worker

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Registra el service worker para convertir la aplicación en una PWA
serviceWorkerRegistration.register(); // Aquí se registra el service worker

// Para medir el rendimiento de la aplicación, mantén el siguiente código
reportWebVitals();

