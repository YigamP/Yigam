import { useNavigate } from 'react-router-dom';
import JoinLayout from '../../components/Join/JoinLayout';
import { useEffect } from 'react';

const JoinPage = () => {
    const navigation = useNavigate();
    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            navigation('/');
        }
    }, []);

    return <JoinLayout />;
};

export default JoinPage;
