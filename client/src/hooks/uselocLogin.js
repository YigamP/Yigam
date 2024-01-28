import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useLocLogin = () => {
    const navigation = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigation('/login');
        }
    }, []);
};
