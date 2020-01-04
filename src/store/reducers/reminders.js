import * as actionTypes from '../actions/actionTypes';

const initialState = {
  reminders: [],
  currentDate: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_REMINDER:
      const updatedIngredients = [...state.reminders];

      updatedIngredients.push(action.data);

      return {
        ...state,
        reminders: updatedIngredients
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
