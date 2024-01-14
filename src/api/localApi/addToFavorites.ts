import {apiUrl} from "../../config/config";
import {SearchedCity} from "../../types/city";

export const addToFavorites = async (search: SearchedCity) => {
    try {
        const res = await fetch(`${apiUrl}/city/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({
                ...search,
            }),
        });
        return res.json();
    } catch (e) {
        return e
    }
}