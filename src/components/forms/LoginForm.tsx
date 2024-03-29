import React, {SyntheticEvent, useContext, useState} from 'react';
import {LoginContext} from "../../contexts/login.context";
import {UnitsContext} from "../../contexts/units.context";
import {Info} from "../common/Info/Info";
import {ChangePasswordForm} from "./ChangePasswordForm";
import {ChangeUnitsForm} from "./ChangeUnitsForm";
import {useLocalStorage} from "../../hooks/useLocalStorage";
import {Loader} from "../common/Loader/Loader";
import {login} from "../../api/localApi/login";
import {logout} from "../../api/localApi/logout";
import {Units} from "../../types/units";

import "./form.css";

export const LoginForm = () => {

    const {isLoggedIn, setIsLoggedIn} = useContext(LoginContext);
    const {setUnits} = useContext(UnitsContext);

    const [form, setForm] = useState({
        name: '',
        password: '',
    });
    const [msg, setMsg] = useState('');
    const [name, setName] = useLocalStorage('username', '');
    const [loading, setLoading] = useState(false);

    const signIn = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await login(form);
            if (data.isSuccess) {
                setIsLoggedIn(data.isSuccess);
                setUnits(data.units);
                setName(data.name);
            }
            if (data.msg) {
                setMsg(data.msg);
            }
        } finally {
            setLoading(false);
        }
    }

    const signOut = async () => {
        setLoading(true);
        try {
            const data = await logout();
            if (data.isSuccess) {
                setUnits(Units.metric);
            }
            setIsLoggedIn(false);
            updateForm('password', '');
            updateForm('name', '');
            setName('');
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

    if (loading) {
        return <Loader/>
    }

    if (isLoggedIn) {
        return (
            <div className="form">
                <div className="actual-weather-photo"></div>
                <Info text={`Hello ${name}. You are logged in.`}/>
                <button onClick={signOut}>Sign out</button>
                <div className="forms">
                    <ChangePasswordForm/>
                    <ChangeUnitsForm/>
                </div>
            </div>)
    }

    return <form action="src/components/forms/Login" className="form" onSubmit={signIn}>
        <div className="actual-weather-photo"></div>
        <h1>Log in to your account:</h1>
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
        <button>Sign in</button>
    </form>
}