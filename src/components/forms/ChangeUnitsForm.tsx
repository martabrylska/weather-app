import React, {SyntheticEvent, useContext, useState} from "react";
import {UnitsContext} from "../../contexts/units.context";
import {LoginContext} from "../../contexts/login.context";
import {Loader} from "../common/Loader/Loader";
import {Units} from "../../types/units";
import {apiUrl} from "../../config/config";

export const ChangeUnitsForm = () => {
    const {units, setUnits} = useContext(UnitsContext);
    const {setIsLoggedIn} = useContext(LoginContext);
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const changeUnits = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/user/units/${units}`, {
                method: 'PATCH',
                credentials: "include",
            });
            const data = await res.json();
            if (data.message === 'Unauthorized') {
                setIsLoggedIn(false);
            }
            if (data.isSuccess) {
                setMsg('Units has been changed.')
                setUnits(units as Units)
            } else {
                setMsg('Ups... Something went wrong.')
            }
        } finally {
            setLoading(false);
        }
    }

    return <form className="form" onSubmit={changeUnits}>
        <h2>Change units</h2>
        {loading
            ? <Loader/>
            : <p className="msg">{msg}</p>
        }
        <p>
            <label>
                Choose the units: <br/>
                <select
                    name="units"
                    value={units}
                    onChange={e => {
                        setUnits(e.target.value as Units);
                    }}>
                    <option value="metric">Celsius, meter/sec</option>
                    <option value="imperial">Fahrenheit, miles/hour</option>
                    <option value="standard">Kelvin, meter/sec</option>
                </select>
            </label>
        </p>
        <button>Change units</button>
    </form>
}
