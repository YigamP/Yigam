import AdminDataLayout from '../../components/Admin/AdminDataLayout';
import { useLocLogin } from '../../hooks/uselocLogin';

const AdminDataPage = () => {
    useLocLogin();
    return <AdminDataLayout />;
};

export default AdminDataPage;
