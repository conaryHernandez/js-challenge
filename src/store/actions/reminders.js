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

export const setWeather = (reminderId, payload) => {
  console.log('reminderId', reminderId);
  return {
    type: actionTypes.SET_WEATHER,
    reminderId,
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

export const initGetWeather = (city, reminderId) => {
  const cityName = city.split(',')[0];

  return dispatch => {
    //let url = `https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22`;
    // let url = 'https://api.openweathermap.org/data/2.5/weather?';
    // let url = `https://api.openweathermap.org/data/2.5/weather/?units=metric&id=697959&appid=34144a1d42f51abe5d962ecbccc72a09`;
    let url = `https://api.openweathermap.org/data/2.5/weather/?units=metric&q=${cityName}&appid=34144a1d42f51abe5d962ecbccc72a09`;

    axios
      .get(url)
      .then(response => {
        console.log('response', response.data);
        dispatch(setWeather(reminderId, response.data.weather));
      })
      .catch(error => {
        console.log('error', error);
        dispatch(setWeatherFail(error));
      });
  };
};
