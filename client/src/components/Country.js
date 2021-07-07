import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listCountryDetails} from '../actions/countryActions';
import ActivityCard from './ActivityCard';

const Country = ({match}) => {

    const dispatch = useDispatch()
    let loading2 = false

    const countryDetails = useSelector(state => state.countryDetails);
    const { country, loading } = countryDetails
    
    useEffect(() => {
        dispatch(listCountryDetails(match.params.id))
    },[dispatch,match])

    if ((loading == false ) && (country.activities.length > 0)) {
        loading2 = true
        console.log(loading2) 
    }        


    return (
        <>
            {loading ? <p>Loading</p> : 

                <div className="column2">
                    <h3>{country.name}</h3>
                    <img src={country.flag} className="flagImg2" />
                    <p className="stock">Code: <span className="countryText">{country.id}</span></p>		
                    <p className="stock">Continent: <span className="countryText">{country.continent}</span></p>		
                    <p className="stock">Capital: <span className="countryText">{country.capital}</span></p>		
                    <p className="stock">SubRegion: <span className="countryText">{country.subregion}</span> </p>		
                    <p className="stock">Area: <span className="countryText">{country.area}</span></p>		
                    <p className="stock">Population: <span className="countryText">{country.population}</span></p>	
                </div>
            }

            {loading2 ?  
                <div>
                    <h4 className="countActi">Activities for this Country:</h4>
                    {country.activities.map(activity => ( 
                            <ActivityCard 
                                key={activity.id}
                                activity={activity}                            
                            />
                    ))} 
                </div>  
                 :
                 <p>No Activities</p>  
            }
        </> 
    )
}

export default Country;