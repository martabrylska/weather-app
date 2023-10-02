import React, {useContext, useEffect, useState} from 'react';
import {SingleDayWeather} from "./SingleDayWeather";

import "./NextDaysParams.css"
import {ShortTermWeather} from "../../types/weather";
import {apiKey} from "../../constants";
import {SearchContext} from "../../contexts/search.context";

export const NextDaysParams = () => {

    const [nextDaysWeather, setNextDaysWeather] = useState<ShortTermWeather[]>([]);
    const [nextNightsWeather, setNextNightsWeather] = useState<ShortTermWeather[]>([]);

    const {search} = useContext(SearchContext);

    useEffect(() => {
        (async () => {
            if (search.lat && search.lon) {
                setNextDaysWeather([]);
                setNextNightsWeather([]);
                const resp = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${search.lat}&lon=${search.lon}&appid=${apiKey}&units=metric`);
                const data = await resp.json();
                console.log(data);
                const nightList = data.list.filter((period: any) => period.dt_txt.split(' ')[1] === '00:00:00');
                const dayList = data.list.filter((period: any) => period.dt_txt.split(' ')[1] === '12:00:00');

                if ((new Date()).getHours() >=  12) {
                    nightList.splice(0,1);
                }


                dayList.map((day: any) => {
                    setNextDaysWeather(nextDaysWeather => [...nextDaysWeather, {
                        time: day.dt_txt.split(' '),
                        temp: day.main.temp,
                        icon: day.weather[0].icon,
                        desc: day.weather[0].description,
                    }]);
                })

                nightList.map((night: any) => {
                    setNextNightsWeather(nextNightsWeather => [...nextNightsWeather, {
                        time: night.dt_txt.split(' '),
                        temp: night.main.temp,
                        icon: night.weather[0].icon,
                        desc: night.weather[0].description,
                    }]);
                })
            }
        })();
    }, [search]);

    return <div className="next-days">
        {
            nextNightsWeather.map((day, i) => (
                <SingleDayWeather key={i} nextDaysWeather={nextDaysWeather[i]} nextNightsWeather={nextNightsWeather[i]}></SingleDayWeather>
            ))
        }
    </div>


}