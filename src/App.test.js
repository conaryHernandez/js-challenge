import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('should render without crash', () => {
  const wrapper = shallow(<App />);

  expect(wrapper).toBeDefined();
});
