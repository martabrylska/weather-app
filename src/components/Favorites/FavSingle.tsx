import React, {useContext, useEffect, useState} from 'react';
import {ActualWeather, Favorites} from "../../types/weather";
import {apiKey} from "../../constants";
import {actualWeatherSetLink} from "../../utils/actualWeatherSetLink";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {LoginContext} from "../../contexts/login.context";

interface Props {
    fav: Favorites,
    getFavoritesList: () => void,
}

export const FavSingle = (props: Props) => {
    const {setIsLoggedIn} = useContext(LoginContext);
    const {fav, getFavoritesList} = props;
    const [link, setLink] = useState<string>('../../../public/haze.png');
    const [favActualWeather, setFavActualWeather] = useState<ActualWeather>({
        time: 0,
        temp: 0,
        tempMax: 0,
        tempMin: 0,
        desc: '',
        short: '',
        timezone: 0,
        tempSensed: 0,
        humidity: 0,
        pressure: 0,
        wind: 0,
        clouds: 0,
        rain: 0,
        snow: 0,
    });

    const dateArr = new Date((favActualWeather.time + favActualWeather.timezone) * 1000).toUTCString().split(" ")

    useEffect(() => {
        actualWeatherSetLink(favActualWeather, setLink);
    }, [favActualWeather.desc])

    useEffect(() => {
        try {
            (async () => {
                if (fav.lat && fav.lon) {
                    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${fav.lat}&lon=${fav.lon}&appid=${apiKey}&units=metric`);
                    const data = await res.json();

                    setFavActualWeather({
                        time: data.dt,
                        temp: data.main.temp,
                        tempMax: data.main.temp_max,
                        tempMin: data.main.temp_min,
                        tempSensed: data.main.feels_like,
                        humidity: data.main.humidity,
                        pressure: data.main.pressure,
                        wind: data.wind.speed,
                        clouds: data.clouds.all,
                        rain: data.rain ? data.rain['1h'] : 0,
                        snow: data.snow ? data.snow['1h'] : 0,
                        desc: data.weather[0].description,
                        short: data.weather[0].main,
                        timezone: data.timezone,
                    })
                }
            })()
        } finally {
            // setLoading(false);
        }
    }, []);

    const removeFavFromList = async () => {
        try {
            const res = await fetch(`http://localhost:3001/city/remove/${fav.id}`, {
                method: 'DELETE',
                credentials: 'include',
            })
            const data = await res.json();
            if (data.message === 'Unauthorized') {
                setIsLoggedIn(false);
            }
            getFavoritesList();

        } finally {
            // setLoading(false);
        }
    }

    return <li style={
        {
            backgroundImage: `url(${link})`
        }
    }>
        <p>{dateArr[0]} {dateArr[4].slice(0, 5)}</p>
        <p>{fav.name}, {fav.state}, {fav.country}</p>
        <p className="param">{favActualWeather.temp.toFixed()}°</p>
        <p className="param">{favActualWeather.clouds}%</p>
        <p className="param">{(favActualWeather.wind * 3600 / 1000).toFixed()}km/h</p>
        <p className="remove" onClick={removeFavFromList}><FontAwesomeIcon icon={solid("xmark")}/></p>
        {/*<p>{favActualWeather.humidity}%</p>*/}
        {/*<p>{favActualWeather.pressure}hPa</p>*/}
        {/*<p>{favActualWeather.rain.toFixed(1)}mm</p>*/}
        {/*<p>{favActualWeather.snow.toFixed(1)}mm</p>*/}

    </li>
}
