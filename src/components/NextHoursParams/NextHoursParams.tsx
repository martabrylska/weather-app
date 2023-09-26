import React, {useContext, useEffect, useState} from 'react';
import {SingleHourWeather} from "./SingleHourWeather";

import "./NextHoursParams.css"
import {CityContext} from "../../contexts/city.context";
import {Weather} from "../../types/city";

export const NextHoursParams = () => {

    const [nextHoursWeather, setNextHoursWeather] = useState<Weather[]>([]);

    const {city, setCity} = useContext(CityContext);

    const apiKey = process.env.REACT_APP_API_KEY;
    console.log(apiKey);

    useEffect(() => {
        (async () => {
            if (city.lat && city.lon) {
                const resp = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&cnt=5&appid=${apiKey}&units=metric`);
                const data = await resp.json();
                const list = data.list;

                list.map((hour: any, i: number) => {
                    setNextHoursWeather([...nextHoursWeather, {
                        time: hour.dt,
                        temp: hour.main.temp,
                    }])
                })
            }
        })();
    }, [city.lat]);


    return <div className="next-hours">
        {
            nextHoursWeather.map(hour => (
                <SingleHourWeather nextHoursWeather={nextHoursWeather}></SingleHourWeather>
            ))
        }
    </div>

}