import AdminLayout from '../../components/Admin/AdminLayout';
import { useLocLogin } from '../../hooks/uselocLogin';

const AdminPage = () => {
    useLocLogin();
    return <AdminLayout />;
};

export default AdminPage;
