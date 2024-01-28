import AdminInquiryLayout from '../../components/Admin/AdminInquiryLayout';
import { useLocLogin } from '../../hooks/uselocLogin';

const AdminInquiryPage = () => {
    useLocLogin();
    return <AdminInquiryLayout />;
};

export default AdminInquiryPage;
