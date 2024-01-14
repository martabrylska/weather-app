import {Units} from "../../types/units";
import {apiKey, weatherApiUrl} from "../../constants";

export const getForecastedWeather = async (lat: number, lon: number, units: Units) => {
    try {
        const res = await fetch(`${weatherApiUrl}/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`);
        return res.json();
    } catch (e) {
        return e;
    }

}