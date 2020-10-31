import { v4 as uuid } from "uuid";
import userService from "../services/user";

const initialState = {
  messagesRead: [],
  notifications: [],
};

const notificationReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case "SET_MESSAGE":
      newState = { ...state };
      newState.messagesRead = [...state.messagesRead, action.message];
      return newState;
    case "SET_MESSAGES":
      if (action.messages && action.messages.length) {
        newState = { ...state };
        newState.messagesRead = [...state.messagesRead, ...action.messages];
        return newState;
      } else {
        return state;
      }
    case "SET_NOTIFICATION":
      newState = { ...state };
      newState.notifications = [...state.notifications, action.content];
      return newState;
    case "CLEAR_NOTIFICATION":
      newState = { ...state };
      newState.notifications = state.notifications.filter(
        (n) => n.id !== action.id
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
      id,
    });
  };
};

export const hideHelperMessage = (userId, type) => {
  return (dispatch) => {
    try {
      // Only sync with api if user is logged in
      if (userId) {
        userService.readMessage(userId, type);
        let token = JSON.parse(window.localStorage.getItem("loggedUser"));
        token.messagesRead = [...token.messagesRead, type];
        window.localStorage.setItem("loggedUser", JSON.stringify(token));
      }
      dispatch({
        type: "SET_MESSAGE",
        message: type,
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: "SET_NOTIFICATION",
        content: {
          message: e.response.data.error,
          type: "error",
        },
      });
    }
  };
};

export default notificationReducer;
