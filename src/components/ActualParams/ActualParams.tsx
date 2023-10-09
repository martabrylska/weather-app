import React, {useContext, useEffect, useState} from 'react';
import {SearchContext} from "../../contexts/search.context";
import {ActualWeather} from "../../types/weather";
import {capitalizeFirstLetter} from "../../utils/capitalizeFirstLetter";

import "./ActualParams.css";

interface Props {
    actualWeather: ActualWeather;
}

export const ActualParams = (props: Props) => {

    const {actualWeather} = props;

    const {search} = useContext(SearchContext);
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
                <h2>{search.name}</h2>
                <h3>{search.state &&
                    `${search.state}, `
                }{search.country}</h3>
                <h1>{Number(actualWeather.temp).toFixed()}°</h1>
                <p>{capitalizeFirstLetter(actualWeather.desc)}</p>
                <div>
                    <p>H: {Number(actualWeather.tempMax).toFixed()}°</p>
                    <p>L: {Number(actualWeather.tempMin).toFixed()}°</p>
                </div>
            </div>
    </>

    );
}