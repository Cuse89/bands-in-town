import React from 'react';
import { shallow } from 'enzyme';
import ArtistEvent from '../components/ArtistEvent';
import { availableEvent } from './mockData';

let wrapper;

beforeEach(() => {
    wrapper = shallow( <ArtistEvent
        key = {0}
        info = {availableEvent}        
    /> );
});


test('it should handle getStatus correctly', () => {
    expect(wrapper.instance().getStatus()).toEqual('Buy Tickets');
});

test('it should handle extractDate correctly - get Date', () => {
    expect(wrapper.instance().extractDate(availableEvent.dateTime, 'date')).toEqual('2018-11-28');
});

test('it should handle extractDate correctly - get Time', () => {
    expect(wrapper.instance().extractDate(availableEvent.dateTime, 'time')).toEqual('19:00:59');
});