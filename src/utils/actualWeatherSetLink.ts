import {ActualWeather} from "../types/weather";

export const actualWeatherSetLink = (actualWeather: ActualWeather, setLink: (link: string)=> void) => {
    const localTime = new Date((actualWeather.time + actualWeather.timezone) * 1000).getUTCHours();
    if (actualWeather.short.toLowerCase() === "clouds" && actualWeather.desc.toLowerCase() === "few clouds") {
        (localTime > 6 && localTime < 20) ? setLink(`../../../few-clouds.png`) : setLink(`../../../few-cloudsn.png`);
    } else if (["clear", "clouds", "rain", "snow"].includes(actualWeather.short.toLowerCase()) && (localTime < 6 || localTime > 20)) {
        setLink(`../../../${actualWeather.short.toLowerCase()}n.png`);
    } else if (["clear", "clouds", "rain", "snow", "thunderstorm"].includes(actualWeather.short.toLowerCase())) {
        setLink(`../../../${actualWeather.short.toLowerCase()}.png`);
    } else {
        setLink(`../../../haze.png`);
    }
}