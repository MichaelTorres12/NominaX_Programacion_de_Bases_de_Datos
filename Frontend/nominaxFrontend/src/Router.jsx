
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './vistas/auth/LoginPage';
import DashboardAdmin from './vistas/admin/dashboardAdmin/DashboardAdmin';
import DashboardEmpleado from './vistas/empleado/DashboardEmpleado/DashboardEmpleado';
import PrivateRoute from './vistas/auth/PrivateRoute';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/admin" element={<PrivateRoute><DashboardAdmin /></PrivateRoute>} />
                <Route path="/empleado" element={<PrivateRoute><DashboardEmpleado /></PrivateRoute>} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
