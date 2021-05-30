import authService from "../services/auth";
import usersService from "../services/users";
import { CONSTANTS } from "../static/constants";
import {
  successNotification,
  errorNotification,
  infoNotification,
} from "./notificationReducer";

const anonymousUser = {
  _id: "",
  email: "",
  dashboards: [],
  messagesRead: [],
  hasAcceptedTCs: false,
  roles: [],
};
const initialState = {
  isFetching: true,
  data: anonymousUser,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_REQUEST":
      return { ...state, isFetching: true };
    case "USER_REQUEST_FAIL":
      return { ...state, isFetching: false };
    case "READ_MESSAGE":
      const newState = { ...state };
      newState.data.messagesRead = [
        ...newState.data.messagesRead,
        action.payLoad.message,
      ];
      return newState;
    case "SET_USER":
      return {
        isFetching: false,
        data: action.payLoad.user,
      };
    case "CLEAR_USER":
      return { isFetching: false, data: anonymousUser };
    default:
      return state;
  }
};

export const initUser = () => {
  return async (dispatch) => {
    dispatch({
      type: "USER_REQUEST",
    });
    try {
      const user = await authService.initUser();
      if (user) {
        window.localStorage.setItem(
          CONSTANTS.LOCALSTORAGE.LOGGEDUSER,
          JSON.stringify(user)
        );
        dispatch({
          type: "SET_USER",
          payLoad: { user },
        });
      } else {
        window.localStorage.removeItem(CONSTANTS.LOCALSTORAGE.LOGGEDUSER);
        dispatch({
          type: "CLEAR_USER",
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: "USER_REQUEST_FAIL",
      });
      dispatch(errorNotification(e.response.data.message));
    }
  };
};

export const demoUser = () => {
  return async (dispatch) => {
    dispatch({
      type: "USER_REQUEST",
    });
    try {
      const user = await authService.demo();

      window.localStorage.setItem(
        CONSTANTS.LOCALSTORAGE.LOGGEDUSER,
        JSON.stringify(user)
      );
      dispatch({
        type: "SET_USER",
        payLoad: { user },
      });
      dispatch(successNotification("Logged into demo account"));
    } catch (e) {
      console.log(e);
      dispatch({
        type: "USER_REQUEST_FAIL",
      });
      dispatch(errorNotification(e.response.data.message));
    }
  };
};

export const createUser = (email, password, checkPassword, hasAcceptedTCs) => {
  return async (dispatch) => {
    dispatch({
      type: "USER_REQUEST",
    });
    try {
      const user = await usersService.createUser({
        email,
        password,
        checkPassword,
        hasAcceptedTCs,
      });

      window.localStorage.setItem(
        CONSTANTS.LOCALSTORAGE.LOGGEDUSER,
        JSON.stringify(user)
      );
      dispatch({
        type: "SET_USER",
        payLoad: { user },
      });
      dispatch(successNotification("User account created"));
    } catch (e) {
      dispatch({
        type: "USER_REQUEST_FAIL",
      });
      dispatch(errorNotification(e.response.data.message));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch({
      type: "USER_REQUEST",
    });
    try {
      window.localStorage.removeItem(CONSTANTS.LOCALSTORAGE.LOGGEDUSER);
      await authService.logout();
      dispatch({
        type: "CLEAR_USER",
      });
      dispatch(successNotification("Logged out"));
    } catch (e) {
      dispatch({
        type: "USER_REQUEST_FAIL",
      });
      dispatch(errorNotification(e.response.data.message));
    }
  };
};

export const loginUser = (email, password) => {
  return async (dispatch) => {
    dispatch({
      type: "USER_REQUEST",
    });
    try {
      const user = await authService.login(email, password);

      window.localStorage.setItem(
        CONSTANTS.LOCALSTORAGE.LOGGEDUSER,
        JSON.stringify(user)
      );
      dispatch({
        type: "SET_USER",
        payLoad: { user },
      });
    } catch (e) {
      dispatch({
        type: "USER_REQUEST_FAIL",
      });
      dispatch(errorNotification(e.response.data.message));
    }
  };
};

export const updateUser = (id, data) => {
  return async (dispatch) => {
    dispatch({
      type: "USER_REQUEST",
    });
    try {
      const user = await usersService.updateUser(id, data);

      window.localStorage.setItem(
        CONSTANTS.LOCALSTORAGE.LOGGEDUSER,
        JSON.stringify(user)
      );

      dispatch({
        type: "SET_USER",
        payLoad: { user },
      });
      dispatch(infoNotification("User details updated"));
    } catch (e) {
      console.log(e);
      dispatch({
        type: "USER_REQUEST_FAIL",
      });
      dispatch(errorNotification(e.response.data.message));
    }
  };
};

export const readHelperMessage = (userId, message) => {
  return (dispatch) => {
    try {
      if (userId) {
        // Dont await server response so UX seems instant
        usersService.updateUser(userId, { messagesRead: [message] });
        const user = JSON.parse(
          window.localStorage.getItem(CONSTANTS.LOCALSTORAGE.LOGGEDUSER)
        );
        user.messagesRead = [...user.messagesRead, message];
        window.localStorage.setItem(
          CONSTANTS.LOCALSTORAGE.LOGGEDUSER,
          JSON.stringify(user)
        );
      }
      dispatch({
        type: "READ_MESSAGE",
        payLoad: { message },
      });
    } catch (e) {
      console.log(e);
      dispatch(errorNotification(e.response.data.message));
    }
  };
};

export const requestPasswordReset = (email) => {
  return async (dispatch) => {
    dispatch({
      type: "USER_REQUEST",
    });
    try {
      await authService.requestPasswordReset(email);
      dispatch(
        infoNotification(
          "Check your email shortly for password reset instructions"
        )
      );
      dispatch({
        type: "USER_REQUEST_FAIL",
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: "USER_REQUEST_FAIL",
      });
      dispatch(errorNotification(e.response.data.message));
    }
  };
};

export const resetPassword = (id, resetToken, password, checkPassword) => {
  return async (dispatch) => {
    dispatch({
      type: "USER_REQUEST",
    });
    try {
      const user = await authService.resetPassword(
        id,
        resetToken,
        password,
        checkPassword
      );

      window.localStorage.setItem(
        CONSTANTS.LOCALSTORAGE.LOGGEDUSER,
        JSON.stringify(user)
      );

      dispatch({
        type: "SET_USER",
        payLoad: { user },
      });
      dispatch(infoNotification("Password reset"));
    } catch (e) {
      dispatch({
        type: "USER_REQUEST_FAIL",
      });
      dispatch(errorNotification(e.response.data.message));
    }
  };
};

export const deleteUser = (id, password) => {
  return async (dispatch) => {
    dispatch({
      type: "USER_REQUEST",
    });
    try {
      await usersService.deleteUser(id, password);

      window.localStorage.removeItem(CONSTANTS.LOCALSTORAGE.LOGGEDUSER);

      dispatch({
        type: "CLEAR_USER",
      });
    } catch (e) {
      dispatch({
        type: "USER_REQUEST_FAIL",
      });
      dispatch(errorNotification(e.response.data.message));
    }
  };
};

export default usersReducer;
