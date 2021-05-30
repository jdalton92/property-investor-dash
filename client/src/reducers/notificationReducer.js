import { v4 as uuid } from "uuid";
import { CONSTANTS } from "../static/constants";

const initialState = [];

const notificationReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case "SET_NOTIFICATION":
      newState = [...state];
      newState = [...state, action.payLoad];
      return newState;
    case "CLEAR_NOTIFICATION":
      newState = [...state];
      newState = newState.filter((n) => n.id !== action.payLoad.id);
      return newState;
    default:
      return state;
  }
};

export const errorNotification = (message = "An unexpected error occured") => {
  const id = uuid();
  return {
    type: "SET_NOTIFICATION",
    payLoad: {
      id,
      message,
      type: CONSTANTS.NOTIFICATION.ERROR,
    },
  };
};

export const successNotification = (message = "Success") => {
  const id = uuid();
  return {
    type: "SET_NOTIFICATION",
    payLoad: {
      id,
      message,
      type: CONSTANTS.NOTIFICATION.SUCCESS,
    },
  };
};

export const infoNotification = (message) => {
  const id = uuid();
  return {
    type: "SET_NOTIFICATION",
    payLoad: {
      id,
      message,
      type: CONSTANTS.NOTIFICATION.INFO,
    },
  };
};

export const setNotification = (message, type) => {
  const id = uuid();
  return (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      payLoad: {
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
      payLoad: { id },
    });
  };
};

export default notificationReducer;
