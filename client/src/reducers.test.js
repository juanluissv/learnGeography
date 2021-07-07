import { expect } from 'chai';
import { countryDetailsReducer, countryListReducer } from './reducers/countryReducers.js';

const mockCountry = { 
    id: 'ARG', 
    name: 'Argentina'
};
const mockCountries = [
    { 
    id: 'ARG', 
    name: 'Argentina'
    },
    { 
        id: 'Pan', 
        name: 'Panama'
    },
    { 
        id: 'Col', 
        name: 'Colombia'
    }
]

describe('country details reducer', () => {
    it('gets country details when COUNTRY_DETAILS_SUCCESS action is received', () => {        
        const mockAction = {
            type: 'COUNTRY_DETAILS_SUCCESS',
            payload: mockCountry            
        };
        const state = { country: {} };

        const expected = {
            loading: false,
            country: mockCountry,
        };
        const actual = countryDetailsReducer(state, mockAction);

        expect(actual).to.deep.equal(expected);
    });
});


describe('country list reducer', () => {
    it('gets country lists  when COUNTRY_DETAILS_SUCCESS action is received', () => {        
        const mockActionList = {
            type: 'COUNTRY_LIST_SUCCESS',
            payload: mockCountries            
        };
        const state = { countries: [] };

        const expected = {
            loading: false,
            countries: mockCountries,
        };
        const actual = countryListReducer(state, mockActionList);

        expect(actual).to.deep.equal(expected);
    });
});