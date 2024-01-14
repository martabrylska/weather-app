import React, {useContext, useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {SearchContext} from "../../../contexts/search.context";
import {SearchedCity} from "../../../types/city";
import {findCitiesForInputVal} from "../../../api/weatherApi/findCitiesForInputVal";

import "./Search.css";

export const Search = () => {
    const {setSearch} = useContext(SearchContext);
    const [inputVal, setInputVal] = useState<string>('');
    const [searchCityList, setSearchCityList] = useState<SearchedCity[]>([]);

    useEffect(() => {
        setSearchCityList([]);
        (async () => {
            if (inputVal) {
                const cities = await findCitiesForInputVal(inputVal);

                cities.forEach((city: any) => {
                    setSearchCityList(searchCityList => [
                        ...searchCityList, {
                            name: city.name,
                            state: city.state ? city.state : '',
                            country: city.country,
                            lat: city.lat,
                            lon: city.lon,
                        }
                    ])
                })
            }
        })();
    }, [inputVal]);

    const handleClick = (i: number) => {
        setSearch({
            ...searchCityList[i]
        });
        setInputVal('');
        setSearchCityList([]);
    }

    return (
        <div className="search">
            <input type="text" value={inputVal} onChange={(e) => setInputVal(e.target.value)}/>
            <div className="magn-glass"><FontAwesomeIcon icon={solid("magnifying-glass")}/></div>
            {
                (searchCityList.length > 0) && <div className="btns">
                    {
                        searchCityList.map((city: SearchedCity, i: number) => {
                            return <button onClick={() => handleClick(i)}
                                           key={i}>{`${city.name}, ${city.state ? city.state + "," : ""} ${city.country}`}</button>
                        })
                    }
                </div>
            }
        </div>
    );
}