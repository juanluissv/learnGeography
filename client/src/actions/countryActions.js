import axios from 'axios';
import {
    COUNTRY_LIST_REQUEST, 
    COUNTRY_LIST_SUCCESS, 
    COUNTRY_LIST_FAIL ,
    COUNTRY_DETAILS_REQUEST,
    COUNTRY_DETAILS_SUCCESS,
    COUNTRY_DETAILS_FAIL,
    ACTIVITY_CREATE_REQUEST,
    ACTIVITY_CREATE_SUCCESS,
    ACTIVITY_CREATE_FAIL,
    SEARCH_COUNTRY_REQUEST,
    SEARCH_COUNTRY_SUCCESS,
    SEARCH_COUNTRY_FAIL,
    ADD_COUNTRY,
    FILTER_COUNTRY,
    ACTIVITY_LIST_REQUEST,
    ACTIVITY_LIST_SUCCESS,
    ACTIVITY_LIST_FAIL
} from '../constants/countryConstants';


export const listCountries = () => async (dispatch) => {
    try {
        dispatch({
            type: COUNTRY_LIST_REQUEST
        })

        const { data } = await axios.get('/api/countries');

        dispatch({
            type: COUNTRY_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: COUNTRY_LIST_FAIL,
            payload: error.response
        })

    }
}

export const listActivities = () => async (dispatch) => {
    try {
        dispatch({
            type: ACTIVITY_LIST_REQUEST
        })

        const { data } = await axios.get('/api/countries/myactivities');

        dispatch({
            type: ACTIVITY_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ACTIVITY_LIST_FAIL,
            payload: error.response
        })

    }
}


export const listCountryDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: COUNTRY_DETAILS_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.get(`/api/countries/${id}`, config);

        dispatch({
            type: COUNTRY_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: COUNTRY_DETAILS_FAIL,
            payload: error
        })

    }
}

export const searchCountries = (query) => async (dispatch) => {
    try {
        dispatch({
            type: SEARCH_COUNTRY_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.get(`/api/countries?search=${query}`, config);

        dispatch({
            type: SEARCH_COUNTRY_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({            
            type: SEARCH_COUNTRY_FAIL,
            payload: error.response.data.error
        })

    }
}


export const createActivity = (activity) => async(dispatch) => {
    try {
        dispatch({
            type: ACTIVITY_CREATE_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/countries/activity', activity, config)

        dispatch({
            type: ACTIVITY_CREATE_SUCCESS,
            payload: data
        })

        
    } catch(error) {
        dispatch({
            type: ACTIVITY_CREATE_FAIL,
            payload: error.response
        })

    }
}

export const addCountry = (countryID) =>  (dispatch) => {
    dispatch({
        type: ADD_COUNTRY,
        payload: countryID
    })  
};


export const filterCountries = (filterCountries) =>  (dispatch) => {
    dispatch({
        type: FILTER_COUNTRY,
        payload: filterCountries
    })  
};
