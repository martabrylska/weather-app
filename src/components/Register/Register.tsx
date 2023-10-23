import React, {SyntheticEvent, useState} from 'react';
import {Info} from "../Info/Info";

import "./Register.css";


export const Register = () => {

    const [id, setId] = useState(null);
    const [form, setForm] = useState({
        name: '',
        password: '',
        passwordCopy: '',
        units: 'metric',
    });
    const [msg, setMsg] = useState('');

    const createAccount = async (e: SyntheticEvent) => {
        e.preventDefault();

        // setLoading(true);
        if (form.password !== form.passwordCopy) {
            setMsg('Passwords are not the same. Try again.')
        } else {
            try{
                console.log(form);
                const res = await fetch(`http://localhost:3001/user/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ...form,
                    }),
                });

                const data = await res.json();
                console.log(data);

                if (data.isSuccess) {
                    setId(data.id);
                }

                if (data.msg) {
                    setMsg(data.msg)
                }

            } finally {
                // setLoading(false);
            }
        }
    }

    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }))
    }

    if (id) {
        return <Info text={`Your account has been successfully created with id: ${id}. Please sign in to find out more options.`}/>
    }


    return <form action="" className="register" onSubmit={createAccount}>
        <div className="actual-weather-photo"></div>
        <h1>Create your account:</h1>
        <p className="msg">{msg}</p>
        <p>
            <label>
                Name: <br/>
                <input
                    type="text"
                    name="name"
                    required
                    maxLength={20}
                    value={form.name}
                    onChange={e => updateForm('name', e.target.value)}
                />
            </label>
        </p>
        <p>
            <label>
                Password: <br/>
                <input
                    type="password"
                    name="password"
                    required
                    maxLength={20}
                    value={form.password}
                    onChange={e => updateForm('password', e.target.value)}/>
            </label>
        </p>
        <p>
            <label>
                Repeat your password: <br/>
                <input
                    type="password"
                    name="passwordCopy"
                    required
                    maxLength={20}
                    value={form.passwordCopy}
                    onChange={e => updateForm('passwordCopy', e.target.value)}/>
            </label>
        </p>
        <p>
            <label>
                Choose the units: <br/>
                <select
                    name="units"
                    value={form.units}
                    onChange={e => {updateForm('units', e.target.value);}}>
                    <option value="metric">Celsius, meter/sec</option>
                    <option value="imperial">Fahrenheit, miles/hour</option>
                    <option value="standard">Kelvin, meter/sec</option>
                </select>
            </label>
        </p>

        <button>Create account</button>
    </form>

}