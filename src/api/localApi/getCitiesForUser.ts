import {apiUrl} from "../../config/config";

export const getCitiesForUser = async () => {
    try {
        const res = await fetch(`${apiUrl}/city/user`, {
            credentials: "include",
        })
        return res.json();
    } catch (e) {
        return e
    }

}
