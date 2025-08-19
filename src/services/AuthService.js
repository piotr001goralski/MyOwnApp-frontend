import { useRestCall } from "./useRestCall.js";

const API_URL = import.meta.env.VITE_API_URL + '/auth';

export function useAuthService() {
    const { postRequest } = useRestCall();

    const logout = () => {
        localStorage.removeItem('user');
        location.reload();
    }

    const getSignInUser = () => {
        return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
    }

    const signIn = async (login, password) => {
        return postRequest(API_URL + '/signIn', { username: login, password: password })
            .then((data) => {
                if (data !== null) {
                    localStorage.setItem("user", JSON.stringify(data));
                }
                return data;
            });
    };

    const signUp = async (username, password) => {
        return postRequest(API_URL + '/signUp', { username: username, password: password });
    };

    return {
        logout,
        getSignInUser,
        signIn,
        signUp
    };
}
