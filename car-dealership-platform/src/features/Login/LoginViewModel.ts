import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useLoginMutation } from 'api/queries/userApi';
import { useAppDispatch } from 'app/hooks';
import { setUser } from 'state/slices/userSlice';

export const useLoginViewModel = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate(); // Use the useNavigate hook
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [login, { isLoading }] = useLoginMutation();

    const handleLogin = async () => {
        try {
            const result = await login({ username, password }).unwrap();
            dispatch(setUser(result.user));
            navigate('/cars');
        } catch (error) {
            alert('Login failed');
        }
    };

    return { setUsername, setPassword, handleLogin, isLoading };
};
