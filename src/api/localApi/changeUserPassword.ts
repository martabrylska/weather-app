import {apiUrl} from "../../config/config";

export const changeUserPassword = async (currentPassword: string, newPassword: string) => {
    try {
        const res = await fetch(`${apiUrl}/user/password`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({
                currentPassword,
                newPassword,
            }),
        });

        return res.json();
    } catch (e) {
        return e;
    }
}