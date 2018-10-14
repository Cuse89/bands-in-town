import React from 'react';
import { shallow } from 'enzyme';
import ArtistInfo from '../components/ArtistInfo';
import { artistInfo } from './mockData';  

let wrapper, image, artistName, fbUrl, isArtistFollowed, updateMyArtists;

beforeEach(() => {
    image = artistInfo.image.large
    artistName = artistInfo.name
    fbUrl = artistInfo.fbUrl
    isArtistFollowed = jest.fn(()=> {
        return true
    });
    updateMyArtists = jest.fn();

    wrapper = shallow( <ArtistInfo
        image = {image}
        artistName = {artistName}
        fbUrl = {fbUrl}
        isArtistFollowed = {isArtistFollowed}
        updateMyArtists = {updateMyArtists}          
        /> );

});

test('it should handle componentWillReceiveProps', () => {
    wrapper.setProps({
        artistName: 'Radiohead'
    });
    expect(isArtistFollowed).toHaveBeenCalled();
    expect(wrapper.state('followed')).toEqual(true);
});

test('it should handle handleClickHeart', () => {
    const heart = wrapper.find('.heart');
    heart.simulate('click');
    expect(updateMyArtists).toHaveBeenCalledWith('Kiasmos');
});


