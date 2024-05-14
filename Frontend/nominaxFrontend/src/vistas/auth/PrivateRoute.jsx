
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('authToken'); // Aquí podrías usar un contexto o alguna lógica para verificar autenticación
    return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
