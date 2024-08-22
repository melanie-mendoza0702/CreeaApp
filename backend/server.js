const express = require('express');
const sendVerificationEmail = require('./sendVerificationEmail');
const db = require('./db');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

let verificationCodes = {};

// Generar un código de verificación de 6 dígitos
const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Genera un código de 6 dígitos
};

// Ruta para registrar un nuevo cliente
app.post('/api/register-client', async (req, res) => {
    const {
        nombreCompleto,
        fechaNacimiento,
        nacionalidad,
        ocupacion,
        sexo,
        estadoCivil,
        domicilio,
        correo,
        giro,
        tipoActividad,
        entidadFederativa,
        ingresosAnuales,
        origenPatrimonio,
        habitosToxicos,
        especificarHabitos,
        password
    } = req.body;

    try {
        // Verificar si el correo electrónico ya está registrado
        const checkUserSql = `SELECT * FROM usuario WHERE correo_electronico = ?`;
        db.query(checkUserSql, [correo], async (err, results) => {
            if (err) {
                console.error('Error al verificar el usuario:', err);
                return res.status(500).json({ message: 'Error en el servidor al verificar el usuario.' });
            }

            if (results.length > 0) {
                return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
            }

            // Encriptar la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insertar el usuario en la tabla "usuario"
            const userSql = `
                INSERT INTO usuario (correo_electronico, password, tipo_usuario)
                VALUES (?, ?, 'cliente')
            `;
            
            db.query(userSql, [correo, hashedPassword], (err, result) => {
                if (err) {
                    console.error('Error al registrar el usuario:', err);
                    return res.status(500).json({ message: 'Error en el servidor al registrar el usuario.' });
                }

                const userId = result.insertId;

                // Insertar los datos del cliente en la tabla "cliente"
                const clientSql = `
                    INSERT INTO cliente (
                        id_usuario, nombre_completo, fecha_nacimiento, nacionalidad, ocupacion_profesion, sexo, estado_civil,
                        domicilio_completo, giro_actividad, tipo_actividad, entidad_federativa_nacimiento,
                        ingresos_anuales, origen_patrimonio, habitos_toxicologicos, descripcion_habitos
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;

                db.query(clientSql, [
                    userId, nombreCompleto, fechaNacimiento, nacionalidad, ocupacion, sexo, estadoCivil,
                    domicilio, giro, tipoActividad, entidadFederativa,
                    ingresosAnuales, origenPatrimonio, habitosToxicos, especificarHabitos
                ], async (err, result) => {
                    if (err) {
                        console.error('Error al registrar el cliente:', err);
                        return res.status(500).json({ message: 'Error en el servidor al registrar el cliente.' });
                    }

                    // Generar y enviar el código de verificación por correo electrónico
                    const verificationCode = generateVerificationCode();
                    verificationCodes[correo] = verificationCode;

                    try {
                        await sendVerificationEmail(correo, verificationCode);
                        res.status(201).json({ message: 'Cliente registrado exitosamente. Se ha enviado un código de verificación a tu correo.' });
                    } catch (emailError) {
                        console.error('Error al enviar el correo de verificación:', emailError);
                        res.status(500).json({ message: 'Cliente registrado, pero hubo un error al enviar el correo de verificación.' });
                    }
                });
            });
        });
    } catch (err) {
        console.error('Error durante el registro:', err);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
});

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


/*const express = require('express');
const sendVerificationEmail = require('./sendVerificationEmail');
const db = require('./db'); // Asegúrate de tener configurada la conexión a la base de datos
const bcrypt = require('bcryptjs'); // Para encriptar la contraseña
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Simula una base de datos temporal para códigos de verificación
let verificationCodes = {};

// Generar un código de verificación de 6 dígitos
const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Genera un código de 6 dígitos
};

// Ruta para registrar un nuevo cliente
app.post('/api/register-client', async (req, res) => {
    const {
        nombreCompleto,
        fechaNacimiento,
        nacionalidad,
        ocupacion,
        sexo,
        estadoCivil,
        domicilio,
        correo,
        giro,
        tipoActividad,
        entidadFederativa,
        ingresosAnuales,
        origenPatrimonio,
        habitosToxicos,
        especificarHabitos,
        password,
    } = req.body;

    try {
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar el cliente en la base de datos
        const sql = `
            INSERT INTO cliente (
                nombre_completo, fecha_nacimiento, nacionalidad, ocupacion_profesion, sexo, estado_civil,
                domicilio_completo, correo_electronico, giro_actividad, tipo_actividad, entidad_federativa_nacimiento,
                ingresos_anuales, origen_patrimonio, habitos_toxicologicos, descripcion_habitos, password
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(sql, [
            nombreCompleto, fechaNacimiento, nacionalidad, ocupacion, sexo, estadoCivil,
            domicilio, correo, giro, tipoActividad, entidadFederativa,
            ingresosAnuales, origenPatrimonio, habitosToxicos, especificarHabitos, hashedPassword
        ], (err, result) => {
            if (err) {
                console.error('Error al registrar el cliente:', err);
                return res.status(500).json({ message: 'Error en el servidor al registrar el cliente.' });
            }

            res.status(201).json({ message: 'Cliente registrado exitosamente.' });
        });
    } catch (err) {
        console.error('Error durante el registro:', err);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
});

// Otras rutas y configuraciones...
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
*/