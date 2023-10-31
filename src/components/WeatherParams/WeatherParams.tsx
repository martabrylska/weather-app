import React, {useContext, useEffect, useState} from 'react';
import {apiKey} from "../../constants";
import {SearchContext} from "../../contexts/search.context";
import {ActualWeather} from "../../types/weather";
import {ActualParams} from "../ActualParams/ActualParams";
import {NextHoursParams} from "../NextHoursParams/NextHoursParams";
import {NextDaysParams} from "../NextDaysParams/NextDaysParams";
import {UnitsContext} from "../../contexts/units.context";

export const WeatherParams = () => {
    const {search} = useContext(SearchContext);
    const {units} = useContext(UnitsContext);
    const [actualWeather, setActualWeather] = useState<ActualWeather>({
        time: 0,
        temp: 0,
        tempMax: 0,
        tempMin: 0,
        desc: '',
        short: '',
        timezone: 0,
        tempSensed: 0,
        humidity: 0,
        pressure: 0,
        wind: 0,
        clouds: 0,
        rain: 0,
        snow: 0,
    });

    useEffect(() => {
        (async () => {
            if (search.lat && search.lon) {
                const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${search.lat}&lon=${search.lon}&appid=${apiKey}&units=${units}`);
                const data = await resp.json();
                console.log(data);

                setActualWeather({
                    time: data.dt,
                    temp: data.main.temp,
                    tempMax: data.main.temp_max,
                    tempMin: data.main.temp_min,
                    tempSensed: data.main.feels_like,
                    humidity: data.main.humidity,
                    pressure: data.main.pressure,
                    wind: data.wind.speed,
                    clouds: data.clouds.all,
                    rain: data.rain ? data.rain['1h'] : 0,
                    snow: data.snow ? data.snow['1h'] : 0,
                    desc: data.weather[0].description,
                    short: data.weather[0].main,
                    timezone: data.timezone,
                })
            }
        })();
    }, [search]);

    return <>
        <ActualParams actualWeather={actualWeather}/>
        <NextHoursParams timezone={actualWeather.timezone}/>
        <NextDaysParams actualWeather={actualWeather}/>
    </>
}