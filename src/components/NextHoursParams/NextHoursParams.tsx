import React, {useContext, useEffect, useState} from 'react';
import {SearchContext} from "../../contexts/search.context";
import {UnitsContext} from "../../contexts/units.context";
import {SingleHourWeather} from "./SingleHourWeather";
import {Loader} from "../common/Loader/Loader";
import {ShortTermWeather} from "../../types/weather";
import {apiKey} from "../../constants";

import "./NextHoursParams.css";

interface Props {
    timezone: number;
}

export const NextHoursParams = (props: Props) => {

    const [nextHoursWeather, setNextHoursWeather] = useState<ShortTermWeather[]>([]);
    const {search} = useContext(SearchContext);
    const {units} = useContext(UnitsContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        try {
            (async () => {
                if (search.lat && search.lon) {
                    setNextHoursWeather([]);
                    const resp = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${search.lat}&lon=${search.lon}&cnt=5&appid=${apiKey}&units=${units}`);
                    const data = await resp.json();
                    const list = data.list;

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
                }

            })();
        } finally {
            setLoading(false);
        }
    }, [search]);

    return <div className="next-hours">
        {
            loading ? <Loader/> : nextHoursWeather.map((hour, i) => (
                <SingleHourWeather key={i} nextHoursWeather={nextHoursWeather[i]} timezone={props.timezone}/>
            ))
        }
    </div>

}