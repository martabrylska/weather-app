import {apiUrl} from "../../config/config";
import {ActualWeather} from "../../types/weather";

export const addWeatherForFavCity = async (favId: string, favActualWeather: ActualWeather) => {
    try {
        await fetch(`${apiUrl}/weather/add/${favId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({
                ...favActualWeather,
            }),
        });
    } catch (e) {
        return e
    }
}
