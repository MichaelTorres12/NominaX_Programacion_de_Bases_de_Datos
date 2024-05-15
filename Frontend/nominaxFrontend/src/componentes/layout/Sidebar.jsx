
import { Link, useNavigate, useLocation } from 'react-router-dom';
import nominaxLogo from '../../assets/images/nominaxLogo.png';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        localStorage.clear(); // Limpia el localStorage, removiendo datos como el token de autenticación
        navigate("/"); // Redirige al usuario a la página de login
    };

    // Función para determinar si el enlace está activo basado en la ruta actual
    const isActive = (path) => location.pathname.includes(path);

    return (
        <div className="sidebar w-[350px] pt-5 flex flex-col h-screen bg-white">
            <div className='h-40 w-full mb-6 flex flex-col items-center'>
                <picture>
                    <img className='nominaxLogo mb-2' src={nominaxLogo} alt='Logo de Nominax'/>
                </picture>
                <h3 className='text-4xl font-semibold text-violet-600'>NominaX</h3>
                <p>Vista de administrador</p>
            </div>
    
            <hr className='h-[2px] bg-zinc-300 mb-6' />
    
            <ul className='text-xl gap-7 flex flex-col flex-grow'>
                <li className={`${isActive('/admin/gestion-empleados') ? 'bg-gray-100 h-12 flex items-center text-blue-700 font-semibold'  : ''} hover:text-blue-700 hover:font-semibold px-5`}>
                    <Link to="/admin/gestion-empleados">Gestión de Empleados</Link>
                </li>
                <li className={`${isActive('/admin/estructura-organizativa') ? 'bg-gray-100 h-12 flex items-center text-blue-700 font-semibold' : ''} hover:text-blue-700 px-5`}>
                    <Link to="/admin/estructura-organizativa">Estructura Organizativa</Link>
                </li>
                <li className={`${isActive('/admin/control-asistencias') ? 'bg-gray-100 h-12 flex items-center text-blue-700 font-semibold' : ''} hover:text-blue-700 px-5`}>
                    <Link to="/admin/control-asistencias">Control de Asistencias</Link>
                </li>
                <li className={`${isActive('/admin/gestion-nomina') ? 'bg-gray-100 h-12 flex items-center text-blue-700 font-semibold' : ''} hover:text-blue-700 px-5`}>
                    <Link to="/admin/gestion-nomina">Gestión de Nómina</Link>
                </li>
                <li className={`${isActive('/admin/gestion-beneficios') ? 'bg-gray-100 h-12 flex items-center text-blue-700 font-semibold' : ''} hover:text-blue-700 px-5`}>
                    <Link to="/admin/gestion-beneficios">Gestión de Beneficios</Link>
                </li>
            </ul>
    
            <div className='flex justify-center mt-auto mb-10'>
                <button onClick={handleLogout} className="w-[70%] h-auto bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-4 rounded text-xl">
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );    
};

export default Sidebar;
