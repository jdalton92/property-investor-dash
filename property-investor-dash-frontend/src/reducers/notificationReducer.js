const initialState = [];

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return [...state, action.content];
    case "CLEAR_NOTIFICATION":
      return state.filter((_, i) => i !== state.length - 1);
    default:
      return state;
  }
};

export const setNotification = (message, type) => {
  return dispatch => {
    dispatch({
      type: "SET_NOTIFICATION",
      content: {
        message,
        type
      }
    });
  };
};

export const clearNotification = () => {
  return dispatch => {
    dispatch({
      type: "CLEAR_NOTIFICATION"
    });
  };
};

export default notificationReducer;
