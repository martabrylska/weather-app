import {apiKey} from "../../constants";

export const findCitiesForInputVal = async (inputVal: string): Promise<any> => {
    try{
        const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${inputVal}&limit=5&appid=${apiKey}`);
        return res.json();
    } catch (e) {
        return e;
    }
}
