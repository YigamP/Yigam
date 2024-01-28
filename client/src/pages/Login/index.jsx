import { useEffect } from 'react';
import LoginLayout from '../../components/Login/LoginLayout';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigation = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigation('/');
        }
    }, []);
    return <LoginLayout />;
};

export default LoginPage;
