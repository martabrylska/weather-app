import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from 'react';
import {ActualWeather, Favorites} from "../../types/weather";
import {apiKey} from "../../constants";
import {actualWeatherSetLink} from "../../utils/actualWeatherSetLink";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {regular, solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {LoginContext} from "../../contexts/login.context";
import {Link} from "react-router-dom";
import {SearchContext} from "../../contexts/search.context";
import {UnitsContext} from "../../contexts/units.context";

interface Props {
    fav: Favorites,
    getFavoritesList: () => void,
    setMainDesc: Dispatch<SetStateAction<string[]>>,
    mainDesc: string[],
}

export const FavSingle = (props: Props) => {
    const {setSearch} = useContext(SearchContext);
    const {setIsLoggedIn} = useContext(LoginContext);
    const {units} = useContext(UnitsContext);
    const {fav, getFavoritesList, mainDesc, setMainDesc} = props;
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
                    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${fav.lat}&lon=${fav.lon}&appid=${apiKey}&units=${units}`);
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
                    });
                }
            })()
        } finally {
            // setLoading(false);
        }
    }, []);

    useEffect(() => {
        try {
            (async () => {
                if (favActualWeather.time) {
                    setMainDesc( [...mainDesc, favActualWeather.short]);
                    const resBE = await fetch(`http://localhost:3001/weather/add/${fav.id}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        credentials: "include",
                        body: JSON.stringify({
                            ...favActualWeather,
                        }),
                    });
                    const dataBE = await resBE.json();
                }
            })()
        } finally {
            // setLoading(false);
        }
    }, [favActualWeather]);

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

    const changeSearchCity = () => {
        setSearch({
            name: fav.name,
            state: fav.state,
            country: fav.country,
            lat: fav.lat,
            lon: fav.lon,
        });
    }

    return <li style={{backgroundImage: `url(${link})`}}>
        <Link className="fav-link" to={'/'} onClick={changeSearchCity}>
            <p className="city">{dateArr[0]} {dateArr[4].slice(0, 5)}</p>
            <p className="city">{fav.name}, {fav.state ? ` ${fav.state},` : ""} {fav.country}</p>
            <p className="temp">{favActualWeather.temp.toFixed()}°</p>
            <div className="params">
                <p className="param"><FontAwesomeIcon icon={solid("cloud")}/> {favActualWeather.clouds}%</p>
                <p className="param"><FontAwesomeIcon icon={solid("droplet")}/> {favActualWeather.humidity}%</p>
                <p className="param"><FontAwesomeIcon icon={solid("arrows-down-to-line")}/> {favActualWeather.pressure}hPa
                </p>
                <p className="param"><FontAwesomeIcon icon={solid("cloud-rain")}/> {favActualWeather.rain.toFixed(1)}mm
                </p>
                <p className="param"><FontAwesomeIcon icon={regular("snowflake")}/> {favActualWeather.snow.toFixed(1)}mm
                </p>
                <p className="param"><FontAwesomeIcon
                    icon={solid("wind")}/> {units === 'imperial' ? `${favActualWeather.wind.toFixed()} mph` : `${(favActualWeather.wind * 3600 / 1000).toFixed()}km/h`}
                </p>
            </div>
        </Link>
        <p className="remove" onClick={removeFavFromList}><FontAwesomeIcon icon={solid("xmark")}/></p>
    </li>
}
