import { v4 as uuid } from "uuid";
import userService from "../services/user";
import { CONSTANTS } from "../static/constants";

const initialState = {
  messagesRead: [],
  notifications: [],
};

const notificationReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case "SET_MESSAGE":
      newState = { ...state };
      newState.messagesRead = [...state.messagesRead, action.payLoad.message];
      return newState;
    case "SET_MESSAGES":
      if (action.payLoad.messages && action.payLoad.messages.length) {
        newState = { ...state };
        newState.messagesRead = [
          ...state.messagesRead,
          ...action.payLoad.messages,
        ];
        return newState;
      } else {
        return state;
      }
    case "SET_NOTIFICATION":
      newState = { ...state };
      newState.notifications = [...state.notifications, action.payLoad];
      return newState;
    case "CLEAR_NOTIFICATION":
      newState = { ...state };
      newState.notifications = state.notifications.filter(
        (n) => n.id !== action.payLoad.id
      );
      return newState;
    default:
      return state;
  }
};

export const errorNotification = (message) => {
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

export const successNotification = (message) => {
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

export const hideHelperMessage = (userId, message) => {
  return (dispatch) => {
    try {
      if (userId) {
        userService.update(userId, { messagesRead: [message] });
        const { token, userData } = JSON.parse(
          window.localStorage.getItem("loggedUser")
        );
        userData.messagesRead = [...userData.messagesRead, message];
        window.localStorage.setItem(
          "loggedUser",
          JSON.stringify({ token, userData })
        );
      }
      dispatch({
        type: "SET_MESSAGE",
        payLoad: { message },
      });
    } catch (e) {
      console.log(e);
      dispatch(errorNotification(e.response.data.message));
    }
  };
};

export default notificationReducer;
