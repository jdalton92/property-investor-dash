import { v4 as uuid } from "uuid";

const initialState = [];

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return [...state, action.content];
    case "CLEAR_NOTIFICATION":
      return state.filter((n) => n.id !== action.content.id);
    default:
      return state;
  }
};

export const setNotification = (message, type) => {
  return (dispatch) => {
    const id = uuid();
    dispatch({
      type: "SET_NOTIFICATION",
      content: {
        id,
        message,
        type,
      },
    });
  };
};

export const clearNotification = (id) => {
  return (dispatch) => {
    dispatch({
      type: "CLEAR_NOTIFICATION",
      content: {
        id,
      },
    });
  };
};

export default notificationReducer;
