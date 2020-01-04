import * as actionTypes from './actionTypes';

export const addReminder = data => {
  return {
    type: actionTypes.ADD_REMINDER,
    data
  };
};
