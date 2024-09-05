import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', {
                correo: email,
                contrasena: password,
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error durante el inicio de sesión:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className='bg-white px-10 py-10 rounded-xl border-2 border-gray-100 shadow-lg w-full max-w-sm'>
                <h1 className='text-3xl font-bold text-center'>Inicia Sesion</h1>
                <p className='font-medium text-lg mt-2 text-center'>Bienvenido a FIUSAC Social</p>
                <form className="register-form mt-6" onSubmit={handleLogin}>
                    <div className="form-group mb-4">
                        <label htmlFor="user" className='block text-sm font-medium'>Email</label>
                        <input
                            type="text"
                            id="user"
                            name="user"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className='mt-1 py-2 px-3 rounded-xl bg-slate-100 w-full border-2 border-gray-300'
                        />
                    </div>
                    <div className="form-group mb-6">
                        <label htmlFor="password" className='block text-sm font-medium'>Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className='mt-1 py-2 px-3 rounded-xl bg-slate-100 w-full border-2 border-gray-300'
                        />
                    </div>
                    <button 
                        type="submit"
                        className="block w-full py-2 mb-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-all"
                    >
                        Login
                    </button>
                    <button 
                        type="button" 
                        onClick={() => navigate('/registro')}
                        className="block w-full py-2 rounded-xl bg-green-500 text-white hover:bg-green-600 transition-all"
                    >
                        Registro
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;