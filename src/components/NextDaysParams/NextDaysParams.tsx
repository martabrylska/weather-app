import React, {useContext, useEffect, useState} from 'react';
import {SingleDayWeather} from "./SingleDayWeather";

import "./NextDaysParams.css"
import {ActualWeather, ShortTermWeather} from "../../types/weather";
import {apiKey} from "../../constants";
import {SearchContext} from "../../contexts/search.context";
import {takeProperTimeForNight} from "../../utils/takeProperTimeForNight";
import {takeProperTimeForDay} from "../../utils/takeProperTimeForDay";

interface Props {
    actualWeather: ActualWeather
}

export const NextDaysParams = (props: Props) => {

    const [nextDaysWeather, setNextDaysWeather] = useState<ShortTermWeather[]>([]);
    const [nextNightsWeather, setNextNightsWeather] = useState<ShortTermWeather[]>([]);

    const {search} = useContext(SearchContext);

    useEffect(() => {
        (async () => {
            if (search.lat && search.lon) {
                setNextDaysWeather(prev => []);
                setNextNightsWeather(prev => []);
                const resp = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${search.lat}&lon=${search.lon}&appid=${apiKey}&units=metric`);
                const data = await resp.json();

                const nightList = data.list.filter((period: any) => period.dt_txt.split(' ')[1] === takeProperTimeForNight(props.actualWeather.timezone));
                const dayList = data.list.filter((period: any) => period.dt_txt.split(' ')[1] === takeProperTimeForDay(props.actualWeather.timezone));

                if (nightList[0].dt < dayList[0].dt){
                    nightList.splice(0,1);
                }
                console.log(dayList, nightList);

                dayList.map((day: any) => {
                    setNextDaysWeather(nextDaysWeather => [...nextDaysWeather, {
                        time: day.dt,
                        temp: day.main.temp,
                        icon: day.weather[0].icon,
                        desc: day.weather[0].description,
                        pod: day.sys.pod,
                    }]);
                })

                nightList.map((night: any) => {
                    setNextNightsWeather(nextNightsWeather => [...nextNightsWeather, {
                        time: night.dt,
                        temp: night.main.temp,
                        icon: night.weather[0].icon,
                        desc: night.weather[0].description,
                        pod: night.sys.pod,
                    }]);
                })
            }
        })();
    }, [search]);


    return <div className="next-days">
        {
            nextNightsWeather.map((day, i) => {
                return <SingleDayWeather key={i} nextDaysWeather={nextDaysWeather[i]} nextNightsWeather={nextNightsWeather[i]}
                                  time={props.actualWeather.time} timezone={props.actualWeather.timezone}></SingleDayWeather>
            })
        }
    </div>


}