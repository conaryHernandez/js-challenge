import * as actionTypes from '../actions/actionTypes';

const initialState = {
  reminders: [],
  currentDate: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_REMINDER:
      const updatedIngredients = [...state.reminders];

      updatedIngredients.push(action.payload);

      return {
        ...state,
        reminders: updatedIngredients
      };
    case actionTypes.EDIT_REMINDER:
      const updatedReminders = [...state.reminders];
      const elementIndex = state.reminders.findIndex(
        rmd => rmd.id === action.payload.id
      );

      updatedReminders[elementIndex].title = action.payload.title;
      updatedReminders[elementIndex].color = action.payload.color;
      updatedReminders[elementIndex].time = action.payload.time;
      updatedReminders[elementIndex].date = action.payload.date;
      updatedReminders[elementIndex].city = action.payload.city;

      return {
        ...state,
        reminders: updatedReminders
      };
    case actionTypes.DELETE_REMINDER:
      const updatedElements = state.reminders.filter(
        rmd => rmd.id !== action.reminderId
      );

      console.log('action.reminder', action.reminderId);
      console.log('updatedElements', updatedElements);

      return {
        ...state,
        reminders: updatedElements
      };
    case actionTypes.ADD_CURRENT_DATE:
      return {
        ...state,
        currentDate: action.date
      };
    default:
      return state;
  }
};

export default reducer;
