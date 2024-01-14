import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {ShortTermWeather} from "../../types/weather";

interface Props {
    nextHoursWeather: ShortTermWeather;
    timezone: number;
}

export const SingleHourWeather = (props: Props) => {

    return <div className="single-hour">
        <p>
            {`${(new Date(((props.nextHoursWeather.time + props.timezone) * 1000))).getUTCHours()}:00`}
        </p>
        <img
            alt={`${props.nextHoursWeather.desc}`}
            src={`https://openweathermap.org/img/wn/${props.nextHoursWeather.icon}@2x.png`}/>
        <div className="precipitation"><FontAwesomeIcon icon={solid("droplet")}/>
            <p>{(props.nextHoursWeather.rain + props.nextHoursWeather.snow).toFixed(1)}mm</p></div>
        <p>
            {Number(props.nextHoursWeather.temp).toFixed() === '-0' ? '0' : Number(props.nextHoursWeather.temp).toFixed()}°
        </p>
    </div>
};
