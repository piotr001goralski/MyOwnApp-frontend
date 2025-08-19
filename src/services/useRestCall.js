import { useCallback } from 'react';

export function useRestCall() {
    const authHeader = useCallback(() => {
        const localStoreUserData = localStorage.getItem('user');
        const user = localStoreUserData ? JSON.parse(localStoreUserData) : undefined;

        if (user && user.token) {
            return { Authorization: 'Bearer ' + user.token };
        } else {
            return undefined;
        }
    }, []);

    const handleResponse = async (response) => {
        return response
            .then((response) => {
                if (response.status === 403) {
                    localStorage.removeItem('user');
                    location.reload();
                }
                if (!response.ok) {
                    throw new Error(`internal error: ${response.status}`);
                }
                if (response.status === 204) {
                    return response;
                }
                return response.json();
            });
    }

    const getRequest = async (url) => {
        const response = fetch(url, {
            method: 'GET',
            headers: authHeader()
        });
        return handleResponse(response);
    };

    const postRequest = async (url, body) => {
        const response = fetch(url, {
            method: 'POST',
            headers: { ...authHeader(), 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        return handleResponse(response);
    };

    const deleteRequest = async (url) => {
        const response = fetch(url, {
            method: 'DELETE',
            headers: authHeader()
        });
        return handleResponse(response);
    };

    const putRequest = async (url, body) => {
        const response = fetch(url, {
            method: 'PUT',
            headers: { ...authHeader(), 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        return handleResponse(response);
    };

    return {
        getRequest,
        postRequest,
        deleteRequest,
        putRequest
    };
}
