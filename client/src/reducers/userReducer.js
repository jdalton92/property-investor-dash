import loginService from "../services/login";
import { setToken, destroyToken } from "../utils/tokenHelper";
import userService from "../services/user";
import {
  successNotification,
  errorNotification,
  infoNotification,
} from "./notificationReducer";

const initialState = { isFetching: true, data: {} };

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_REQUEST":
      return { ...state, isFetching: true };
    case "USER_REQUEST_FAIL":
      return { ...state, isFetching: false };
    case "SET_USER":
      return {
        isFetching: false,
        data: action.payLoad.user,
      };
    case "CLEAR_USER":
      return { isFetching: false, data: {} };
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
      const loggedUserJSON = window.localStorage.getItem("loggedUser");

      if (loggedUserJSON) {
        const { token, userData } = JSON.parse(loggedUserJSON);

        if (!token || !userData) {
          dispatch(logoutUser());
          return;
        }

        setToken(token);
        dispatch({
          type: "SET_MESSAGES",
          payLoad: { messages: userData.messagesRead },
        });
        dispatch({
          type: "SET_USER",
          payLoad: { user: userData },
        });
      } else {
        dispatch(logoutUser());
        dispatch({
          type: "USER_REQUEST_FAIL",
        });
      }
    } catch (e) {
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
      const { token, userData } = await loginService.demo();

      window.localStorage.setItem(
        "loggedUser",
        JSON.stringify({ token, userData })
      );

      setToken(token);

      dispatch({
        type: "SET_MESSAGES",
        payLoad: { messages: userData.messagesRead },
      });
      dispatch({
        type: "SET_USER",
        payLoad: { user: userData },
      });
      dispatch(successNotification("Logged into demo account"));
    } catch (e) {
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
      const { token, userData } = await userService.create({
        email,
        password,
        checkPassword,
        hasAcceptedTCs,
      });

      window.localStorage.setItem(
        "loggedUser",
        JSON.stringify({ token, userData })
      );

      setToken(token);

      dispatch({
        type: "SET_MESSAGES",
        payLoad: { messages: userData.messagesRead },
      });
      dispatch({
        type: "SET_USER",
        payLoad: { user: userData },
      });
      dispatch(successNotification("User account created"));
    } catch (e) {
      console.log(e);
      dispatch({
        type: "USER_REQUEST_FAIL",
      });
      dispatch(errorNotification(e.response.data.message));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    destroyToken();
    window.localStorage.removeItem("loggedUser");
    dispatch({
      type: "CLEAR_USER",
    });
    dispatch(successNotification("Logged out"));
  };
};

export const loginUser = (email, password) => {
  return async (dispatch) => {
    dispatch({
      type: "USER_REQUEST",
    });
    try {
      const { userData, token } = await loginService.login({
        email,
        password,
      });

      window.localStorage.setItem(
        "loggedUser",
        JSON.stringify({ userData, token })
      );
      setToken(token);

      dispatch({
        type: "SET_MESSAGES",
        payLoad: { messages: userData.messagesRead },
      });
      dispatch({
        type: "SET_USER",
        payLoad: { user: userData },
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
      const { userData, token } = await userService.update(id, data);

      if (token) {
        destroyToken();
        window.localStorage.setItem("loggedUser", JSON.stringify(userData));
        setToken(token);
      }

      dispatch({
        type: "SET_USER",
        payLoad: { user: userData },
      });
      dispatch(infoNotification("User details updated"));
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
      await userService.deleteUser(id, password);

      destroyToken();
      window.localStorage.removeItem("loggedUser");

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

export default userReducer;
