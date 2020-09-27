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
    username: false,
  },
  overlay: false,
};

const navigationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_RIGHT_SIDEBAR":
      return {
        ...state,
        overlay: action.status,
        sidebarOpen: {
          right: action.status,
          left: state.sidebarOpen.left,
        },
      };
    case "SET_LEFT_SIDEBAR":
      return {
        ...state,
        overlay: action.status,
        sidebarOpen: {
          left: action.status,
          right: state.sidebarOpen.right,
        },
      };
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
      return {
        ...state,
        dropdown: {
          ...state.dropdown,
          [action.dropdownType]: !state.dropdown[action.dropdownType],
        },
      };
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

export const setDropdown = (dropdownType) => {
  return (dispatch) => {
    dispatch({
      type: "SET_DROPDOWN",
      dropdownType,
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
