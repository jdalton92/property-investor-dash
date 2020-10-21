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
  savedDashboards: [],
  currentDashboard: {
    preSave: false,
    values: {},
  },
};

const dashboardReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case "DASHBOARD_REQUEST":
      return { ...state, isFetching: true };
    case "DASHBOARD_REQUEST_FAIL":
      newState = state;
      newState.isFetching = false;
      newState.currentDashboard.preSave = false;
      return newState;
    case "TEST_DASHBOARD":
      newState = state;
      newState.isFetching = false;
      newState.currentDashboard.preSave = true;
      newState.currentDashboard.values = action.data;
      return newState;
    case "PRE_SAVE_DASHBOARD":
      newState = state;
      newState.currentDashboard.preSave = true;
      return newState;
    case "INIT_DASHBOARDS":
      return {
        isFetching: false,
        savedDashboards: action.data,
        currentDashboard: {
          preSave: false,
          values: {},
        },
      };
    case "GET_DASHBOARD":
      newState = state;
      newState.isFetching = false;
      newState.currentDashboard.preSave = false;
      newState.currentDashboard.values = action.data;
      return newState;
    case "SAVE_DASHBOARD":
      newState = state;
      newState.isFetching = false;
      newState.currentDashboard.preSave = false;
      newState.savedDashboards = [...state.savedDashboards, action.data];
      return newState;
    case "UPDATE_DASHBOARDS":
      const dashboardList = state.data.filter((d) => d._id !== action.data._id);
      return {
        isFetching: false,
        savedDashboards: [...dashboardList, action.data],
        currentDashboard: {
          preSave: false,
          values: {},
        },
      };
    case "DELETE_DASHBOARD":
      return {
        isFetching: false,
        savedDashboards: [...state.data.filter((d) => d._id !== action.id)],
        currentDashboard: {
          preSave: false,
          values: {},
        },
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
