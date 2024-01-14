import {apiUrl} from "../../config/config";
import {Units} from "../../types/units";

export const registerUser = async (registerForm: {
    name: string,
    password: string,
    passwordCopy: string,
    units: Units,
}) => {
    try {
        const res = await fetch(`${apiUrl}/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...registerForm,
            }),
        });

        return res.json();
    } catch (e) {

    }
}