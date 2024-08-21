// src/components/SignUpClient.js
import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import './SignUpClient.css';

const SignUpClient = () => {
    const [formData, setFormData] = useState({
        nombreCompleto: '',
        fechaNacimiento: '',
        nacionalidad: '',
        ocupacion: '',
        sexo: '',
        estadoCivil: '',
        domicilio: '',
        correo: '',
        giro: '',
        tipoActividad: '',
        entidadFederativa: '',
        ingresosAnuales: '',
        origenPatrimonio: '',
        habitosToxicos: '',
        especificarHabitos: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validate = () => {
        let tempErrors = {};

        // RQNF1: Validar Nombre Completo
        if (!/^[A-Za-z\s]{1,255}$/.test(formData.nombreCompleto)) {
            tempErrors.nombreCompleto = 'Nombre completo debe contener solo letras y espacios, sin caracteres especiales ni números, y tener máximo 255 caracteres.';
        }

        // RQNF2: Validar Fecha de Nacimiento
        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(formData.fechaNacimiento)) {
            tempErrors.fechaNacimiento = 'La fecha de nacimiento debe estar en formato DD/MM/AAAA.';
        }

        // RQNF3: Validar Nacionalidad
        if (!/^[A-Za-z\s]{1,55}$/.test(formData.nacionalidad)) {
            tempErrors.nacionalidad = 'Nacionalidad debe contener solo letras y espacios, y tener máximo 55 caracteres.';
        }

        // RQNF4: Validar Ocupación o Profesión
        if (!/^[A-Za-z0-9\s]{1,55}$/.test(formData.ocupacion)) {
            tempErrors.ocupacion = 'Ocupación o Profesión debe contener solo letras, números y espacios, y tener máximo 55 caracteres.';
        }

        // RQNF5: Validar Sexo
        if (!['Mujer', 'Hombre'].includes(formData.sexo)) {
            tempErrors.sexo = 'Debe seleccionar "Mujer" o "Hombre" en el campo Sexo.';
        }

        // RQNF6: Validar Estado Civil
        if (!['Soltero', 'Casado'].includes(formData.estadoCivil)) {
            tempErrors.estadoCivil = 'Debe seleccionar "Soltero" o "Casado" en el campo Estado Civil.';
        }

        // RQNF7: Validar Domicilio Completo
        if (!formData.domicilio || formData.domicilio.length > 255) {
            tempErrors.domicilio = 'Domicilio completo debe contener máximo 255 caracteres.';
        }

        // RQNF8: Validar Correo Electrónico
        if (!/^[\w-\.]+@gmail\.com$/.test(formData.correo) || formData.correo.length > 100) {
            tempErrors.correo = 'Correo electrónico debe tener una terminación @gmail.com válida y máximo 100 caracteres.';
        }

        // RQNF9: Validar Giro, Actividad u Objeto Social
        if (!formData.giro || formData.giro.length > 255) {
            tempErrors.giro = 'Giro, actividad u objeto social debe contener máximo 255 caracteres.';
        }

        // RQNF10: Validar Especificar brevemente el tipo de actividad
        if (!formData.tipoActividad || formData.tipoActividad.length > 255) {
            tempErrors.tipoActividad = 'El tipo de actividad debe contener máximo 255 caracteres.';
        }

        // RQNF11: Validar Entidad Federativa de nacimiento
        if (!formData.entidadFederativa) {
            tempErrors.entidadFederativa = 'Debe seleccionar una entidad federativa válida.';
        }

        // RQNF12: Validar Ingresos Anuales
        if (!/^\d{1,10}$/.test(formData.ingresosAnuales)) {
            tempErrors.ingresosAnuales = 'Ingresos anuales debe ser un número de máximo 10 dígitos.';
        }

        // RQNF13: Validar Hábitos Toxicológicos
        if (!['Sí', 'No'].includes(formData.habitosToxicos)) {
            tempErrors.habitosToxicos = 'Debe seleccionar "Sí" o "No" en el campo Hábitos Toxicológicos.';
        } else if (formData.habitosToxicos === 'Sí' && (!formData.especificarHabitos || formData.especificarHabitos.length > 255)) {
            tempErrors.especificarHabitos = 'Debe especificar el hábito y contener máximo 255 caracteres.';
        }

        // RQNF14: Validar Contraseña
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?=.{8,})/.test(formData.password)) {
            tempErrors.password = 'La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, una minúscula, un número y un carácter especial.';
        }

        setErrors(tempErrors);

        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Formulario válido. Enviando datos...');
            // Aquí enviarías los datos al servidor o realizarías la acción correspondiente
        } else {
            console.log('Formulario inválido. Corrige los errores y vuelve a intentar.');
        }
    };

    return (
        <div className="App">
            <Header />
            <div className="signup-container">
                <div className="signup-box">
                    <h2>Sign In</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="nombreCompleto"
                            placeholder="Nombre Completo"
                            className="signup-input"
                            value={formData.nombreCompleto}
                            onChange={handleChange}
                        />
                        {errors.nombreCompleto && <div className="error">{errors.nombreCompleto}</div>}
                        
                        <input
                            type="text"
                            name="fechaNacimiento"
                            placeholder="Fecha de nacimiento (DD/MM/AAAA)"
                            className="signup-input"
                            value={formData.fechaNacimiento}
                            onChange={handleChange}
                        />
                        {errors.fechaNacimiento && <div className="error">{errors.fechaNacimiento}</div>}

                        <input
                            type="text"
                            name="nacionalidad"
                            placeholder="Nacionalidad"
                            className="signup-input"
                            value={formData.nacionalidad}
                            onChange={handleChange}
                        />
                        {errors.nacionalidad && <div className="error">{errors.nacionalidad}</div>}

                        <input
                            type="text"
                            name="ocupacion"
                            placeholder="Ocupación o Profesión"
                            className="signup-input"
                            value={formData.ocupacion}
                            onChange={handleChange}
                        />
                        {errors.ocupacion && <div className="error">{errors.ocupacion}</div>}

                        <select
                            name="sexo"
                            className="signup-input"
                            value={formData.sexo}
                            onChange={handleChange}
                        >
                            <option value="">Sexo</option>
                            <option value="Mujer">Mujer</option>
                            <option value="Hombre">Hombre</option>
                        </select>
                        {errors.sexo && <div className="error">{errors.sexo}</div>}

                        <select
                            name="estadoCivil"
                            className="signup-input"
                            value={formData.estadoCivil}
                            onChange={handleChange}
                        >
                            <option value="">Estado Civil</option>
                            <option value="Soltero">Soltero</option>
                            <option value="Casado">Casado</option>
                        </select>
                        {errors.estadoCivil && <div className="error">{errors.estadoCivil}</div>}

                        <input
                            type="text"
                            name="domicilio"
                            placeholder="Domicilio Completo"
                            className="signup-input"
                            value={formData.domicilio}
                            onChange={handleChange}
                        />
                        {errors.domicilio && <div className="error">{errors.domicilio}</div>}

                        <input
                            type="email"
                            name="correo"
                            placeholder="Correo electrónico (terminación @gmail.com)"
                            className="signup-input"
                            value={formData.correo}
                            onChange={handleChange}
                        />
                        {errors.correo && <div className="error">{errors.correo}</div>}

                        <input
                            type="text"
                            name="giro"
                            placeholder="Giro, actividad u objeto social"
                            className="signup-input"
                            value={formData.giro}
                            onChange={handleChange}
                        />
                        {errors.giro && <div className="error">{errors.giro}</div>}

                        <input
                            type="text"
                            name="tipoActividad"
                            placeholder="Especifique brevemente el tipo de actividad"
                            className="signup-input"
                            value={formData.tipoActividad}
                            onChange={handleChange}
                        />
                        {errors.tipoActividad && <div className="error">{errors.tipoActividad}</div>}

                        <select
                            name="entidadFederativa"
                            className="signup-input"
                            value={formData.entidadFederativa}
                            onChange={handleChange}
                        >
                            <option value="">Entidad Federativa de nacimiento</option>
                            <option value="Nacionalizado">Nacionalizado</option>
                            <option value="CDMX">CDMX</option>
                            <option value="Jalisco">Jalisco</option>
                            {/* Agregar todas las entidades federativas */}
                        </select>
                        {errors.entidadFederativa && <div className="error">{errors.entidadFederativa}</div>}

                        <input
                            type="text"
                            name="ingresosAnuales"
                            placeholder="Ingresos Anuales"
                            className="signup-input"
                            value={formData.ingresosAnuales}
                            onChange={handleChange}
                        />
                        {errors.ingresosAnuales && <div className="error">{errors.ingresosAnuales}</div>}

                        <input
                            type="text"
                            name="origenPatrimonio"
                            placeholder="Origen del patrimonio"
                            className="signup-input"
                            value={formData.origenPatrimonio}
                            onChange={handleChange}
                        />
                        {errors.origenPatrimonio && <div className="error">{errors.origenPatrimonio}</div>}

                        <select
                            name="habitosToxicos"
                            className="signup-input"
                            value={formData.habitosToxicos}
                            onChange={handleChange}
                        >
                            <option value="">Hábitos Toxicológicos</option>
                            <option value="No">No</option>
                            <option value="Sí">Sí</option>
                        </select>
                        {errors.habitosToxicos && <div className="error">{errors.habitosToxicos}</div>}
                        
                        {formData.habitosToxicos === 'Sí' && (
                            <>
                                <input
                                    type="text"
                                    name="especificarHabitos"
                                    placeholder="Especifique el tipo de hábito"
                                    className="signup-input"
                                    value={formData.especificarHabitos}
                                    onChange={handleChange}
                                />
                                {errors.especificarHabitos && <div className="error">{errors.especificarHabitos}</div>}
                            </>
                        )}

                        <input
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            className="signup-input"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <div className="error">{errors.password}</div>}

                        <button type="submit" className="signup-button">Registrarse</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SignUpClient;
