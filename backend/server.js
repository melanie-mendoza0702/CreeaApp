/* backend/server.js */
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
app.post('/api/register-client', (req, res) => {
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

    // Verificar si el correo electrónico ya está registrado
    const checkUserSql = `SELECT * FROM usuario WHERE correo_electronico = ?`;
    db.query(checkUserSql, [correo], (err, results) => {
        if (err) {
            console.error('Error al verificar el usuario:', err);
            return res.status(500).json({ message: 'Error en el servidor al verificar el usuario.' });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
        }

        // Encriptar la contraseña
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Error al encriptar la contraseña:', err);
                return res.status(500).json({ message: 'Error en el servidor al encriptar la contraseña.' });
            }

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
                ], (err, result) => {
                    if (err) {
                        console.error('Error al registrar el cliente:', err);
                        return res.status(500).json({ message: 'Error en el servidor al registrar el cliente.' });
                    }

                    // Generar y enviar el código de verificación por correo electrónico
                    const verificationCode = generateVerificationCode();
                    verificationCodes[correo] = verificationCode;

                    sendVerificationEmail(correo, verificationCode)
                        .then(() => {
                            res.status(201).json({ message: 'Cliente registrado exitosamente. Se ha enviado un código de verificación a tu correo.' });
                        })
                        .catch((emailError) => {
                            console.error('Error al enviar el correo de verificación:', emailError);
                            res.status(500).json({ message: 'Cliente registrado, pero hubo un error al enviar el correo de verificación.' });
                        });
                });
            });
        });
    });
});

// Ruta para solicitar la recuperación de la contraseña
app.post('/api/forgot-password', (req, res) => {
    const { email } = req.body;

    // Valida el email (simplificado)
    if (!/^[\w-.]+@gmail\.com$/.test(email)) {
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

// Ruta para manejar el inicio de sesión
app.post('/api/login', (req, res) => {
    const { username, password, userType } = req.body;

    db.query(
        `SELECT * FROM usuario WHERE correo_electronico = ? AND tipo_usuario = ?`,
        [username, userType],
        (err, results) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error del servidor' });
            }

            if (results.length > 0) {
                const user = results[0];
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) {
                        return res.status(500).json({ success: false, message: 'Error al comparar contraseñas' });
                    }

                    if (isMatch) {
                        res.json({ success: true, message: 'Login exitoso', userType });
                    } else {
                        res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
                    }
                });
            } else {
                res.status(401).json({ success: false, message: 'Usuario no encontrado' });
            }
        }
    );
});

// Ruta para obtener los datos del usuario
app.get('/api/user-data', (req, res) => {
    const userId = req.query.userId;

    const sql = `
        SELECT u.correo_electronico, c.nombre_completo, c.fecha_nacimiento, c.nacionalidad, 
               c.ocupacion_profesion, c.sexo, c.estado_civil, c.domicilio_completo, 
               c.giro_actividad, c.habitos_toxicologicos, c.entidad_federativa_nacimiento, 
               c.ingresos_anuales, cuenta.estado AS estatus
        FROM usuario u
        JOIN cliente c ON u.id_usuario = c.id_usuario
        JOIN cuenta ON u.id_usuario = cuenta.id_usuario
        WHERE u.id_usuario = ?
    `;


    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Error al obtener los datos del usuario:', err);
            return res.status(500).json({ message: 'Error al obtener los datos del usuario' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(results[0]);
    });
});

// Ruta para actualizar los datos del usuario
app.post('/api/update-user', (req, res) => {
    const {
        nombreCompleto, fechaNacimiento, nacionalidad, ocupacion, sexo,
        estadoCivil, domicilio, giro, habitosToxicos, entidadFederativa,
        ingresosAnuales, estatus
    } = req.body;

    const userId = req.query.userId;

    // Actualizar datos en la tabla 'cliente'
    const updateClientSql = `
        UPDATE cliente SET 
            nombre_completo = ?, fecha_nacimiento = ?, nacionalidad = ?, 
            ocupacion_profesion = ?, sexo = ?, estado_civil = ?, 
            domicilio_completo = ?, giro_actividad = ?, habitos_toxicologicos = ?, 
            entidad_federativa_nacimiento = ?, ingresos_anuales = ?
        WHERE id_usuario = ?
    `;

    db.query(updateClientSql, [
        nombreCompleto, fechaNacimiento, nacionalidad, ocupacion, sexo,
        estadoCivil, domicilio, giro, habitosToxicos, entidadFederativa,
        ingresosAnuales, userId
    ], (err, results) => {
        if (err) {
            console.error('Error al actualizar los datos del cliente:', err);
            return res.status(500).json({ message: 'Error al actualizar los datos del cliente' });
        }

        // Actualizar el estatus en la tabla 'cuenta'
        const updateAccountSql = `
            UPDATE cuenta SET estado = ? WHERE id_usuario = ?
        `;

        db.query(updateAccountSql, [estatus, userId], (err, results) => {
            if (err) {
                console.error('Error al actualizar el estatus:', err);
                return res.status(500).json({ message: 'Error al actualizar el estatus del usuario' });
            }

            res.json({ message: 'Datos actualizados correctamente' });
        });
    });
});

