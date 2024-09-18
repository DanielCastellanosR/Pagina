import React, { useState } from 'react';
import axios from 'axios';


const ForgotPassword = () => {
    const [registroAcademico, setRegistroAcademico] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    

    const handlePasswordReset = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/reset-password', {
                registro_academico: registroAcademico,
                correo: email,
                nueva_contrasena: newPassword,
            });
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error al restablecer la contraseña:', error);
            setMessage('Error al restablecer la contraseña. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className='bg-white px-10 py-10 rounded-xl border-2 border-gray-100 shadow-lg w-full max-w-sm'>
                <h1 className='text-3xl font-bold text-center'>Restablecer Contraseña</h1>
                <form className="mt-6" onSubmit={handlePasswordReset}>
                    <div className="form-group mb-4">
                        <label htmlFor="registro" className='block text-sm font-medium'>Registro Académico</label>
                        <input
                            type="text"
                            id="registro"
                            required
                            onChange={(e) => setRegistroAcademico(e.target.value)}
                            value={registroAcademico}
                            className='mt-1 py-2 px-3 rounded-xl bg-slate-100 w-full border-2 border-gray-300'
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="email" className='block text-sm font-medium'>Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className='mt-1 py-2 px-3 rounded-xl bg-slate-100 w-full border-2 border-gray-300'
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="newPassword" className='block text-sm font-medium'>Nueva Contraseña</label>
                        <input
                            type="password"
                            id="newPassword"
                            required
                            onChange={(e) => setNewPassword(e.target.value)}
                            value={newPassword}
                            className='mt-1 py-2 px-3 rounded-xl bg-slate-100 w-full border-2 border-gray-300'
                        />
                    </div>
                    <button 
                        type="submit"
                        className="block w-full py-2 mb-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-all"
                    >
                        Restablecer Contraseña
                    </button>
                    {message && <p className="text-center mt-2">{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;