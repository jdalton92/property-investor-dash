import { CONSTANTS } from "../static/constants";

const initialState = {
  sidebarOpen: {
    right: false,
    left: false,
  },
  modal: {
    [CONSTANTS.MODALS.SAVEDASHBOARD]: false,
  },
  dropdown: {
    [CONSTANTS.DROPDOWNS.USERNAME]: false,
  },
  overlay: false,
};

const navigationReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case "SET_RIGHT_SIDEBAR":
      newState = { ...state };
      newState.overlay = action.status;
      newState.sidebarOpen.right = action.status;
      return newState;
    case "SET_LEFT_SIDEBAR":
      newState = { ...state };
      newState.overlay = action.status;
      newState.sidebarOpen.left = action.status;
      return newState;
    case "SET_MODAL":
      newState = { ...state };
      newState.modal[action.payload.modalType] = action.payload.status;
      newState.overlay = action.payload.status;
      return newState;
    case "SET_DROPDOWN":
      newState = { ...state };
      newState.dropdown[action.dropdown] = !newState.dropdown[action.dropdown];
      return newState;
    default:
      return state;
  }
};

export const setRightSidebar = (status) => {
  return (dispatch) => {
    dispatch({
      type: "SET_RIGHT_SIDEBAR",
      status: status,
    });
  };
};

export const setLeftSidebar = (status) => {
  return (dispatch) => {
    dispatch({
      type: "SET_LEFT_SIDEBAR",
      status: status,
    });
  };
};

export const setModal = (modalType, status) => {
  return (dispatch) => {
    dispatch({
      type: "SET_MODAL",
      payload: {
        modalType,
        status,
      },
    });
  };
};

export const setDropdown = (dropdown) => {
  return (dispatch) => {
    dispatch({
      type: "SET_DROPDOWN",
      dropdown,
    });
  };
};

export default navigationReducer;
