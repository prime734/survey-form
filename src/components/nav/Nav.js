import React from 'react'
import './nav.css'
import {NavLink} from 'react-router-dom'
const Nav = () => {
    return (
        <nav>
            <h3>_Surveys</h3>
            <ul>
                <li><NavLink to='/'> FILL OUT SURVEY</NavLink></li>
                <li><NavLink to='/results'> VIEW SURVEY RESULTS</NavLink></li>
            </ul>
        </nav>
    )
}

export default Nav
