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
      if (action.messages && action.messages.length) {
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

export const setNotification = (message, type) => {
  return (dispatch) => {
    const id = uuid();
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
        let token = JSON.parse(window.localStorage.getItem("loggedUser"));
        token.messagesRead = [...token.messagesRead, message];
        window.localStorage.setItem("loggedUser", JSON.stringify(token));
      }
      dispatch({
        type: "SET_MESSAGE",
        payLoad: { message },
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: "SET_NOTIFICATION",
        payLoad: {
          message: e.response.data.message,
          type: CONSTANTS.NOTIFICATION.ERROR,
        },
      });
    }
  };
};

export default notificationReducer;
