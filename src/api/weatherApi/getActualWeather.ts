import {apiKey, weatherApiUrl} from "../../constants";
import {Units} from "../../types/units";

export const getActualWeather = async (lat: number, lon: number, units: Units) => {
    try {
        const res = await fetch(`${weatherApiUrl}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`);
        return res.json();
    } catch (e) {
        return e;
    }

}
