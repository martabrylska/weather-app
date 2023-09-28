import React from 'react';
import {ShortTermWeather} from "../../types/weather";

interface Props {
    nextDaysWeather: ShortTermWeather;
    nextNightsWeather: ShortTermWeather;
}

export const SingleDayWeather = (props: Props) => {

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    return (
        <div className="single-day">
            <p>
                {
                    (new Date(props.nextDaysWeather.time[0])).getDay() === new Date().getDay()
                    ? 'Today'
                    : days[(new Date(props.nextDaysWeather.time[0])).getDay()]}
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