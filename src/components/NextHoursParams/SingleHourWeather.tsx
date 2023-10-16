import React from 'react';
import {ShortTermWeather} from "../../types/weather";

interface Props {
    nextHoursWeather: ShortTermWeather;
    timezone: number;
}

export const SingleHourWeather = (props: Props) =>  {

        return <div className="single-hour">
            <p>
                {`${(new Date(((props.nextHoursWeather.time + props.timezone) * 1000))).getUTCHours()}:00`}
            </p>
            <img
                alt={`${props.nextHoursWeather.desc}`}
                src={`https://openweathermap.org/img/wn/${props.nextHoursWeather.icon}@2x.png`}></img>
            <p>
                {Number(props.nextHoursWeather.temp).toFixed()}°
            </p>
        </div>
};
