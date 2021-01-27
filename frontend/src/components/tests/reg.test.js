import React from 'react';
import { shallow } from 'enzyme';
import Reg from '../reg'

describe('Registration page tests', () => {
    const wrapper = shallow(<Reg />);

    it('should have a button component', () => {

        //There should be two buttons
        expect(wrapper.find('button')).toHaveLength(2);

        //Button should be of 2 buttons of type button
        expect(wrapper.find('button').at(0).type()).toEqual('button');
        expect(wrapper.find('button').at(1).type()).toEqual('button');

        //Button should have matching text as below
        expect(wrapper.find('button').at(0).text()).toEqual('Register');
        expect(wrapper.find('button').at(1).text()).toEqual('Cancel');

    });

    it('should have 3 input fields', () => {
        expect(wrapper.find('input')).toHaveLength(3);
    });

});