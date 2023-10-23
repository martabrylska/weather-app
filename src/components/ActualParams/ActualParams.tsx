import React, {useContext, useEffect, useState} from 'react';
import {SearchContext} from "../../contexts/search.context";
import {ActualWeather} from "../../types/weather";
import {capitalizeFirstLetter} from "../../utils/capitalizeFirstLetter";

import "./ActualParams.css";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface Props {
    actualWeather: ActualWeather;
}

export const ActualParams = (props: Props) => {

    const {actualWeather} = props;

    const {search, setSearch} = useContext(SearchContext);
    const [link, setLink] = useState<string>('../../../public/haze.png');

    useEffect(() => {
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
    }, [actualWeather.desc])


    return (
        <>
            <div className="actual-weather-photo" style={

                {
                    backgroundImage: `url(${link})`
                }
            }>
            </div>
            <div className="actual-weather">
                <p>{new Date((actualWeather.time + actualWeather.timezone) * 1000).toUTCString()}</p>
                <div className="actual-weather-name">
                    <p>{search.name}</p>
                    <button><FontAwesomeIcon icon={solid("heart")}/></button>
                </div>
                <p className="state">{search.state &&
                    `${search.state}, `
                }{search.country}</p>
                <p>{capitalizeFirstLetter(actualWeather.desc)}</p>
                <p className="temp">{actualWeather.temp.toFixed()}°</p>
                <p>Feels like: {Number(actualWeather.tempSensed).toFixed()}°</p>
                <div>
                    <p>H: {actualWeather.tempMax.toFixed()}°</p>
                    <p>L: {actualWeather.tempMin.toFixed()}°</p>
                </div>
                <div>
                    <div><p>Cloudiness:</p> <p> {actualWeather.clouds}%</p></div>
                    <div><p>Humidity:</p> <p>{actualWeather.humidity}%</p></div>
                    <div><p>Pressure:</p> <p>{actualWeather.pressure}hPa</p></div>
                    <div><p>Rain:</p> <p>{actualWeather.rain.toFixed(1)}mm</p></div>
                    <div><p>Snow:</p> <p>{actualWeather.snow.toFixed(1)}mm</p></div>
                    <div><p>Wind:</p> <p>{(actualWeather.wind * 3600 / 1000).toFixed()}km/h</p></div>
                </div>

            </div>
        </>

    );
}