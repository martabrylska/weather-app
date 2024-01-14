import {apiUrl} from "../../config/config";

export const getOneCity = async (lat: number, lon: number) => {
    try{
        const res = await fetch(`${apiUrl}/city/get-one?lat=${lat}&lon=${lon}`, {
            credentials: "include",
        })
        return res.json();
    } catch (e) {
        return e
    }
}