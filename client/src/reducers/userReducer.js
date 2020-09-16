import loginService from "../services/login";
import { setToken, destroyToken } from "../helpers/tokenHelper";
import userService from "../services/user";

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
        data: action.data,
      };
    case "CLEAR_USER":
      return initialState;
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
          type: "SET_USER",
          data: user,
        });
      } else {
        dispatch({
          type: "USER_REQUEST_FAIL",
        });
      }
    } catch (e) {
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

export const createUser = ({ username, email, password, checkPassword }) => {
  return async (dispatch) => {
    dispatch({
      type: "USER_REQUEST",
    });
    try {
      await userService.create({
        username,
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
        type: "SET_USER",
        data: user,
      });
      dispatch({
        type: "SET_NOTIFICATION",
        content: {
          message: `${username} created`,
          type: "success",
        },
      });
    } catch (e) {
      dispatch({
        type: "USER_REQUEST_FAIL",
      });
      dispatch({
        type: "SET_NOTIFICATION",
        content: {
          message: e.response.data.error,
          type: "danger",
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
        type: "SET_USER",
        data: user,
      });
    } catch (e) {
      dispatch({
        type: "USER_REQUEST_FAIL",
      });
      dispatch({
        type: "SET_NOTIFICATION",
        content: {
          message: "wrong username or password",
          type: "error",
        },
      });
    }
  };
};

export const updateUser = (
  newEmail,
  oldPassword,
  newPassword,
  confirmNewPassword,
  id
) => {
  return async (dispatch) => {
    dispatch({
      type: "USER_REQUEST",
    });
    try {
      const user = await userService.update(
        newEmail,
        oldPassword,
        newPassword,
        confirmNewPassword,
        id
      );

      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      destroyToken();
      setToken(user.token);

      dispatch({
        type: "SET_USER",
        data: user,
      });
    } catch (e) {
      dispatch({
        type: "USER_REQUEST_FAIL",
      });
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

export const deleteUser = (password, id) => {
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
        content: {
          message: e.response.data.error,
          type: "error",
        },
      });
    }
  };
};

export default userReducer;
