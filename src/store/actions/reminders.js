import * as actionTypes from './actionTypes';

export const addReminder = data => {
  return {
    type: actionTypes.ADD_REMINDER,
    data
  };
};

export const addCurrentDate = date => {
  return {
    type: actionTypes.ADD_CURRENT_DATE,
    date
  };
};
