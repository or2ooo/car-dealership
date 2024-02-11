import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from 'services/userApi';
import { useAppDispatch } from 'app/hooks';
import { setUser } from 'state/slices/userSlice';

export const useLoginViewModel = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [login, { isLoading, isError }] = useLoginMutation();

    const handleLogin = async () => {
        try {
            const result = await login({ username, password }).unwrap();
            dispatch(setUser(result.user));
            navigate('/');
        } catch (error) {
            console.error('Login failed', error);
            throw error;
        }
    };

    return { setUsername, setPassword, handleLogin, isLoading, isError };
};
