import reducer from './reminders';
import * as actionTypes from '../actions/actionTypes';

describe('reminders reducer', () => {
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

  it('should delete an old reminder from the store', () => {
    expect(
      reducer(
        {
          reminders: [
            {
              id: 'testingId',
              title: 'test reminder',
              city: 'test city',
              time: '2020-01-17T02:58:58.887Z',
              date: '2020-01-18T02:58:58.887Z',
              color: '#ddd'
            }
          ],
          currentDate: ''
        },
        {
          type: actionTypes.DELETE_REMINDER,
          reminderId: 'testingId'
        }
      )
    ).toEqual({
      currentDate: '',
      reminders: []
    });
  });
});
