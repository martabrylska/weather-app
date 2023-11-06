import React, {SyntheticEvent, useContext, useState} from 'react';
import {LoginContext} from "../../contexts/login.context";
import {Favorites} from "../../types/city";

import "./form.css"

interface Props {
    setFavorites: React.Dispatch<React.SetStateAction<Favorites[] | null>>;
    mainWeatherDescriptions: string[];
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    countries: string[];
}

export const FiltersForm = (props: Props) => {

    const {setFavorites, mainWeatherDescriptions, setLoading, countries} = props;
    const {setIsLoggedIn} = useContext(LoginContext);
    const [form, setForm] = useState({
        sort: '',
        country: '',
        mainDesc: '',
    });

    const applyFilters = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`http://localhost:3001/city/filter`, {
                method: 'PATCH',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...form,
                }),
            });
            const data = await res.json();
            if (data.message === 'Unauthorized') {
                setIsLoggedIn(false);
            }
            setFavorites(data);
        } finally {
            setLoading(false);
        }
    }

    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }))
    }

    return <div className="filters">
        <form className="form" onSubmit={applyFilters}>
            <label>
                Sort by: <br/>
                <select
                    name="sort"
                    value={form.sort}
                    onChange={e => {
                        updateForm(e.target.name, e.target.value);
                    }}>
                    <option value=""></option>
                    <option value="timezone">Timezone</option>
                    <option value="temp">Temperature</option>
                    <option value="wind">Wind</option>
                    <option value="clouds">Cloudiness</option>
                    <option value="humidity">Humidity</option>
                    <option value="pressure">Pressure</option>
                    <option value="snow">Snow</option>
                    <option value="rain">Rain</option>
                </select>
            </label>
            <p>
                <label>
                    Country: <br/>
                    <select
                        name="country"
                        value={form.country}
                        onChange={e => {
                            updateForm(e.target.name, e.target.value);
                        }}>
                        <option value=""></option>
                        {
                            countries && Array.from(new Set(countries)).map((country, i) => <option key={i}
                                                                                                    value={country}>{country}</option>)
                        }
                    </select>
                </label>
            </p>
            <p>
                <label>
                    Weather conditions: <br/>
                    <select
                        name="mainDesc"
                        value={form.mainDesc}
                        onChange={e => {
                            updateForm(e.target.name, e.target.value);
                        }}>
                        <option value=""></option>
                        {
                            mainWeatherDescriptions && Array.from(new Set(mainWeatherDescriptions)).map((desc, i) =>
                                <option key={i}
                                        value={desc}>{desc}</option>)
                        }

                    </select>
                </label>
            </p>
            <button>{
                (form.sort === "" && form.country === "" && form.mainDesc === "")
                    ? 'Clear filters'
                    : 'Apply'
            }</button>
        </form>
    </div>
}