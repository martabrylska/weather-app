import React, {
    useContext, useEffect,
    useState
} from 'react';
import {SearchContext} from "../../contexts/search.context";
import {apiKey} from "../../constants";
import {SearchCity} from "../../types/city";

import "./Search.css";

export const Search = () => {
    const {setSearch} = useContext(SearchContext);
    const [inputVal, setInputVal] = useState<string>('');
    const [searchCityList, setSearchCityList] = useState<SearchCity[]>([]);

    useEffect(() => {
        setSearchCityList([]);
        (async () => {
            if (inputVal) {
                const respCity = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${inputVal}&limit=5&appid=${apiKey}`);
                const dataCity = await respCity.json();
                console.log(dataCity);
                console.log(new Date(1696032000).getUTCDate())

                dataCity.map((city: any) => {
                    setSearchCityList(searchCityList => [
                        ...searchCityList, {
                            name: city.name,
                            state: city.state,
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
                {
                    (searchCityList.length > 0) && <div className="btns">
                        {
                            searchCityList.map((city: SearchCity, i: number) => {
                                return <button onClick={() => handleClick(i)}
                                               key={i}>{`${city.name}, ${city.state ? city.state + "," : ""} ${city.country}`}</button>
                            })
                        }
                    </div>
                }
        </div>
    );
}