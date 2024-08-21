const nodemailer = require('nodemailer');

// Configura el transportador de nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'melanie02mendozagonzalez@gmail.com',  // Reemplaza con tu correo electrónico
        pass: 'cgsd myec tnzz lmuh'  // Reemplaza con tu contraseña de aplicación
    }
});

// Configura las opciones del correo
const mailOptions = {
    from: 'melanie02mendozagonzalez@gmail.com',  // Remitente (tu dirección de correo)
    to: 'melanie02mendozagonzalez@gmail.com',  // Destinatario (puedes usar tu propio correo para probar)
    subject: 'Correo de Prueba desde Nodemailer',
    text: 'Este es un correo de prueba enviado desde Node.js utilizando Nodemailer.'
};

// Envía el correo
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error al enviar el correo:', error);
    } else {
        console.log('Correo enviado:', info.response);
    }
});
