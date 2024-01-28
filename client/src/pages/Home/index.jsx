import MainLayout from '../../components/Main/MainLayout';
import { useLocLogin } from '../../hooks/uselocLogin';

const Home = () => {
    useLocLogin();
    return <MainLayout />;
};

export default Home;
