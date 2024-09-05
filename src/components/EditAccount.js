import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './EditAccount.css';

const EditAccount = () => {
    const [formData, setFormData] = useState({
        nombreCompleto: '',
        fechaNacimiento: '',
        nacionalidad: '',
        ocupacion: '',
        sexo: '',
        estadoCivil: '',
        domicilio: '',
        giro: '',
        habitosToxicos: '',
        entidadFederativa: '',
        ingresosAnuales: '',
        correo: '',
        estatus: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        // Obtención de datos del usuario de la base de datos.
        const fetchUserData = async () => {
            try {
                const response = await fetch('/api/user-data?userId=1'); // Ajusta el userId según corresponda
                const data = await response.json();

                if (response.ok) {
                    setFormData({
                        nombreCompleto: data.nombre_completo,
                        fechaNacimiento: data.fecha_nacimiento,
                        nacionalidad: data.nacionalidad,
                        ocupacion: data.ocupacion_profesion,
                        sexo: data.sexo,
                        estadoCivil: data.estado_civil,
                        domicilio: data.domicilio_completo,
                        giro: data.giro_actividad,
                        habitosToxicos: data.habitos_toxicologicos,
                        entidadFederativa: data.entidad_federativa_nacimiento,
                        ingresosAnuales: data.ingresos_anuales,
                        correo: data.correo_electronico,
                        estatus: data.estatus // Suponiendo que el estatus es parte de los datos que recuperas
                    });
                } else {
                    console.error('Error al obtener los datos del usuario:', data.message);
                }
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/update-user?userId=1`, { // Ajusta el userId según corresponda
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Datos actualizados correctamente');
                navigate('/client-home'); // Redirige a la página principal del cliente
            } else {
                alert(data.message || 'Error al actualizar los datos');
            }
        } catch (error) {
            console.error('Error durante la actualización:', error);
            alert('Error de conexión con el servidor');
        }
    };

    return (
        <div className="App">
            <Header />
            <div className="edit-account-container">
                <div className="edit-account-content">
                    <div className="profile-header">
                        <div className="profile-info">
                            <p>{formData.correo}</p>
                            <p>Cliente</p>
                            <p>{formData.estatus}</p>
                            <button className="change-button">Cambiar Nombre de Usuario</button>
                            <button className="change-button">Cambiar Contraseña</button>
                        </div>
                    </div>
                    <div className="account-data">
                        <h3>Datos personales</h3>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="nombreCompleto"
                                placeholder="Nombre Completo"
                                className="edit-input"
                                value={formData.nombreCompleto}
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="fechaNacimiento"
                                placeholder="Fecha de Nacimiento"
                                className="edit-input"
                                value={formData.fechaNacimiento}
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="nacionalidad"
                                placeholder="Nacionalidad"
                                className="edit-input"
                                value={formData.nacionalidad}
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="ocupacion"
                                placeholder="Ocupación o Profesión"
                                className="edit-input"
                                value={formData.ocupacion}
                                onChange={handleChange}
                            />

                            <select
                                name="sexo"
                                className="edit-input"
                                value={formData.sexo}
                                onChange={handleChange}
                            >
                                <option value="Mujer">Mujer</option>
                                <option value="Hombre">Hombre</option>
                            </select>

                            <select
                                name="estadoCivil"
                                className="edit-input"
                                value={formData.estadoCivil}
                                onChange={handleChange}
                            >
                                <option value="Soltero">Soltero</option>
                                <option value="Casado">Casado</option>
                            </select>

                            <input
                                type="text"
                                name="domicilio"
                                placeholder="Domicilio completo"
                                className="edit-input"
                                value={formData.domicilio}
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="giro"
                                placeholder="Giro, actividad u objeto social"
                                className="edit-input"
                                value={formData.giro}
                                onChange={handleChange}
                            />

                            <select
                                name="habitosToxicos"
                                className="edit-input"
                                value={formData.habitosToxicos}
                                onChange={handleChange}
                            >
                                <option value="No">No</option>
                                <option value="Sí">Sí</option>
                            </select>

                            <input
                                type="text"
                                name="entidadFederativa"
                                placeholder="Entidad federativa de nacimiento"
                                className="edit-input"
                                value={formData.entidadFederativa}
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="ingresosAnuales"
                                placeholder="Ingresos Anuales"
                                className="edit-input"
                                value={formData.ingresosAnuales}
                                onChange={handleChange}
                            />

                            <button type="submit" className="edit-button">Editar</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EditAccount;
