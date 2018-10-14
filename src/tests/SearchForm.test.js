import React from 'react';
import { shallow, mount } from 'enzyme';
import SearchForm from '../components/Main';

let wrapper, component, handleSubmit, myArtistsPage, toggleMobileSearch, mobileSearch;

beforeEach(() => {
    handleSubmit = jest.fn();
    myArtistsPage = jest.fn();
    toggleMobileSearch = jest.fn();
    mobileSearch = jest.fn();

    wrapper = shallow( <SearchForm
        handleSubmit = {handleSubmit}
        myArtistsPage = {myArtistsPage}
        toggleMobileSearch = {toggleMobileSearch}
        mobileSearch = {mobileSearch}        
        /> );
    
    component = mount( <SearchForm
        handleSubmit = {handleSubmit}
        myArtistsPage = {myArtistsPage}
        toggleMobileSearch = {toggleMobileSearch}
        mobileSearch = {mobileSearch}        
        /> );
    

});
// Cant work out how to do the test
// test('it should handle handleChange', () => {
//     const input = component.find('input');
//     input.simulate('change', { target: { value: 'Hello' } });
//     expect(component.state('value')).toEqual('Hello');

// });
