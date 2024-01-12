import React from 'react';
import {ShortTermWeather} from "../../types/weather";
import {days} from "../../utils/days";

interface Props {
    nextDaysWeather: ShortTermWeather;
    nextNightsWeather: ShortTermWeather;
    time: number;
    timezone: number;
}

export const SingleDayWeather = (props: Props) => {

    return (
        <>
            <div className="single-day">
                <p>
                    {
                        (new Date((props.nextNightsWeather.time + props.timezone) * 1000).getUTCDay() === new Date((props.time + props.timezone) * 1000).getUTCDay()
                            ||
                            new Date((props.nextDaysWeather.time + props.timezone) * 1000).getUTCDay() === new Date((props.time + props.timezone) * 1000).getUTCDay())
                            ? 'Today'
                            : days[(new Date((props.nextDaysWeather.time + props.timezone) * 1000)).getUTCDay()]}
                </p>
                <img
                    alt={`${props.nextDaysWeather.desc}`}
                    src={`https://openweathermap.org/img/wn/${props.nextDaysWeather.icon}@2x.png`}></img>
                <p>
                    {`${Number(props.nextDaysWeather.temp).toFixed() === '-0' ? '0' : Number(props.nextDaysWeather.temp).toFixed()}°`}
                </p>
                <img
                    alt={`${props.nextNightsWeather.desc}`}
                    src={`https://openweathermap.org/img/wn/${props.nextNightsWeather.icon}@2x.png`}></img>
                <p>
                    {`${Number(props.nextNightsWeather.temp).toFixed() === '-0' ? '0' : Number(props.nextNightsWeather.temp).toFixed()}°`}
                </p>
            </div>
            <div className="line"></div>
        </>
    );

}