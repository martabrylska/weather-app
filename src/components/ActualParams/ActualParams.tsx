import React, {useContext, useEffect, useState} from 'react';
import {apiKey} from "../../constants";
import {SearchContext} from "../../contexts/search.context";
import {ActualWeather} from "../../types/weather";
import {capitalizeFirstLetter} from "../../utils/capitalizeFirstLetter";

import "./ActualParams.css";

export const ActualParams = () => {

    const {search} = useContext(SearchContext);
    const [actualWeather, setActualWeather] = useState<ActualWeather>({
        temp: 0,
        tempMax: 0,
        tempMin: 0,
        desc: '',
        short: '',
        timezone: 0,
    });

    const [link, setLink] = useState<string>('../../../public/haze.png')

    useEffect(() => {
        (async () => {
            if (search.lat && search.lon) {
                const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${search.lat}&lon=${search.lon}&appid=${apiKey}&units=metric`);
                const data = await resp.json();
                console.log(data);
                console.log(new Date(1695965195).getUTCFullYear())

                setActualWeather({
                    temp: data.main.temp,
                    tempMax: data.main.temp_max,
                    tempMin: data.main.temp_min,
                    desc: data.weather[0].description,
                    short: data.weather[0].main,
                    timezone: data.timezone,
                })
            }
        })();
    }, [search]);

    useEffect(() => {
        if (actualWeather.short.toLowerCase() === "clouds" && actualWeather.desc.toLowerCase() === "few clouds") {
            (new Date().getHours() > 6 && new Date().getHours() < 20) ? setLink(`../../../few-clouds.png`) : setLink(`../../../few-cloudsn.png`);
        } else if (["clear", "clouds", "rain", "snow"].includes(actualWeather.short.toLowerCase()) && (new Date().getHours() < 6 || new Date().getHours() > 20)) {
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