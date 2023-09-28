import React, {useContext, useEffect, useState} from 'react';

import "./ActualParams.css";
import {apiKey} from "../../constants";
import {SearchContext} from "../../contexts/search.context";
import {ActualWeather} from "../../types/weather";
import {capitalizeFirstLetter} from "../../utils/capitalizeFirstLetter";

export const ActualParams = () => {

    const {search} = useContext(SearchContext);
    const [actualWeather, setActualWeather] = useState<ActualWeather>({
        temp: '',
        tempMax: '',
        tempMin: '',
        desc: '',
        short: '',
    });

    useEffect(() => {
        (async () => {
            if (search.lat && search.lon) {
                const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${search.lat}&lon=${search.lon}&appid=${apiKey}&units=metric`);
                const data = await resp.json();
                console.log(data);

                setActualWeather({
                    temp: data.main.temp,
                    tempMax: data.main.temp_max,
                    tempMin: data.main.temp_min,
                    desc: data.weather[0].description,
                    short: data.weather[0].main,
                })
            }
        })();
    }, [search]);


    return (
        <div className="actual-weather">
            <h2>{search.name}</h2>
            <h3>{search.state}, {search.country}</h3>
            <h1>{Number(actualWeather.temp).toFixed()}°</h1>
            <p>{capitalizeFirstLetter(actualWeather.desc)}</p>
            <div>
                <p>H: {Number(actualWeather.tempMax).toFixed()}°</p>
                <p>L: {Number(actualWeather.tempMin).toFixed()}°</p>
            </div>
        </div>
    );
}