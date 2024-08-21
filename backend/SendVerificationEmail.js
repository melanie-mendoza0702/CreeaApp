const nodemailer = require('nodemailer');

const sendVerificationEmail = (email, verificationCode) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'melanie02mendozagonzalez@gmail.com',  // Reemplaza con tu correo
            pass: 'cgsd myec tnzz lmuh'  // Reemplaza con la contraseña de aplicación
        }
    });

    const mailOptions = {
        from: 'melanie02mendozagonzalez@gmail.com',
        to: email,
        subject: 'Recuperación de Contraseña',
        text: `Tu código de verificación es: ${verificationCode}`
    };

    console.log(`Código de verificación enviado al correo (${email}): ${verificationCode}`);  // Imprimir en consola

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error al enviar el correo:', error);
                reject(error); // Rechaza la promesa si hay un error
            } else {
                console.log('Correo enviado:', info.response);
                resolve(info.response); // Resuelve la promesa si el correo se envía
            }
        });
    });
};

module.exports = sendVerificationEmail;
