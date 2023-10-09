import React, {useContext, useEffect, useState} from 'react';
import {SingleHourWeather} from "./SingleHourWeather";
import {ActualWeather, ShortTermWeather} from "../../types/weather";
import {apiKey} from "../../constants";
import {SearchContext} from "../../contexts/search.context";

import "./NextHoursParams.css";

interface Props {
    timezone: number;
}

export const NextHoursParams = (props: Props) => {

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
                        time: hour.dt,
                        temp: hour.main.temp,
                        icon: hour.weather[0].icon,
                        desc: hour.weather[0].description,
                        pod: hour.sys.pod,
                    }]);
                })
            }
        })();
    }, [search]);

    return <div className="next-hours">
        {
            nextHoursWeather.map((hour, i) => (
                <SingleHourWeather key={i} nextHoursWeather={nextHoursWeather[i]} timezone={props.timezone}/>
            ))
        }
    </div>

}