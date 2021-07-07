import React from 'react';
import { Link } from 'react-router-dom';

const CountryCard = ({country}) => {
    return (
        
        <div className="column">
            <Link to={`country/${country.id}`} className="myLink">
			<img src={country.flag} className="flagImg" />
			    <h4 className="countryName">{country.name}</h4>
            </Link>
            <p className="stock">{country.continent}</p>		
        </div>          
              
    )
}

export default CountryCard