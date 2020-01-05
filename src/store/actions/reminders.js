import * as actionTypes from './actionTypes';
import axios from 'axios';
import moment from 'moment';

export const addReminder = payload => {
  const formattedDate = moment(payload.date).format('MM/DD/YYYY');

  return {
    type: actionTypes.ADD_REMINDER,
    payload: {
      ...payload,
      date: formattedDate
    }
  };
};

export const editReminder = payload => {
  const formattedDate = moment(payload.date).format('MM/DD/YYYY');

  return {
    type: actionTypes.EDIT_REMINDER,
    payload: {
      ...payload,
      date: formattedDate
    }
  };
};

export const deleteReminder = reminderId => {
  return {
    type: actionTypes.DELETE_REMINDER,
    reminderId
  };
};

export const deleteAllDateReminders = date => {
  return {
    type: actionTypes.DELETE_ALL_DATE_REMINDERS,
    date
  };
};

export const addCurrentDate = date => {
  return {
    type: actionTypes.ADD_CURRENT_DATE,
    date
  };
};

export const setWeather = payload => {
  console.log('payload', payload);
  return {
    type: actionTypes.SET_WEATHER,
    payload
  };
};

export const setWeatherFail = payload => {
  console.log('payload', payload);
  return {
    type: actionTypes.SET_WEATHER_FAIL,
    payload
  };
};

export const initGetWeather = city => {
  const cityName = city.split(',')[0];
  const countryCode = city.split(', ')[1];

  console.log('city', city);
  console.log('cityName', cityName);
  console.log('countryCode', countryCode);

  return dispatch => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast/daily?q=${cityName},${countryCode}&appid=34144a1d42f51abe5d962ecbccc72a09
        `
      )
      .then(response => {
        console.log('response', response);
        dispatch(setWeather(response));
      })
      .catch(error => {
        console.log('error', error);
        dispatch(setWeatherFail(error));
      });
  };
};
