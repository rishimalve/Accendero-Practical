import React from 'react';
import { shallow } from 'enzyme';
import MoodCheck from '../moodCheck'

describe('MoodCheck page tests', () => {
    const wrapper = shallow(<MoodCheck />);

    it('should have a button component', () => {

        //There should be only one button
        expect(wrapper.find('button')).toHaveLength(1);

        //Button should be of 2 buttons of type button
        expect(wrapper.find('button').type()).toEqual('button');

        //Button should have matching text as below
        expect(wrapper.find('button').text()).toEqual('Check My Mood!');

    });

    it('should have 1 input fields', () => {
        expect(wrapper.find('input')).toHaveLength(1);
    });

});