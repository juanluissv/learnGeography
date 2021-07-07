import axios from 'axios';
import { addCountry } from '../actions/countryActions';
import {
    COUNTRY_LIST_REQUEST, 
    COUNTRY_LIST_SUCCESS, 
    COUNTRY_LIST_FAIL ,
    COUNTRY_DETAILS_REQUEST,
    COUNTRY_DETAILS_SUCCESS,
    COUNTRY_DETAILS_FAIL,
    ACTIVITY_CREATE_SUCCESS,
    ACTIVITY_CREATE_FAIL,
    ACTIVITY_CREATE_REQUEST,
    SEARCH_COUNTRY_REQUEST,
    SEARCH_COUNTRY_SUCCESS,
    SEARCH_COUNTRY_FAIL,
    ADD_COUNTRY,
    FILTER_COUNTRY,
    ACTIVITY_LIST_REQUEST,
    ACTIVITY_LIST_SUCCESS,
    ACTIVITY_LIST_FAIL
} from '../constants/countryConstants';

export const countryListReducer = (state = { countries: []}, action) => {
    switch(action.type) {
        case COUNTRY_LIST_REQUEST:
            return  {
                loading: true,
                countries: []
            }
        case COUNTRY_LIST_SUCCESS:
            return {
                loading: false,
                countries: action.payload
            }
        case COUNTRY_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const activityListReducer = (state = { myactivities: []}, action) => {
    switch(action.type) {
        case ACTIVITY_LIST_REQUEST:
            return  {
                loading: true,
                myactivities: []
            }
        case ACTIVITY_LIST_SUCCESS:
            return {
                loading: false,
                myactivities: action.payload
            }
        case ACTIVITY_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}


export const countryDetailsReducer = (state = { country: {}}, action )=> {
    switch(action.type) {
        case COUNTRY_DETAILS_REQUEST:
            return {
                loading: true
            }
        case COUNTRY_DETAILS_SUCCESS:
            return{
                loading: false,
                country: action.payload
            }
        case COUNTRY_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}


export const searchCountriesReducer = (state = { searchList: []}, action) => {
    switch(action.type) {
        case SEARCH_COUNTRY_REQUEST:
            return  {
                success: false,
                searchList: []
            }
        case SEARCH_COUNTRY_SUCCESS:
            return {
                success: true,
                searchList: action.payload
            }
        case SEARCH_COUNTRY_FAIL:
            return {
                success: false,
                error: action.payload
            }
        case 'SEARCH_COUNTRY_RESET':
            return {
                searchList: [],
                success: false
            }             
        default:
            return state
    }
}

export const activityCreateReducer = (state = {}, action) => {
    switch(action.type) {
        case ACTIVITY_CREATE_REQUEST:
            return {}
        case ACTIVITY_CREATE_SUCCESS:
            return {
                success: true,
                activity: action.payload
            }
        case ACTIVITY_CREATE_FAIL:
            return {
                error: action.payload
            }
        default: 
            return state

    }
}

export const addCountryReducer = (state = { myCountries: [] }, action) => {
    switch (action.type) {
        case ADD_COUNTRY: 
            return {
                ...state,
                myCountries: [...state.myCountries, action.payload]
            }
        case 'COUNTRY_RESET':
                return {
                    myCountries: []
                }        
        default:
            return state
    }
}


export const filterCountriesReducer = (state = { myFilterCountries: [] }, action) => {
    switch (action.type) {
        case FILTER_COUNTRY: 
            return {
                isFilter: true,
                myFilterCountries: action.payload
            }
        case 'FILTER_RESET': 
            return {
                isFilter: false,
                myFilterCountries: [],
            }               
        default:
            return state
    }
}