import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { listCountries, searchCountries, filterCountries } from '../actions/countryActions';

const Header = () => {

    const dispatch = useDispatch();
    

    const goHome = () => {
        dispatch({ type: 'SEARCH_COUNTRY_RESET' })
        dispatch({ type: 'FILTER_RESET' })
        dispatch(listCountries())
    }
    
    return (
        <header className="header">
            <div className="logo">
            <Link to='/home' className="myLink" onClick={goHome}>
                <h1><span className="e">Learn Geography</span></h1>
            </Link>
            
            </div>
        </header>
    )
}

export default Header