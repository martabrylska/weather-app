import React from 'react';
import {Weather} from "../../types/city";

interface Props {
    nextHoursWeather: Weather
}

export const SingleHourWeather = (props: Props) => {

    return (
        <div className="single-hour">
            <p>{props.nextHoursWeather.time[1].substring(0,5)}</p>
            <img alt={`${props.nextHoursWeather.desc}`} src={`https://openweathermap.org/img/wn/${props.nextHoursWeather.icon}@2x.png`}></img>
            <p>{Number(props.nextHoursWeather.temp).toFixed(1)}°C</p>
        </div>
    );

}