import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { dispatch } = useAuthContext();

    const signup = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const reponse = await fetch(
            'http://localhost:4000/api/user/signup',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            }
        );

        const json = await reponse.json();

        if (!reponse.ok) {
            setIsLoading(false);
            setError(json.error);
        }

        if (reponse.ok) {
            //save the user to local storage
            localStorage.setItem('user', JSON.stringify(json));

            //update the auth context
            dispatch({ type: 'LOGIN', payload: json });

            setIsLoading(false);
        }
    };

    return { signup, isLoading, error };
};
