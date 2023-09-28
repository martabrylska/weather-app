import React from 'react';
import {ShortTermWeather} from "../../types/weather";

interface Props {
    nextHoursWeather: ShortTermWeather
}

export const SingleHourWeather = (props: Props) =>  (
        <div className="single-hour">
            <p>
                {props.nextHoursWeather.time[1].substring(0,5)}
            </p>
            <img
                alt={`${props.nextHoursWeather.desc}`}
                src={`https://openweathermap.org/img/wn/${props.nextHoursWeather.icon}@2x.png`}></img>
            <p>
                {Number(props.nextHoursWeather.temp).toFixed()}°
            </p>
        </div>
    );
