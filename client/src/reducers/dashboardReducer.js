import dashboardService from "../services/dashboard";

// const initialOwnerData = {
//   housePrice: 1000000,
//   deposit: 200000,
//   loanType: "principalAndInterest",
//   interestRate: 3.5,
//   homeloanTerm: 30,
//   overPayments: [{}],
//   investmentPeriod: 15,
//   sellingCosts: 3,
//   capitalGrowth: 3.5,
//   upfrontCosts: 3,
//   recurringCosts: 1000,
//   rentalYield: 3,
//   investor: false,
//   inflation: 3,
// };

// const initialDeveloperData = {
//   acquisitionPrice: 100000,
//   acquisitionCosts: 5,
//   dwellings: 4,
//   constructionCostPerDwelling: 400000,
//   designFees: 10,
//   constructionContingency: 10,
//   statutoryFees: 3,
//   constructionDuration: 24,
//   planningAndDesign: 6,

//   revenuePerDwelling: 750000,
//   sellingCosts: 5,
//   investmentPeriod: 5,
//   recurringCosts: 30,
//   rentalYield: 4,

//   initialEquity: 400000,
//   loanType: "interestOnly",
//   interestRate: 3.5,
//   loanTerm: 30,
//   overPayments: [{}],

//   capitalGrowth: 3.5,
//   constructionCostGrowth: 2.5,
// };

let initialState = {
  isFetching: false,
  preSave: false,
  data: [],
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DASHBOARD_REQUEST":
      return { ...state, isFetching: true };
    case "DASHBOARD_REQUEST_FAIL":
      return { ...state, isFetching: false, preSave: false };
    case "TEST_DASHBOARD":
      return {
        isFetching: false,
        preSave: true,
        data: [{ values: action.data }],
      };
    case "PRE_SAVE_DASHBOARD":
      return { ...state, preSave: true };
    case "INIT_DASHBOARDS":
      return { isFetching: false, preSave: false, data: [...action.data] };
    case "GET_DASHBOARD":
      return { isFetching: false, preSave: false, data: [action.data] };
    case "SAVE_DASHBOARD":
      return {
        isFetching: false,
        preSave: false,
        data: [...state.data, action.data],
      };
    case "UPDATE_DASHBOARDS":
      const dashboardList = state.data.filter((d) => d._id !== action.data._id);
      return {
        isFetching: false,
        preSave: false,
        data: [...dashboardList, action.data],
      };
    case "DELETE_DASHBOARD":
      return {
        isFetching: false,
        preSave: false,
        data: [...state.data.filter((d) => d._id !== action.id)],
      };
    default:
      return state;
  }
};

export const getDashboards = () => {
  return async (dispatch) => {
    dispatch({
      type: "DASHBOARD_REQUEST",
    });
    try {
      const dashboards = await dashboardService.getAllDash();

      dispatch({
        type: "INIT_DASHBOARDS",
        data: dashboards,
      });
    } catch (e) {
      dispatch({
        type: "DASHBOARD_REQUEST_FAIL",
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

export const getDashboard = (id) => {
  return async (dispatch) => {
    dispatch({
      type: "DASHBOARD_REQUEST",
    });
    try {
      const dashboard = await dashboardService.getDash(id);

      dispatch({
        type: "GET_DASHBOARD",
        data: dashboard,
      });
    } catch (e) {
      dispatch({
        type: "DASHBOARD_REQUEST_FAIL",
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

export const testDashboard = (dashboard) => {
  return (dispatch) => {
    dispatch({
      type: "TEST_DASHBOARD",
      data: dashboard,
    });
  };
};

export const preSaveDashboard = () => {
  return (dispatch) => {
    dispatch({
      type: "PRE_SAVE_DASHBOARD",
    });
  };
};

export const saveDashboard = (dashboardObject) => {
  return async (dispatch) => {
    dispatch({
      type: "DASHBOARD_REQUEST",
    });
    try {
      const newDash = await dashboardService.saveDash(dashboardObject);

      dispatch({
        type: "SAVE_DASHBOARD",
        data: newDash,
      });
    } catch (e) {
      dispatch({
        type: "DASHBOARD_REQUEST_FAIL",
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

export const updateDashboard = (dashboardObject) => {
  return async (dispatch) => {
    dispatch({
      type: "DASHBOARD_REQUEST",
    });
    try {
      const newDash = await dashboardService.updateDash(dashboardObject);

      dispatch({
        type: "UPDATE_DASHBOARDS",
        data: newDash,
      });
    } catch (e) {
      dispatch({
        type: "DASHBOARD_REQUEST_FAIL",
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

export const deleteDashboard = (id) => {
  return async (dispatch) => {
    dispatch({
      type: "DASHBOARD_REQUEST",
    });
    try {
      await dashboardService.removeDash(id);

      dispatch({
        type: "DELETE_DASHBOARD",
        id,
      });
    } catch (e) {
      dispatch({
        type: "DASHBOARD_REQUEST_FAIL",
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

export default dashboardReducer;
