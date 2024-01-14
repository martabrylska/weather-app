import React, {useContext, useEffect, useState} from 'react';
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {SearchContext} from "../../contexts/search.context";
import {LoginContext} from "../../contexts/login.context";
import {UnitsContext} from "../../contexts/units.context";
import {ActualWeather} from "../../types/weather";
import {capitalizeFirstLetter} from "../../utils/capitalizeFirstLetter";
import {setLinkForActualWeather} from "../../utils/setLinkForActualWeather";
import {getOneCity} from "../../api/localApi/getOneCity";
import {addToFavorites} from "../../api/localApi/addToFavorites";
import {removeFromFavorites} from "../../api/localApi/removeFromFavorites";
import {Units} from "../../types/units";

import "./ActualParams.css";

interface Props {
    actualWeather: ActualWeather;
}

export const ActualParams = (props: Props) => {

    const {actualWeather} = props;

    const {search} = useContext(SearchContext);
    const {units} = useContext(UnitsContext);
    const {isLoggedIn, setIsLoggedIn} = useContext(LoginContext);

    const [link, setLink] = useState<string>('../../../public/haze.png');
    const [favId, setFavId] = useState('');

    const dateArr = new Date((actualWeather.time + actualWeather.timezone) * 1000).toUTCString().split(" ")

    useEffect(() => {
        setLinkForActualWeather(actualWeather, setLink);
    }, [actualWeather.desc])

    useEffect(() => {
        (async () => {
            if (isLoggedIn) {
                const data = await getOneCity(search.lat, search.lon);
                if (data.message === 'Unauthorized') {
                    setIsLoggedIn(false);
                }
                if (data.id) {
                    setFavId(data.id)
                } else {
                    setFavId('')
                }
            }
        })()
    }, [search])

    const saveToFavorites = async () => {
        const data = await addToFavorites(search)
        if (data.message === 'Unauthorized') {
            setIsLoggedIn(false);
        }
        if (data.id) {
            setFavId(data.id);
        } else {
            setFavId('');
        }
    }

    const removeFavFromList = async () => {
        const data = await removeFromFavorites(favId);
        if (data.message === 'Unauthorized') {
            setIsLoggedIn(false);
        }
        setFavId('');
    }

    return (
        <>
            <div className="actual-weather-photo" style={{backgroundImage: `url(${link})`}}></div>
            <div className="actual-weather">
                <p>{dateArr.slice(0, 4).join(" ")}</p>
                <p>{dateArr[4].slice(0, 5)}</p>
                <div className="actual-weather-name">
                    <p>{search.name}</p>
                    {isLoggedIn && <button className={favId && "added"} onClick={async () => {
                        if (favId) {
                            await removeFavFromList()
                        } else {
                            await saveToFavorites()
                        }
                    }}><FontAwesomeIcon
                        icon={solid("heart")}/></button>}
                </div>
                <p className="state">{
                    search.state && `${search.state}, `
                }{search.country}</p>
                <p>{capitalizeFirstLetter(actualWeather.desc)}</p>
                <p className="temp">{actualWeather.temp.toFixed()}°</p>
                <p>Feels like: {Number(actualWeather.tempSensed).toFixed()}°</p>
                <div>
                    <p>H: {actualWeather.tempMax.toFixed()}°</p>
                    <p>L: {actualWeather.tempMin.toFixed()}°</p>
                </div>
                <div>
                    <div><p>Cloudiness:</p> <p> {actualWeather.clouds}%</p></div>
                    <div><p>Humidity:</p> <p>{actualWeather.humidity}%</p></div>
                    <div><p>Pressure:</p> <p>{actualWeather.pressure}hPa</p></div>
                    <div><p>Rain:</p> <p>{actualWeather.rain.toFixed(1)}mm</p></div>
                    <div><p>Snow:</p> <p>{actualWeather.snow.toFixed(1)}mm</p></div>
                    <div><p>Wind:</p>
                        <p>{units === Units.imperial ? `${actualWeather.wind.toFixed()}mph` : `${(actualWeather.wind * 3600 / 1000).toFixed()}km/h`}</p>
                    </div>
                </div>
            </div>
        </>
    );
}
