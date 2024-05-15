
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './vistas/auth/LoginPage';
import PrivateRoute from './vistas/auth/PrivateRoute';
import DashboardAdmin from './vistas/admin/dashboardAdmin/DashboardAdmin';
import DashboardEmpleado from './vistas/empleado/DashboardEmpleado/DashboardEmpleado';

import GestionEmpleados from './vistas/admin/GestionEmpleados/GestionEmpleados';
import EstructuraOrganizativa from './vistas/admin/EstructuraOrganizativa/EstructuraOrganizativa';
import ControlAsistencias from './vistas/admin/ControlAsistencias/ControlAsistencias';
import GestionNomina from './vistas/admin/GestionNomina/GestionNomina';
import GestionBeneficios from './vistas/admin/GestionBeneficios/GestionBeneficios';


const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/admin" element={<PrivateRoute><DashboardAdmin /></PrivateRoute>}>
                    <Route index element={<GestionEmpleados />} />
                    <Route path="gestion-empleados" element={<GestionEmpleados />} />
                    <Route path="estructura-organizativa" element={<EstructuraOrganizativa />} />
                    <Route path="control-asistencias" element={<ControlAsistencias />} />
                    <Route path="gestion-nomina" element={<GestionNomina />} />
                    <Route path="gestion-beneficios" element={<GestionBeneficios />} />
                </Route>              

                <Route path="/empleado" element={<PrivateRoute><DashboardEmpleado /></PrivateRoute>} />

            </Routes>
        </Router>
    );
};

export default AppRoutes;
