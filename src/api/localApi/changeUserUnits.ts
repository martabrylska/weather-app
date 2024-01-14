import {apiUrl} from "../../config/config";
import {Units} from "../../types/units";

export const changeUserUnits = async (units: Units) => {
    try {
        const res = await fetch(`${apiUrl}/user/units/${units}`, {
            method: 'PATCH',
            credentials: "include",
        });
       return res.json();
    } catch (e) {
        return e
    }
}