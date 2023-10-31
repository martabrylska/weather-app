import React, {useContext, useEffect, useState} from 'react';
import {SingleHourWeather} from "./SingleHourWeather";
import {ShortTermWeather} from "../../types/weather";
import {apiKey} from "../../constants";
import {SearchContext} from "../../contexts/search.context";

import "./NextHoursParams.css";
import {UnitsContext} from "../../contexts/units.context";

interface Props {
    timezone: number;
}

export const NextHoursParams = (props: Props) => {

    const [nextHoursWeather, setNextHoursWeather] = useState<ShortTermWeather[]>([]);
    const {search} = useContext(SearchContext);
    const {units} = useContext(UnitsContext);

    useEffect(() => {
        (async () => {
            if (search.lat && search.lon) {
                setNextHoursWeather([]);
                const resp = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${search.lat}&lon=${search.lon}&cnt=5&appid=${apiKey}&units=${units}`);
                const data = await resp.json();
                const list = data.list;
                console.log(list);

                list.map((hour: any) => {
                    setNextHoursWeather(nextHoursWeather => [...nextHoursWeather, {
                        time: hour.dt,
                        temp: hour.main.temp,
                        icon: hour.weather[0].icon,
                        desc: hour.weather[0].description,
                        pod: hour.sys.pod,
                        rain: hour.rain ? hour.rain['3h'] : 0,
                        snow: hour.snow ? hour.snow['3h'] : 0,
                    }]);
                })
                console.log(nextHoursWeather);
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