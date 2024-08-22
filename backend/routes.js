// backend/routes.js
const express = require('express');
const router = express.Router();
const db = require('./db');

// Ejemplo de ruta para obtener productos
router.get('/productos', (req, res) => {
    db.query('SELECT * FROM productos', (err, results) => {
        if (err) {
            console.error('Error al obtener productos:', err);
            res.status(500).send('Error en el servidor');
        } else {
            res.json(results);
        }
    });
});

// Exportar el router
module.exports = router;
