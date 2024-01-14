import {apiUrl} from "../../config/config";

export const logout = async () => {
    try {
        const res = await fetch(`${apiUrl}/auth/logout`, {
            credentials: "include",
        });

        return res.json();
    } catch (e) {
        return e;
    }
}