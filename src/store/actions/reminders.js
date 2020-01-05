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
  return {
    type: actionTypes.SET_WEATHER,
    reminderId,
    payload
  };
};

export const setForecast = (reminderId, payload) => {
  return {
    type: actionTypes.SET_FORECAST,
    reminderId,
    payload
  };
};

export const setWeatherFail = payload => {
  return {
    type: actionTypes.SET_WEATHER_FAIL,
    payload
  };
};

export const setForecastFail = payload => {
  return {
    type: actionTypes.SET_FORECAST_FAIL,
    payload
  };
};

export const initGetWeather = (city, reminderId) => {
  const cityName = city.split(',')[0];

  return dispatch => {
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

export const initGetForecast = (city, date, reminderId) => {
  const cityName = city.split(',')[0];

  return dispatch => {
    let url = `https://api.openweathermap.org/data/2.5/forecast/?units=metric&q=${cityName}&appid=34144a1d42f51abe5d962ecbccc72a09`;

    axios
      .get(url)
      .then(response => {
        console.log('response', response.data);
        const actualDate = moment(date);
        const dateForecast = response.data.list.filter(item =>
          moment(item.dt_txt).isSame(actualDate, 'day')
        );

        dispatch(setForecast(reminderId, dateForecast));
      })
      .catch(error => {
        console.log('error', error);
        dispatch(setForecast(error));
      });
  };
};
