import React, {SyntheticEvent, useContext, useState} from "react";
import {LoginContext} from "../../contexts/login.context";
import {Loader} from "../common/Loader/Loader";
import {changeUserPassword} from "../../api/localApi/changeUserPassword";

export const ChangePasswordForm = () => {

    const {setIsLoggedIn} = useContext(LoginContext);

    const [msg, setMsg] = useState('');
    const [password, setPassword] = useState({
        currentPassword: '',
        newPassword: '',
        newPasswordCopy: '',
    });
    const [loading, setLoading] = useState(false);

    const changePassword = async (e: SyntheticEvent) => {
        e.preventDefault();

        if (password.newPassword !== password.newPasswordCopy) {
            setMsg('New passwords are not the same. Try again.')
        } else {
            setLoading(true);
            try {
                const data = await changeUserPassword(password.currentPassword, password.newPassword);

                if (data.message === 'Unauthorized') {
                    setIsLoggedIn(false);
                }
                if (!data.isSuccess) {
                    setMsg('Wrong current password.')
                }
                if (data.isSuccess) {
                    setMsg('Password has been changed.')
                } else {
                    setMsg('Ups... Something went wrong.')
                }
                setPassword({
                    currentPassword: '',
                    newPassword: '',
                    newPasswordCopy: '',
                })
            } finally {
                setLoading(false);
            }
        }
    }

    const updatePassword = (key: string, value: any) => {
        setPassword(password => ({
            ...password,
            [key]: value,
        }))
    }

    return <form action="src/components/forms/ChangePasswordForm" className="form" onSubmit={changePassword}>
        <h2>Change your password:</h2>
        {loading
            ? <Loader/>
            : <p className="msg">{msg}</p>
        }
        <p>
            <label>
                Current password: <br/>
                <input
                    type="password"
                    name="currentPassword"
                    required
                    maxLength={20}
                    value={password.currentPassword}
                    onChange={e => updatePassword(e.target.name, e.target.value)}/>
            </label>
        </p>
        <p>
            <label>
                New password: <br/>
                <input
                    type="password"
                    name="newPassword"
                    required
                    maxLength={20}
                    value={password.newPassword}
                    onChange={e => updatePassword(e.target.name, e.target.value)}/>
            </label>
        </p>
        <p>
            <label>
                Repeat new password: <br/>
                <input
                    type="password"
                    name="newPasswordCopy"
                    required
                    maxLength={20}
                    value={password.newPasswordCopy}
                    onChange={e => updatePassword(e.target.name, e.target.value)}/>
            </label>
        </p>
        <button>Change password</button>
    </form>
}