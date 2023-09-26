import React from 'react';
import {Weather} from "../../types/city";

interface Props {
    nextHoursWeather: Weather[]
}

export const SingleHourWeather = (props: Props) => {

    return (
        <div className="single-hour">
            <p>{props.nextHoursWeather[0].time}</p>
            <img alt="sun"></img>
            <p>20 st. C</p>
        </div>
    );

}