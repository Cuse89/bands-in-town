import React from 'react';
import { shallow } from 'enzyme';
import Main from '../components/Main';
import {info, eventsSoldOut, myArtistsInfo} from './mockData';

let wrapper;

beforeEach(() => {
    wrapper = shallow( <Main/> );
    wrapper.setState({
        artistInfo: {},
        artistEvents: [],
        myArtistsInfo: [],
        myArtists: ['Kiasmos', 'Blossoms'],
        myArtistsPage: true,
        artistInfoPage: false
    });
});

test('it should handle sortMyArtistsInfo correctly', () => {
    wrapper.instance().sortMyArtistsInfo(info);
    expect(wrapper.state('myArtistsInfo')).toHaveLength(1);
    expect(wrapper.state('myArtistsInfo')).toEqual([{
        name: "Kiasmos",
        thumb: "https://s3.amazonaws.com/bit-photos/thumb/8126557.jpeg",
        eventsCount: 2
    }]);
});

test('it should handle sortArtistInfo correctly', () => {
    wrapper.instance().sortArtistInfo(info);
    expect(wrapper.state('artistInfo')).toEqual({
        name: "Kiasmos",
        image: {
            large: "https://s3.amazonaws.com/bit-photos/large/8126557.jpeg",
            thumb: "https://s3.amazonaws.com/bit-photos/thumb/8126557.jpeg"
        },
        fbUrl: "https://www.facebook.com/kiasmos"
    });
});

test('it should handle sortEventInfo correctly', () => {
    wrapper.instance().sortEventInfo(eventsSoldOut);
    expect(wrapper.state('artistEvents')).toHaveLength(2);
    expect(wrapper.state('artistEvents')[0]).toEqual({
        onSaleDateTime: "",
        dateTime: "2018-11-02T23:00:00",
        description: "",
        venue: {
            "name": "VIBE Club",
            "country": "Czech Republic",
            "region": "",
            "city": "Brno-střed",
            "latitude": "49.19246549999999",
            "longitude": "16.605168"
        },
        offers: []
    });
});

test('it should handle isArtistFollowed correctly', () => {
    expect(wrapper.instance().isArtistFollowed('Kiasmos')).toEqual(true);
    expect(wrapper.instance().isArtistFollowed('notFollowedArtist')).toEqual(false);
});

test('it should handle updateMyArtists correctly - add an artist', () => {
    wrapper.instance().updateMyArtists('anotherArtist');
    expect(wrapper.state('myArtists')).toHaveLength(3);  
});

test('it should handle updateMyArtists correctly - remove an artist', () => {
    wrapper.setState({
        myArtistsInfo: myArtistsInfo
    })
    wrapper.instance().updateMyArtists('Kiasmos');
    expect(wrapper.state('myArtists')).toHaveLength(1);
    expect(wrapper.state('myArtistsInfo')).toEqual([{
        "eventsCount": 14,
        "name": "Blossoms",
        "thumb": "https://s3.amazonaws.com/bit-photos/thumb/8508883.jpeg"
    }]);
});