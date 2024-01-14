import {apiUrl} from "../../config/config";

export const removeFromFavorites = async (favId: string) => {
    try {
        const res = await fetch(`${apiUrl}/city/remove/${favId}`, {
            method: 'DELETE',
            credentials: 'include',
        })
        return res.json();
    } catch (e) {
        return e
    }
}