// Ruta para actualizar la contraseña
app.post('/api/update-password', (req, res) => {
    const { email, newPassword } = req.body;

    // Encriptar la nueva contraseña
    bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error al encriptar la nueva contraseña:', err);
            return res.status(500).json({ message: 'Error al encriptar la nueva contraseña.' });
        }

        // Actualizar la contraseña en la base de datos
        const updatePasswordSql = `UPDATE usuario SET password = ? WHERE correo_electronico = ?`;

        db.query(updatePasswordSql, [hashedPassword, email], (err, result) => {
            if (err) {
                console.error('Error al actualizar la contraseña:', err);
                return res.status(500).json({ message: 'Error al actualizar la contraseña en la base de datos.' });
            }

            if (result.affectedRows > 0) {
                res.json({ message: 'Contraseña actualizada correctamente' });
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        });
    });
});

// Ruta para registrar un nuevo asesor
app.post('/api/register-advisor', (req, res) => {
    const {
        nombreCompleto,
        correo,
        numeroIdentificacion,
        password,
    } = req.body;

    // Verificar si el correo electrónico ya está registrado
    const checkUserSql = `SELECT * FROM usuario WHERE correo_electronico = ?`;
    db.query(checkUserSql, [correo], (err, results) => {
        if (err) {
            console.error('Error al verificar el usuario:', err);
            return res.status(500).json({ message: 'Error en el servidor al verificar el usuario.' });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
        }

        // Encriptar la contraseña
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Error al encriptar la contraseña:', err);
                return res.status(500).json({ message: 'Error en el servidor al encriptar la contraseña.' });
            }

            // Insertar el usuario en la tabla "usuario"
            const userSql = `
                INSERT INTO usuario (correo_electronico, password, tipo_usuario)
                VALUES (?, ?, 'asesor')
            `;

            db.query(userSql, [correo, hashedPassword], (err, result) => {
                if (err) {
                    console.error('Error al registrar el usuario:', err);
                    return res.status(500).json({ message: 'Error en el servidor al registrar el usuario.' });
                }

                const userId = result.insertId;

                // Insertar los datos del asesor en la tabla "asesor"
                const advisorSql = `
                    INSERT INTO asesor (
                        id_usuario, nombre_completo, clave_agente
                    ) VALUES (?, ?, ?)
                `;

                db.query(advisorSql, [
                    userId, nombreCompleto, numeroIdentificacion
                ], (err, result) => {
                    if (err) {
                        console.error('Error al registrar el asesor:', err);
                        return res.status(500).json({ message: 'Error en el servidor al registrar el asesor.' });
                    }

                    // Generar y enviar el código de verificación por correo electrónico
                    const verificationCode = generateVerificationCode();
                    verificationCodes[correo] = verificationCode;

                    sendVerificationEmail(correo, verificationCode)
                        .then(() => {
                            res.status(201).json({ message: 'Asesor registrado exitosamente. Se ha enviado un código de verificación a tu correo.' });
                        })
                        .catch((emailError) => {
                            console.error('Error al enviar el correo de verificación:', emailError);
                            res.status(500).json({ message: 'Asesor registrado, pero hubo un error al enviar el correo de verificación.' });
                        });
                });
            });
        });
    });
});

// Ruta para registrar un nuevo promotor
app.post('/api/register-promoter', (req, res) => {
    const {
        correo,
        nombreCompleto,
        nombrePromotoria,
        zona,
        numeroPromotoria,
        password
    } = req.body;

    // Verificar si el correo electrónico ya está registrado
    const checkUserSql = `SELECT * FROM usuario WHERE correo_electronico = ?`;
    db.query(checkUserSql, [correo], (err, results) => {
        if (err) {
            console.error('Error al verificar el usuario:', err);
            return res.status(500).json({ message: 'Error en el servidor al verificar el usuario.' });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
        }

        // Encriptar la contraseña
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Error al encriptar la contraseña:', err);
                return res.status(500).json({ message: 'Error en el servidor al encriptar la contraseña.' });
            }

            // Consulta SQL para insertar el usuario en la tabla "usuario"
            const userSql = `
                INSERT INTO usuario (correo_electronico, password, tipo_usuario)
                VALUES (?, ?, 'promotor/administrador')
            `;

            // Agrega el console.log aquí para depurar
            console.log('Executing SQL:', userSql, [correo, hashedPassword]);

            db.query(userSql, [correo, hashedPassword], (err, result) => {
                if (err) {
                    console.error('Error al registrar el usuario:', err);
                    return res.status(500).json({ message: 'Error en el servidor al registrar el usuario.' });
                }

                const userId = result.insertId;

                // Insertar los datos del promotor en la tabla "promotor"
                const promoterSql = `
                    INSERT INTO promotor (
                        id_usuario, nombre_completo, nombre_promotoria, zona, numero_promotoria
                    ) VALUES (?, ?, ?, ?, ?)
                `;

                db.query(promoterSql, [
                    userId, nombreCompleto, nombrePromotoria, zona, numeroPromotoria
                ], (err, result) => {
                    if (err) {
                        console.error('Error al registrar el promotor:', err);
                        return res.status(500).json({ message: 'Error en el servidor al registrar el promotor.' });
                    }

                    // Generar y enviar el código de verificación por correo electrónico
                    const verificationCode = generateVerificationCode();
                    verificationCodes[correo] = verificationCode;

                    sendVerificationEmail(correo, verificationCode)
                        .then(() => {
                            res.status(201).json({ message: 'Promotor registrado exitosamente. Se ha enviado un código de verificación a tu correo.' });
                        })
                        .catch((emailError) => {
                            console.error('Error al enviar el correo de verificación:', emailError);
                            res.status(500).json({ message: 'Promotor registrado, pero hubo un error al enviar el correo de verificación.' });
                        });
                });
            });
        });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

