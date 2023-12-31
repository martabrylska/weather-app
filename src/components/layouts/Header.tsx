import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro';
import {LoginContext} from "../../contexts/login.context";

import "./Header.css";

export const Header = () => {
    const {isLoggedIn} = useContext(LoginContext);
    return (
        <header className="header">
            <div>
                <Link className="header-link" to={'/'}><img src="/logo.png" alt="logo"/></Link>
                {isLoggedIn &&
                    <Link className="header-link" to='/favorites'><FontAwesomeIcon icon={solid("heart")}/></Link>}
                {!isLoggedIn &&
                    <Link className="header-link" to='/register'><FontAwesomeIcon icon={solid("user-plus")}/></Link>}
                <Link className="header-link" to='/login'>{isLoggedIn ? <FontAwesomeIcon icon={solid("user")}/> :
                    <FontAwesomeIcon icon={solid("right-to-bracket")}/>}</Link>
            </div>
        </header>
    );
}