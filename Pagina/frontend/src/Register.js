import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [registroAcademico, setRegistroAcademico] = useState('');
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [exito, setExito] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/register', {
                registro_academico: registroAcademico,
                nombres,
                apellidos,
                correo: email,
                contrasena: password,
            });
            console.log(response.data);
            setExito(true);
            setTimeout(() => {
                navigate('/login');
            }, 3000); // Redirigir después de 3 segundos
        } catch (error) {
            if (error.response) {
                // El servidor respondió con un código de estado fuera del rango 2xx
                console.error('Error response:', error.response.data);
                setError(error.response.data.message);
            } else if (error.request) {
                // La solicitud fue hecha pero no se recibió respuesta
                console.error('No response:', error.request);
                setError('No se recibió respuesta del servidor.');
            } else {
                // Algo sucedió al configurar la solicitud que desencadenó un error
                console.error('Error during registration:', error.message);
                setError('Error durante el registro.');
            }
        }
    };

    const handleCarnetChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setRegistroAcademico(value);
        }
    };

    const handleNombresChange = (e) => {
        const value = e.target.value;
        if (/^[a-zA-Z\s]*$/.test(value)) {
            setNombres(value);
        }
    };

    const handleApellidosChange = (e) => {
        const value = e.target.value;
        if (/^[a-zA-Z\s]*$/.test(value)) {
            setApellidos(value);
        }
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
    };

    const validateEmail = () => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Correo electrónico no válido.');
        } else {
            setError('');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white px-10 py-10 rounded-xl border-2 border-gray-100 shadow-lg w-full max-w-lg">
                <h1 className="text-3xl font-bold text-center">Registro</h1>
                <p className="font-medium text-lg mt-2 text-center">Por favor, llena el formulario para registrarte.</p>
                {exito ? (
                    <div className="text-center mt-6">
                        <p className="text-green-600 text-lg">¡Registro exitoso!</p>
                        <p className="text-gray-600">Redirigiendo al login...</p>
                    </div>
                ) : (
                    <form className="mt-6" onSubmit={handleRegister}>
                        <div className="form-group mb-4">
                            <label htmlFor="code" className="block text-sm font-medium">Número de Carnet/Código USAC</label>
                            <input
                                type="text"
                                id="code"
                                name="code"
                                required
                                value={registroAcademico}
                                onChange={handleCarnetChange}
                                className="mt-1 py-2 px-3 rounded-xl bg-slate-100 w-full border-2 border-gray-300"
                            />
                        </div>
                        <div className="flex gap-4 mb-4">
                            <div className="flex-1">
                                <label htmlFor="name" className="block text-sm font-medium">Nombres</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={nombres}
                                    onChange={handleNombresChange}
                                    className="mt-1 py-2 px-3 rounded-xl bg-slate-100 w-full border-2 border-gray-300"
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="apellido" className="block text-sm font-medium">Apellidos</label>
                                <input
                                    type="text"
                                    id="apellido"
                                    name="apellido"
                                    required
                                    value={apellidos}
                                    onChange={handleApellidosChange}
                                    className="mt-1 py-2 px-3 rounded-xl bg-slate-100 w-full border-2 border-gray-300"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium">Correo Electrónico</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={email}
                                onChange={handleEmailChange}
                                onBlur={validateEmail}
                                className="mt-1 py-2 px-3 rounded-xl bg-slate-100 w-full border-2 border-gray-300"
                            />
                        </div>
                        <div className="flex gap-4 mb-4">
                            <div className="flex-1">
                                <label htmlFor="contraseña" className="block text-sm font-medium">Contraseña</label>
                                <input
                                    type="password"
                                    id="contraseña"
                                    name="contraseña"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-1 py-2 px-3 rounded-xl bg-slate-100 w-full border-2 border-gray-300"
                                />
                            </div>
                        </div>
                        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
                        <button
                            type="submit"
                            className="w-full py-2 mt-5 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-all"
                        >
                            Registrarse
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Register;