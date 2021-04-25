import { v4 as uuid } from "uuid";
import loginService from "../services/login";
import { CONSTANTS } from "../static/constants";
import { setToken, destroyToken } from "../utils/tokenHelper";
import userService from "../services/user";
import dashboardService from "../services/dashboard";

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
        const user = JSON.parse(loggedUserJSON);
        setToken(user.token);
        dispatch({
          type: "SET_MESSAGES",
          payLoad: { messages: user.messagesRead },
        });
        dispatch({
          type: "SET_USER",
          payLoad: { user },
        });

        const dashboards = await dashboardService.getAllDashboards();

        dispatch({
          type: "INIT_DASHBOARDS",
          payLoad: { dashboards },
        });
      } else {
        dispatch({
          type: "USER_REQUEST_FAIL",
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: "SET_NOTIFICATION",
        payLoad: {
          id: uuid(),
          message: e.response.data.message,
          type: CONSTANTS.NOTIFICATION.ERROR,
        },
      });
    }
  };
};

export const demoUser = () => {
  return async (dispatch) => {
    dispatch({
      type: "USER_REQUEST",
    });
    try {
      const user = await loginService.demo();

      window.localStorage.setItem("loggedUser", JSON.stringify(user));

      setToken(user.token);

      dispatch({
        type: "SET_MESSAGES",
        payLoad: { messages: user.messagesRead },
      });
      dispatch({
        type: "SET_USER",
        payLoad: { user },
      });

      const dashboards = await dashboardService.getAllDashboards();

      dispatch({
        type: "INIT_DASHBOARDS",
        payLoad: { dashboards },
      });
      dispatch({
        type: "SET_NOTIFICATION",
        payLoad: {
          id: uuid(),
          message: `Logged into demo account`,
          type: CONSTANTS.NOTIFICATION.SUCCESS,
        },
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: "SET_NOTIFICATION",
        content: {
          id: uuid(),
          message: e.response.data.message,
          type: CONSTANTS.NOTIFICATION.ERROR,
        },
      });
    }
  };
};

export const createUser = (email, password, checkPassword) => {
  return async (dispatch) => {
    dispatch({
      type: "USER_REQUEST",
    });
    try {
      await userService.create({
        email,
        password,
        checkPassword,
      });

      const user = await loginService.login({
        email,
        password,
      });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));

      setToken(user.token);

      dispatch({
        type: "SET_MESSAGES",
        payLoad: { messages: user.messagesRead },
      });
      dispatch({
        type: "SET_USER",
        payLoad: { user },
      });

      const dashboards = await dashboardService.getAllDashoards();

      dispatch({
        type: "INIT_DASHBOARDS",
        payLoad: { dashboards },
      });
      dispatch({
        type: "SET_NOTIFICATION",
        payLoad: {
          id: uuid(),
          message: `Account created`,
          type: CONSTANTS.NOTIFICATION.SUCCESS,
        },
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: "USER_REQUEST_FAIL",
      });
      dispatch({
        type: "SET_NOTIFICATION",
        payLoad: {
          id: uuid(),
          message: e.response.data.message,
          type: CONSTANTS.NOTIFICATION.ERROR,
        },
      });
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
    dispatch({
      type: "SET_NOTIFICATION",
      payLoad: {
        id: uuid(),
        message: "Logged Out",
        type: CONSTANTS.NOTIFICATION.SUCCESS,
      },
    });
  };
};

export const loginUser = (email, password) => {
  return async (dispatch) => {
    dispatch({
      type: "USER_REQUEST",
    });
    try {
      const user = await loginService.login({
        email,
        password,
      });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setToken(user.token);

      dispatch({
        type: "SET_MESSAGES",
        payLoad: { messages: user.messagesRead },
      });
      dispatch({
        type: "SET_USER",
        payLoad: { user },
      });

      const dashboards = await dashboardService.getAllDashboards();

      dispatch({
        type: "INIT_DASHBOARDS",
        payLoad: { dashboards },
      });
    } catch (e) {
      dispatch({
        type: "USER_REQUEST_FAIL",
      });
      dispatch({
        type: "SET_NOTIFICATION",
        payLoad: {
          id: uuid(),
          message: e.response.data.message,
          type: CONSTANTS.NOTIFICATION.ERROR,
        },
      });
    }
  };
};

export const updateUser = (id, userData) => {
  return async (dispatch) => {
    dispatch({
      type: "USER_REQUEST",
    });
    try {
      const user = await userService.update(id, userData);

      if (user.token) {
        window.localStorage.setItem("loggedUser", JSON.stringify(user));
        destroyToken();
        setToken(user.token);
      }

      dispatch({
        type: "SET_USER",
        payLoad: { user },
      });

      dispatch({
        type: "SET_NOTIFICATION",
        payLoad: {
          id: uuid(),
          message: "User details updated",
          type: CONSTANTS.NOTIFICATION.MESSAGE,
        },
      });
    } catch (e) {
      dispatch({
        type: "USER_REQUEST_FAIL",
      });
      dispatch({
        type: "SET_NOTIFICATION",
        payLoad: {
          id: uuid(),
          message: e.response.data.message,
          type: CONSTANTS.NOTIFICATION.ERROR,
        },
      });
    }
  };
};

export const deleteUser = (id, password) => {
  return async (dispatch) => {
    dispatch({
      type: "USER_REQUEST",
    });
    try {
      await userService.deleteUser(password, id);

      window.localStorage.removeItem("loggedUser");
      destroyToken();

      dispatch({
        type: "CLEAR_USER",
      });
    } catch (e) {
      dispatch({
        type: "USER_REQUEST_FAIL",
      });
      dispatch({
        type: "SET_NOTIFICATION",
        payLoad: {
          id: uuid(),
          message: e.response.data.message,
          type: CONSTANTS.NOTIFICATION.ERROR,
        },
      });
    }
  };
};

export default userReducer;
