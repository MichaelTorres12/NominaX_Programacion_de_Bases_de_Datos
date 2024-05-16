
import { Outlet } from 'react-router-dom';
import Sidebar from '../../../componentes/layout/Sidebar';

const DashboardAdmin = () => {
    return (
        <div className="dashboard-admin">
            <Sidebar />
            <div className=" w-full">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardAdmin;
