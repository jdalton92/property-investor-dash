import dashboardService from "../services/dashboard";
import { v4 as uuid } from "uuid";
import { CONSTANTS } from "../static/constants";

// const occupierAsssumptions = {
//   capitalGrowth: 3.5,
//   opexGrowth: 3,
//   purchasePrice: 1000000,
//   ownershipLength: 15,
//   upfrontCosts: 3,
//   sellingCosts: 3,
//   opex: 1000,
//   deposit: 200000,
//   homeloanTerm: 30,
//   loanType: "principalAndInterest",
//   interestRate: 3.5,
//   overPayments: 200,
// };

// const investorAsssumptions = {
//   ...occupierData,
//   rentalYield: 3,
// };

// const developerAsssumptions = {
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
    name: "",
    description: "",
    date: "",
    assumptions: {},
  },
};

const dashboardReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case "DASHBOARD_REQUEST":
      newState = { ...state };
      newState.isFetching = true;
      return newState;
    case "DASHBOARD_REQUEST_FAIL":
      newState = { ...state };
      newState.isFetching = false;
      newState.currentDashboard.preSave = false;
      return newState;
    case "TEST_DASHBOARD":
      newState = { ...state };
      newState.isFetching = false;
      newState.currentDashboard = {
        preSave: true,
        assumptions: action.payLoad.assumptions,
      };
      return newState;
    case "PRE_SAVE_DASHBOARD":
      newState = { ...state };
      newState.currentDashboard.preSave = true;
      return newState;
    case "INIT_DASHBOARDS":
      newState = { ...initialState };
      newState.isFetching = false;
      newState.savedDashboards = action.payLoad.dashboards;
      return newState;
    case "GET_DASHBOARD":
      newState = { ...state };
      newState.isFetching = false;
      newState.currentDashboard.preSave = false;
      newState.currentDashboard = action.payLoad.dashboard;
      return newState;
    case "SAVE_DASHBOARD":
      newState = { ...state };
      newState.isFetching = false;
      newState.currentDashboard.preSave = false;
      newState.savedDashboards = [
        ...state.savedDashboards,
        action.payLoad.dashboard,
      ];
      return newState;
    case "UPDATE_DASHBOARDS":
      newState = { ...initialState };
      const dashboards = state.savedDashboards
        .filter((d) => d._id !== action.payLoad.dashboard._id)
        .concat(action.payLoad.dashboard);
      newState.savedDashboards = dashboards;
      return newState;
    case "DELETE_DASHBOARD":
      newState = { ...state };
      newState.savedDashboards = [
        ...state.savedDashboards.filter((d) => d._id !== action.payLoad.id),
      ];
      return newState;
    default:
      return state;
  }
};

export const getDashboards = (params) => {
  return async (dispatch) => {
    dispatch({
      type: "DASHBOARD_REQUEST",
    });
    try {
      const { results } = await dashboardService.getAllDashboards(params);
      console.log(results);
      dispatch({
        type: "INIT_DASHBOARDS",
        payLoad: { dashboards: results },
      });
    } catch (e) {
      dispatch({
        type: "DASHBOARD_REQUEST_FAIL",
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

export const getDashboard = (id) => {
  return async (dispatch) => {
    dispatch({
      type: "DASHBOARD_REQUEST",
    });
    try {
      const dashboard = await dashboardService.getDashboard(id);

      dispatch({
        type: "GET_DASHBOARD",
        payLoad: { dashboard },
      });
    } catch (e) {
      dispatch({
        type: "DASHBOARD_REQUEST_FAIL",
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

export const testDashboard = (assumptions) => {
  return (dispatch) => {
    dispatch({
      type: "TEST_DASHBOARD",
      payLoad: { assumptions },
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
      const newDash = await dashboardService.saveDashboard(dashboardObject);

      dispatch({
        type: "SAVE_DASHBOARD",
        payLoad: {
          dashboard: newDash,
        },
      });
      dispatch({
        type: "SET_NOTIFICATION",
        payLoad: {
          id: uuid(),
          message: `${newDash.description} saved`,
          type: CONSTANTS.NOTIFICATION.SUCCESS,
        },
      });
    } catch (e) {
      dispatch({
        type: "DASHBOARD_REQUEST_FAIL",
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

export const updateDashboard = (dashboardObject) => {
  return async (dispatch) => {
    dispatch({
      type: "DASHBOARD_REQUEST",
    });
    try {
      const dashboard = await dashboardService.updateDashboard(dashboardObject);

      dispatch({
        type: "UPDATE_DASHBOARDS",
        payLoad: { dashboard },
      });
      dispatch({
        type: "SET_NOTIFICATION",
        payLoad: {
          id: uuid(),
          message: `${dashboard.description} saved`,
          type: CONSTANTS.NOTIFICATION.SUCCESS,
        },
      });
    } catch (e) {
      dispatch({
        type: "DASHBOARD_REQUEST_FAIL",
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

export const deleteDashboard = (id) => {
  return async (dispatch) => {
    dispatch({
      type: "DASHBOARD_REQUEST",
    });
    try {
      await dashboardService.removeDashboard(id);

      dispatch({
        type: "DELETE_DASHBOARD",
        payLoad: {
          id,
        },
      });
      dispatch({
        type: "SET_NOTIFICATION",
        payLoad: {
          id: uuid(),
          message: "Dashboard delected",
          type: CONSTANTS.NOTIFICATION.SUCCESS,
        },
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: "DASHBOARD_REQUEST_FAIL",
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

export default dashboardReducer;
