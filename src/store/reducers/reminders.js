import * as actionTypes from '../actions/actionTypes';

const initialState = {
  reminders: []
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
    default:
      return state;
  }
};

export default reducer;
