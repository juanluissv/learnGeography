import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createActivity, listCountries, addCountry } from '../actions/countryActions';
import CountryCard2 from './CountryCard2';


const Activity = ({history}) => {

const dispatch = useDispatch()

const [name, setName] = useState('');
const [difficulty, setDifficulty] = useState('1');
const [duration, setDuration] = useState('');
const [season, setSeason] = useState('Winter');

const countryList = useSelector(state => state.countryList)
const { countries, loading } = countryList

const addCountry = useSelector(state => state.addCountry)
const { myCountries } = addCountry
console.log(myCountries)


const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createActivity({name, difficulty, duration, season, myCountries}))
    dispatch({ type: 'COUNTRY_RESET' })
    dispatch(listCountries())
    history.push('/home')
}


    return (
    <div>
      <div className="activityForm">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input className="myInput"
                  type="text" 
                  placeholder="Enter name"
                  name="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
          />         
        </div>
        <div>
          <label>Difficulty:</label>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="mySelect2">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>         
        </div>
        <div>
          <label>duration:</label>
          <input className="myInput"
                  type="text" 
                  placeholder="Enter Duration"
                  name="duration" 
                  value={duration} 
                  onChange={(e) => setDuration(e.target.value)} 
          />         
        </div>
        <div>
          <label>Season:</label>
          <select value={season} onChange={(e) => setSeason(e.target.value)} className="mySelect2">
            <option value="Winter">Winter</option>
            <option value="Summer">Summer</option>
            <option value="Spring">Spring</option>
            <option value="Fall">Fall</option>
          </select>       
        </div>
           
          <input type="submit" className="submitAct"/>
      </form>
      </div>
      <h3 className="addCountry">Add Countries to the Activity</h3>
      {countries.map(country => ( 
        <CountryCard2 
        key={country.id}
        country={country}                            
        />
      ))} 

    </div>        
    )
}

export default Activity;