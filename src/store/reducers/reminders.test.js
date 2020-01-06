import reducer from './reminders';
import * as actionTypes from '../actions/actionTypes';

describe('remidners reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      reminders: [],
      currentDate: ''
    });
  });

  it('should add to the store the new reminder', () => {
    expect(
      reducer(
        {
          reminders: [],
          currentDate: ''
        },
        {
          type: actionTypes.ADD_REMINDER,
          payload: {
            title: 'test reminder',
            city: 'test city',
            time: '2020-01-17T02:58:58.887Z',
            date: '2020-01-18T02:58:58.887Z',
            color: '#ddd'
          }
        }
      )
    ).toEqual({
      currentDate: '',
      reminders: [
        {
          title: 'test reminder',
          city: 'test city',
          time: '2020-01-17T02:58:58.887Z',
          date: '2020-01-18T02:58:58.887Z',
          color: '#ddd'
        }
      ]
    });
  });
});
