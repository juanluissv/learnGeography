import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listCountries, listActivities, searchCountries, filterCountries } from '../actions/countryActions';
import CountryCard from './CountryCard';
import Pagination from './Pagination';



const Home = () => {

    const dispatch = useDispatch();

    const [query, setQuery] = useState('');

    const countryList = useSelector(state => state.countryList)
    let { countries, loading } = countryList

    const activityList = useSelector(state => state.activityList)
    let { myactivities } = activityList
   
    const countriesFilter = useSelector(state => state.countriesFilter)
    let { myFilterCountries, isFilter } = countriesFilter

    const searchListCountries = useSelector(state => state.searchListCountries)
    let { searchList, success, error } = searchListCountries
    
    useEffect(() => {
        dispatch(listCountries())
        dispatch(listActivities())
    }, [dispatch])

    //SEARCH
    const getSearchCountries = (e) => {
        e.preventDefault()
        setQuery('')
        setCurrentPage(1)
        dispatch(searchCountries(query))
      }

    //PAGINATION
    const [currentPage, setCurrentPage] = useState(1);
    let currentSearchCountries = [];
    let currentFilterCountries = [];
    let currentCountries = [];

    const [postsPerPage] = useState(10);      
    // Get current posts
    let indexOfLastPost = currentPage * postsPerPage;
    let indexOfFirstPost = indexOfLastPost - postsPerPage;
    
    currentCountries = countries.slice(indexOfFirstPost, indexOfLastPost);
    if (success == true) {
         currentSearchCountries = searchList.slice(indexOfFirstPost, indexOfLastPost);
    }
    if (isFilter == true) {
        currentFilterCountries = myFilterCountries.slice(indexOfFirstPost, indexOfLastPost);
   }
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);  

    
    let showPagination = true;
        console.log(currentCountries.length)
    if (currentCountries.length < 10) {
        showPagination = false
    }





   //FILTERS
    const filterName = (e) => {
        let sorted;
        if (e.target.value == 'DESC') {
            sorted = [...countries].reverse((a, b) => b[countries.name] - a[countries.name]);
        }
        if (e.target.value == 'ASC') {
            sorted = [...countries].sort((a, b) => b[countries.name] - a[countries.name]);
        }
        setCurrentPage(1)
        dispatch({ type: 'SEARCH_COUNTRY_RESET' })
        dispatch(filterCountries(sorted))              
    }

    const filterPopulation = (e) => { 
        let sorted2;   
        if (e.target.value == 'ASC') {    
            sorted2 = [...countries].sort((a,b) => a.population - b.population)
        }
        if (e.target.value == 'DESC') {    
            sorted2 = [...countries].sort((a,b) => b.population - a.population)
        }
        setCurrentPage(1)
        dispatch({ type: 'SEARCH_COUNTRY_RESET' })
        dispatch(filterCountries(sorted2))              
            
    }

    const filterContinent = (e) => {
        const filtrados = countries.filter(country => {
            return country.continent.includes(e.target.value) 
        })
        setCurrentPage(1)
        dispatch({ type: 'SEARCH_COUNTRY_RESET' })
        dispatch(filterCountries(filtrados))        
    }

    const filterActivity = (e) => {
        let mynewcountries = []
        countries.map(country => {
            if (country.activities.length > 0) {
                country.activities.map(countryy => {
                    if(countryy.name == e.target.value){
                        mynewcountries.push(country)
                    }
                })
            }
        })
        setCurrentPage(1)
        dispatch({ type: 'SEARCH_COUNTRY_RESET' })
        dispatch(filterCountries(mynewcountries))        
    }
    
    console.log(showPagination)


    return (
        <>
            {loading ? <p className="loading">Loading...</p> :              
                <div>
                    
                    <div className="content">
		            <div className="row">
                    
                        <div className="searchBox">

                        <div className="search">
                                <form onSubmit={getSearchCountries} >
                                    <input 
                                        type="text" 
                                        placeholder="Search country by name" 
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                    />
                                    <input type="submit" value="search" className="searchButton" />
                                </form>
                            </div> 

                            <div className="user">
                                <Link to='/activity' className="myLink">
                                    <span>Create Activity</span>
                                </Link>
                            </div>
                                                       

                            <div className="user">
                                <i className="fa fa-user"></i>Order by County Name<i className="fa fa-angle-down"></i>
                                <select  onChange={filterName} className="mySelect">
                                    <option value="ASC">choose one</option>
                                    <option value="ASC">ASC</option>
                                    <option value="DESC">DESC</option>
                                                                   
                                </select>                            
                            </div>

                            <div className="user">
                                <i className="fa fa-user"></i>Order by Population<i className="fa fa-angle-down"></i>
                                <select  onChange={filterPopulation} className="mySelect">
                                    <option value="ASC">choose one</option>
                                    <option value="ASC">ASC</option>
                                    <option value="DESC">DESC</option>
                                                                   
                                </select>                            
                            </div>
                            

                            <div className="user">
                                <i className="fa fa-user"></i>Order by Continent<i className="fa fa-angle-down"></i>
                                <select  onChange={filterContinent} className="mySelect">
                                    <option value="Americas">choose one</option>
                                    <option value="Americas">Americas</option>
                                    <option value="Europe">Europe</option>
                                    <option value="Africa">Africa</option>
                                    <option value="Asia">Asia</option>
                                    <option value="Asia">Oceania</option>
                                </select>                            
                            </div>
                            <div className="user">
                                <i className="fa fa-user"></i>Order by Activity<i className="fa fa-angle-down"></i>
                                <select  onChange={filterActivity} className="mySelect">                                
                                    <option value="">choose one</option>                                 
                                     {myactivities.map((e, key) => {
                                        return <option key={key} value={e.value}>{e.name}</option>;
                                    })}
                                </select>                            
                            </div>

                                                         

                            
                            
                        </div>
                        

                        { error ? <p className="myerror">{error}</p> :
                        success ? 
                            <div>
                                {currentSearchCountries.map(country => ( 
                                    <CountryCard 
                                        key={country.id}
                                        country={country}                            
                                    />
                                ))} 
                                    <Pagination
                                        postsPerPage={postsPerPage}
                                        totalPosts={searchList.length}
                                        paginate={paginate}
                                    />                               
                            </div>
                        : isFilter ?
                            <div>
                                {currentFilterCountries.map(country => ( 
                                    <CountryCard 
                                        key={country.id}
                                        country={country}                            
                                    />                                                                
                                ))} 
                                { showPagination ? 
                                    <Pagination
                                            postsPerPage={postsPerPage}
                                            totalPosts={myFilterCountries.length}
                                            paginate={paginate}
                                        />
                                : ''
                                }
                                <p className="yourPage"> you are in page: {currentPage}</p>
                            </div>
                        :     
                            <div>
                                {currentCountries.map(country => ( 
                                    <CountryCard 
                                        key={country.id}
                                        country={country}                            
                                    />
                                ))} 
                                    <Pagination
                                        postsPerPage={postsPerPage}
                                        totalPosts={countries.length}
                                        paginate={paginate}
                                    />
                                    <p className="yourPage"> you are in page: {currentPage}</p>
                            </div>
                        }        

                    </div>
                    </div>    

                </div>
            }
        </>
    )
}

export default Home;