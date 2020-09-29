import { CONSTANTS } from "../static/constants";

const initialState = {
  sidebarOpen: {
    right: false,
    left: false,
  },
  accordianShow: {
    ownerOccupier: {
      standard: true,
      advanced: false,
    },
    investor: {
      standard: true,
      advanced: false,
    },
    developer: {
      standard: true,
      advanced: false,
    },
  },
  cashflowTable: {
    ownerOccupier: true,
    investor: true,
    developer: {
      preFinance: false,
      postFinance: false,
    },
  },
  modal: {
    disclaimer: false,
    userType: false,
    saveDashboard: false,
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
    case "SET_ACCORDIAN":
      return {
        ...state,
        accordianShow: {
          ...state.accordianShow,
          [action.user]: {
            ...state.accordianShow[action.user],
            [action.accordian]: !state.accordianShow[action.user][
              action.accordian
            ],
          },
        },
      };
    case "SET_MODAL":
      return {
        ...state,
        modal: {
          ...state.modal,
          [action.modalType]: !state.modal[action.modalType],
        },
      };
    case "SET_DROPDOWN":
      newState = { ...state };
      newState.dropdown[action.dropdown] = !newState.dropdown[action.dropdown];
      return newState;
    case "SET_CASHFLOW":
      if (action.user === "developer") {
        return {
          ...state,
          cashflowTable: {
            ...state.cashflowTable,
            developer: {
              ...state.cashflowTable.developer,
              [action.finance]: !state.cashflowTable.developer[action.finance],
            },
          },
        };
      }
      return {
        ...state,
        cashflowTable: {
          ...state.cashflowTable,
          [action.user]: !state.cashflowTable[action.user],
        },
      };
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

export const setAccordian = (user, accordian) => {
  return (dispatch) => {
    dispatch({
      type: "SET_ACCORDIAN",
      user,
      accordian,
    });
  };
};

export const setModal = (modalType) => {
  return (dispatch) => {
    if (modalType === "userType") {
      dispatch({
        type: "EDIT_DASHBOARD_CANCEL",
      });
    }
    dispatch({
      type: "SET_MODAL",
      modalType,
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

export const setCashflow = (user, finance) => {
  return (dispatch) => {
    dispatch({
      type: "SET_CASHFLOW",
      user,
      finance,
    });
  };
};

export default navigationReducer;
