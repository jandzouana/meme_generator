import React from 'react';
import logo from '../assets/logo.png';

const Header = () => {
    return(
        <nav id={"header"} className={"white-text"}>
            <img src={logo} alt={"logo"}/>
            <h3 id={"title"} className={"semi-bold-text"}></h3>
        </nav>
    )
}

export default Header;
