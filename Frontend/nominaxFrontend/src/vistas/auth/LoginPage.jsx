import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import Vector from '../../assets/images/Vector.png';
import Vector2 from '../../assets/images/Vector2.png';
import nominaxLogo from '../../assets/images/nominaxLogo.png';

const LoginPage = () => {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Limpiar el localStorage cuando se renderice la página de login
    useEffect(() => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('nombreUsuario');
        localStorage.removeItem('contrasena');
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', {
                nombreUsuario,
                contrasena,
            });

            localStorage.setItem('authToken', response.data.token); // Guarda el token de autenticación
            localStorage.setItem('nombreUsuario', nombreUsuario); // Guarda el nombre de usuario
            localStorage.setItem('contrasena', contrasena); // Guarda la contraseña (no recomendado en producción)

            if (response.data.vista === 'admin') {
                navigate('/admin');
            } else {
                navigate('/empleado');
            }
        } catch (error) {
            setError('Credenciales no válidas');
        }
    };

    return (
        <div className="login-page">
            <div className="decorative-shape shape-top-left">
                <img src={Vector2} alt="borde" />
            </div>
            <div className="decorative-shape shape-bottom-right">
                <img src={Vector} alt="borde" />
            </div>
            <div className="login-container">
                <div>
                    <img className='nominaxLogo' src={nominaxLogo} alt='Logo de Nominax'/>
                    <h3 className='nominaxLogoText'>NominaX</h3>
                </div>
                <h2>Iniciar Sesión</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Usuario:</label>
                        <input
                            type="text"
                            value={nombreUsuario}
                            onChange={(e) => setNombreUsuario(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Iniciar Sesión</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
