const express = require('express');
const sendVerificationEmail = require('./sendVerificationEmail');  

const app = express();
app.use(express.json());

// Simula una base de datos temporal
let verificationCodes = {};

// Generar un código de verificación de 6 dígitos
const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Genera un código de 6 dígitos
};

// Ruta para solicitar la recuperación de la contraseña
app.post('/api/forgot-password', (req, res) => {
    const { email } = req.body;

    // Valida el email (simplificado)
    if (!/^[\w-\.]+@gmail\.com$/.test(email)) {
        return res.status(400).json({ message: 'Correo electrónico no válido.' });
    }

    // Genera el código de verificación
    const verificationCode = generateVerificationCode();

    // Almacena el código temporalmente (debería estar en una base de datos en producción)
    verificationCodes[email] = verificationCode;

    // Envía el código por correo electrónico
    sendVerificationEmail(email, verificationCode)
        .then(() => {
            res.status(200).json({ message: 'Se ha enviado un correo con un código para restablecer tu contraseña.' });
        })
        .catch((error) => {
            console.error('Error al enviar el correo:', error);
            res.status(500).json({ message: 'Error al enviar el correo electrónico.' });
        });
});

// Ruta para verificar el código de verificación
app.post('/api/verify-code', (req, res) => {
    const { email, verificationCode } = req.body;

    // Compara el código ingresado con el almacenado
    if (verificationCodes[email] && verificationCodes[email] === verificationCode) {
        // Si es correcto, elimina el código y permite continuar
        delete verificationCodes[email];
        res.status(200).json({ message: 'Código verificado correctamente.' });
    } else {
        res.status(400).json({ message: 'Código de verificación incorrecto.' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
