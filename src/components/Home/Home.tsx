import React, {useContext, useEffect, useState} from 'react';
import {SearchContext} from "../../contexts/search.context";
import {UnitsContext} from "../../contexts/units.context";
import {Search} from "../common/Search/Search";
import {ActualParams} from "../ActualParams/ActualParams";
import {NextHoursParams} from "../NextHoursParams/NextHoursParams";
import {NextDaysParams} from "../NextDaysParams/NextDaysParams";
import {Loader} from "../common/Loader/Loader";
import {Info} from "../common/Info/Info";
import {ActualWeather} from "../../types/weather";
import {apiKey} from "../../constants";

export const Home = () => {
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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                if (search.lat && search.lon) {
                    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${search.lat}&lon=${search.lon}&appid=${apiKey}&units=${units}`);
                    const data = await res.json();

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
            } catch (e) {
                setError(true);
            } finally {
                setLoading(false);
            }
        })();
    }, [search, units]);

    if (loading) {
        return <Loader/>
    }

    if (error) {
        return <Info text={'Something went wrong. Try again later.'}></Info>
    }

    return <>
        <Search/>
        <ActualParams actualWeather={actualWeather}/>
        <NextHoursParams timezone={actualWeather.timezone}/>
        <NextDaysParams actualWeather={actualWeather}/>
    </>
}