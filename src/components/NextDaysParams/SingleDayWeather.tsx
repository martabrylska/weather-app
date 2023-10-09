import React from 'react';
import {ShortTermWeather} from "../../types/weather";

interface Props {
    nextDaysWeather: ShortTermWeather;
    nextNightsWeather: ShortTermWeather;
    time: number;
    timezone: number;
}

export const SingleDayWeather = (props: Props) => {

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
        <div className="single-day">
            <p>
                {
                    (new Date((props.nextNightsWeather.time + props.timezone) * 1000).getUTCDay() === new Date((props.time + props.timezone)*1000).getUTCDay()
                    ||
                        new Date((props.nextDaysWeather.time + props.timezone) * 1000).getUTCDay() === new Date((props.time + props.timezone)*1000).getUTCDay())
                    ? 'Today'
                    : days[(new Date((props.nextDaysWeather.time + props.timezone) * 1000)).getUTCDay()]}
            </p>
            <img
                alt={`${props.nextDaysWeather.desc}`}
                src={`https://openweathermap.org/img/wn/${props.nextDaysWeather.icon}.png`}></img>
            <p>
                {`${Number(props.nextDaysWeather.temp).toFixed()}°`}
            </p>
            <img
                alt={`${props.nextNightsWeather.desc}`}
                 src={`https://openweathermap.org/img/wn/${props.nextNightsWeather.icon}.png`}></img>
            <p>
                {`${Number(props.nextNightsWeather.temp).toFixed()}°`}
            </p>
        </div>
    );

}