import React from 'react';
import ReactDOM from 'react-dom';
import {
  render,
  fireEvent,
  wait,
  queryByAttribute
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import ReminderModal from './ReminderModal';

describe('ReminderModal Component', () => {
  let container = null;

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ReminderModal />, div);
  });

  beforeEach(() => {
    container = render(
      <ReminderModal
        handleCancel={jest.fn()}
        handleOk={jest.fn()}
        addItem={jest.fn()}
        visible={true}
        confirmLoading={false}
        selectedDay={jest.fn()}
        getDateWeather={jest.fn()}
        getDateForecast={jest.fn()}
      />
    );
  });

  // to properly test validations try changing rules in ReminderModal State and check test results
  it('should validate if title is empty', async () => {
    const { getByTestId } = container;
    const button = document.getElementsByClassName('submit-button')[0];

    fireEvent.click(button);

    await wait(() => {
      expect(getByTestId('titleError')).not.toBe(null);
      expect(getByTestId('titleError')).toHaveTextContent('Required');
    });
  });

  it('should validate if city is empty', async () => {
    const { getByTestId } = container;
    const button = document.getElementsByClassName('submit-button')[0];

    fireEvent.click(button);

    await wait(() => {
      expect(getByTestId('cityError')).not.toBe(null);
      expect(getByTestId('cityError')).toHaveTextContent('Required');
    });
  });

  it('should validate if color is not selected', async () => {
    const { getByTestId } = container;
    const button = document.getElementsByClassName('submit-button')[0];

    fireEvent.click(button);

    await wait(() => {
      expect(getByTestId('colorError')).not.toBe(null);
      expect(getByTestId('colorError')).toHaveTextContent('Required');
    });
  });
});
