import {apiUrl} from "../../config/config";

export const login = async (loginForm: {
    name: string,
    password: string,
}) => {
    try {
        const res = await fetch(`${apiUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({
                ...loginForm,
            }),
        });

        return res.json();
    } catch (e) {
        return e
    }
}
