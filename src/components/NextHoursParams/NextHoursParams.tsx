import React, {useContext, useEffect, useState} from 'react';
import {SingleHourWeather} from "./SingleHourWeather";
import {ShortTermWeather} from "../../types/weather";
import {apiKey} from "../../constants";
import {SearchContext} from "../../contexts/search.context";

import "./NextHoursParams.css";

export const NextHoursParams = () => {

    const [nextHoursWeather, setNextHoursWeather] = useState<ShortTermWeather[]>([]);
    const {search} = useContext(SearchContext);

    useEffect(() => {
        (async () => {
            if (search.lat && search.lon) {
                setNextHoursWeather([]);
                const resp = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${search.lat}&lon=${search.lon}&cnt=5&appid=${apiKey}&units=metric`);
                const data = await resp.json();
                const list = data.list;
                // console.log(list);

                list.map((hour: any) => {
                    setNextHoursWeather(nextHoursWeather => [...nextHoursWeather, {
                        time: hour.dt_txt.split(' '),
                        temp: hour.main.temp,
                        icon: hour.weather[0].icon,
                        desc: hour.weather[0].description,
                    }]);
                })
            }
        })();
    }, [search]);

    return <div className="next-hours">
        {
            nextHoursWeather.map((hour, i) => (
                <SingleHourWeather key={i} nextHoursWeather={nextHoursWeather[i]}/>
            ))
        }
    </div>

}