import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { 
        countryListReducer, 
        countryDetailsReducer, 
        activityCreateReducer,
        addCountryReducer,
        searchCountriesReducer,
        filterCountriesReducer,
        activityListReducer
} from './reducers/countryReducers';

const reducer = combineReducers({
    countryList: countryListReducer,
    countryDetails: countryDetailsReducer,
    activityCreate: activityCreateReducer,
    addCountry: addCountryReducer,
    searchListCountries: searchCountriesReducer,
    countriesFilter: filterCountriesReducer,
    activityList: activityListReducer
})

const middleware = [thunk];

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;
