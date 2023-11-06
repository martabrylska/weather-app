import React, {useContext, useEffect, useState} from 'react';
import {SearchContext} from "../../contexts/search.context";
import {UnitsContext} from "../../contexts/units.context";
import {SingleDayWeather} from "./SingleDayWeather";
import {Loader} from "../common/Loader/Loader";
import {takeProperTimeForNight} from "../../utils/takeProperTimeForNight";
import {takeProperTimeForDay} from "../../utils/takeProperTimeForDay";
import {ActualWeather, ShortTermWeather} from "../../types/weather";
import {apiKey} from "../../constants";

import "./NextDaysParams.css"

interface Props {
    actualWeather: ActualWeather
}

export const NextDaysParams = (props: Props) => {

    const {search} = useContext(SearchContext);
    const {units} = useContext(UnitsContext);

    const [nextDaysWeather, setNextDaysWeather] = useState<ShortTermWeather[]>([]);
    const [nextNightsWeather, setNextNightsWeather] = useState<ShortTermWeather[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        try {
            (async () => {
                if (search.lat && search.lon) {
                    setNextDaysWeather([]);
                    setNextNightsWeather( []);
                    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${search.lat}&lon=${search.lon}&appid=${apiKey}&units=${units}`);
                    const data = await res.json();

                    const nightList = data.list.filter((period: any) => period.dt_txt.split(' ')[1] === takeProperTimeForNight(props.actualWeather.timezone));
                    const dayList = data.list.filter((period: any) => period.dt_txt.split(' ')[1] === takeProperTimeForDay(props.actualWeather.timezone));

                    if (nightList[0].dt < dayList[0].dt) {
                        nightList.splice(0, 1);
                    }

                    dayList.map((day: any) => {
                        setNextDaysWeather(nextDaysWeather => [...nextDaysWeather, {
                            time: day.dt,
                            temp: day.main.temp,
                            icon: day.weather[0].icon,
                            desc: day.weather[0].description,
                            pod: day.sys.pod,
                            rain: day.rain ? day.rain['3h'] : 0,
                            snow: day.snow ? day.snow['3h'] : 0,
                        }]);
                    })

                    nightList.map((night: any) => {
                        setNextNightsWeather(nextNightsWeather => [...nextNightsWeather, {
                            time: night.dt,
                            temp: night.main.temp,
                            icon: night.weather[0].icon,
                            desc: night.weather[0].description,
                            pod: night.sys.pod,
                            rain: night.rain ? night.rain['3h'] : 0,
                            snow: night.snow ? night.snow['3h'] : 0,
                        }]);
                    })
                }
            })();
        } finally {
            setLoading(false);
        }
    }, [search]);


    return <div className="next-days">
        {
            loading ? <Loader/> : nextNightsWeather.map((day, i) => {
                return <SingleDayWeather key={i}
                                         nextDaysWeather={nextDaysWeather[i]}
                                         nextNightsWeather={nextNightsWeather[i]}
                                         time={props.actualWeather.time}
                                         timezone={props.actualWeather.timezone}></SingleDayWeather>
            })
        }
    </div>
}