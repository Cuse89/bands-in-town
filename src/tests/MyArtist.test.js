import React from 'react';
import { shallow } from 'enzyme';
import MyArtist from '../components/MyArtist';
import { myArtistsInfo } from './mockData'; 

let wrapper, handleSubmit, isArtistFollowed, updateMyArtists;

beforeEach(() => {
    handleSubmit = jest.fn();
    isArtistFollowed = jest.fn(()=> {
        return true
    });
    updateMyArtists = jest.fn(); 

    wrapper = shallow( <MyArtist
        key = {0}
        info = {myArtistsInfo[0]}
        handleSubmit = {handleSubmit}
        isArtistFollowed = {isArtistFollowed}
        updateMyArtists = {updateMyArtists}  
        /> );

});

test('it should handle handleClickHeart - unlike artist', () => {
    const heart = wrapper.find('.icon');
    heart.simulate('click');
    expect(updateMyArtists).toHaveBeenCalledWith('Kiasmos');
    expect(wrapper.state('followed')).toEqual(false);
});

test('it should handle handleClickHeart - like artist', () => {
    wrapper.setState({
        followed: false
    })
    const heart = wrapper.find('.icon');
    heart.simulate('click');
    expect(updateMyArtists).toHaveBeenCalledWith('Kiasmos');
    expect(wrapper.state('followed')).toEqual(true);
});

test('should be able to unlike, like, unlike, like artist with component still there', () => {
    const heart = wrapper.find('.icon');
    heart.simulate('click');
    expect(wrapper.state('followed')).toEqual(false);
    heart.simulate('click');
    expect(wrapper.state('followed')).toEqual(true);
    heart.simulate('click');
    expect(wrapper.state('followed')).toEqual(false);
    heart.simulate('click');
    expect(wrapper.state('followed')).toEqual(true);
    expect(updateMyArtists).toHaveBeenCalledTimes(4);
});

test('it should handle seeArtist correctly', () => {
    const image = wrapper.find('img');
    image.simulate('click');
    expect(handleSubmit).toHaveBeenLastCalledWith('Kiasmos');
});


