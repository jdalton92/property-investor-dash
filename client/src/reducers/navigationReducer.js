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
  tabs: {
    login: CONSTANTS.TABS.LOGIN.LOGIN,
    saveDashboard: CONSTANTS.TABS.SAVEDASHBOARD.SAVE,
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
      newState.modal[action.payLoad.modalType] = action.payLoad.status;
      newState.overlay = action.payLoad.status;
      return newState;
    case "SET_DROPDOWN":
      newState = { ...state };
      newState.dropdown[action.dropdown] = !newState.dropdown[action.dropdown];
      return newState;
    case "SET_TAB":
      newState = { ...state };
      newState.tabs[action.payLoad.type] = action.payLoad.tab;
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
      payLoad: {
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

export const setTab = (type, tab) => {
  return (dispatch) => {
    dispatch({
      type: "SET_TAB",
      payLoad: {
        type,
        tab
      },
    });
  };
};

export default navigationReducer;
