import AdminSearchHistoryLayout from '../../components/Admin/AdminSearchHistoryLayout';
import { useLocLogin } from '../../hooks/uselocLogin';

const AdminSearchHistoryPage = () => {
    useLocLogin();
    return <AdminSearchHistoryLayout />;
};

export default AdminSearchHistoryPage;
