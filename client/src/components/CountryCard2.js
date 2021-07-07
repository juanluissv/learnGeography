import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCountry } from '../actions/countryActions';

const CountryCard2 = ({country}) => {

    const dispatch = useDispatch()

    const [active, setActive] = useState(false)

    const newCountry = (countryID) => {
        setActive(true)
        dispatch(addCountry(countryID))
    }

    return (
        
        <div className="column">
			<img src={country.flag} className="flagImg" />
			    <h4>{country.name}</h4>
            <button 
                onClick={(e) => newCountry(country.id)}
                disabled={active}
                className="myButton2"
            >
                Add Country
            </button>		
        </div>          
              
    )
}

export default CountryCard2