import dashboardService from "../services/dashboard";
import { successNotification, errorNotification } from "./notificationReducer";
import { paginatedResults } from "../utils/dashboardHelper";

// eslint-disable-next-line
const occupierAsssumptions = {
  capitalGrowth: 3.5,
  opexGrowth: 3,
  purchasePrice: 1000000,
  ownershipLength: 15,
  upfrontCosts: 3,
  sellingCosts: 3,
  opex: 1000,
  deposit: 200000,
  homeloanTerm: 30,
  repaymentType: "principalAndInterest",
  interestRate: 3.5,
  overPayment: 200,
};
// eslint-disable-next-line
const investorAsssumptions = {
  ...occupierAsssumptions,
  rentalYield: 3,
};
// eslint-disable-next-line
const developerAsssumptions = {
  acquisitionPrice: 100000,
  acquisitionCosts: 5,
  dwellings: 4,
  constructionCostPerDwelling: 400000,
  designFees: 10,
  constructionContingency: 10,
  statutoryFees: 3,
  constructionDuration: 24,
  planningAndDesign: 6,

  revenuePerDwelling: 750000,
  sellingCosts: 5,
  investmentPeriod: 5,
  recurringCosts: 30,
  rentalYield: 4,

  initialEquity: 400000,
  repaymentType: "interestOnly",
  interestRate: 3.5,
  loanTerm: 30,
  overPayment: 200,

  capitalGrowth: 3.5,
  constructionCostGrowth: 2.5,
};

let initialState = {
  isFetching: false,
  isEditing: false,
  savedDashboards: paginatedResults,
  currentDashboard: {
    name: "",
    description: "",
    date: "",
    type: "",
    assumptions: {},
  },
  // isFetching: false,
  // isEditing: true,
  // savedDashboards: paginatedResults,
  // currentDashboard: {
  //   name: "",
  //   description: "",
  //   date: "",
  //   type: "developer",
  //   assumptions: developerAsssumptions,
  // },
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
      newState.isEditing = false;
      return newState;
    case "TEST_DASHBOARD":
      newState = { ...state };
      newState.isFetching = false;
      newState.isEditing = true;
      newState.currentDashboard = {
        type: action.payLoad.type,
        assumptions: action.payLoad.assumptions,
      };
      return newState;
    case "PRE_SAVE_DASHBOARD":
      newState = { ...state };
      newState.isEditing = true;
      return newState;
    case "INIT_DASHBOARDS":
      newState = { ...state };
      newState.isFetching = false;
      newState.savedDashboards = action.payLoad.response;
      return newState;
    case "GET_DASHBOARD":
      newState = { ...state };
      newState.isFetching = false;
      newState.isEditing = false;
      newState.currentDashboard = action.payLoad.dashboard;
      return newState;
    case "SAVE_DASHBOARD":
      newState = { ...state };
      newState.isFetching = false;
      newState.isEditing = false;
      // TODO: update pagination count etc.
      newState.savedDashboards.results = [
        ...state.savedDashboards.results,
        action.payLoad.dashboard,
      ];
      return newState;
    case "UPDATE_DASHBOARDS":
      newState = { ...state };
      const dashboards = state.savedDashboards.results
        .filter((d) => d._id !== action.payLoad.id)
        .concat(action.payLoad.dashboard);
      newState.savedDashboards = dashboards;
      newState.isFetching = false;
      return newState;
    case "DELETE_DASHBOARD":
      newState = { ...state };
      // TODO: update pagination count etc.
      newState.savedDashboards.results = [
        ...state.savedDashboards.results.filter(
          (d) => d._id !== action.payLoad.id
        ),
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
      const response = await dashboardService.getAllDashboards(params);
      dispatch({
        type: "INIT_DASHBOARDS",
        payLoad: { response },
      });
    } catch (e) {
      dispatch({
        type: "DASHBOARD_REQUEST_FAIL",
      });
      dispatch(errorNotification(e.response.data.message));
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
      dispatch(errorNotification(e.response.data.message));
    }
  };
};

export const testDashboard = (type, assumptions) => {
  return (dispatch) => {
    dispatch({
      type: "TEST_DASHBOARD",
      payLoad: { type, assumptions },
    });
  };
};

export const editDashboard = () => {
  return (dispatch) => {
    dispatch({
      type: "PRE_SAVE_DASHBOARD",
    });
  };
};

export const saveDashboard = (dashboard) => {
  return async (dispatch) => {
    dispatch({
      type: "DASHBOARD_REQUEST",
    });
    try {
      const newDashboard = await dashboardService.saveDashboard(dashboard);

      dispatch({
        type: "SAVE_DASHBOARD",
        payLoad: {
          dashboard: newDashboard,
        },
      });
      dispatch(successNotification(`${newDashboard.description} saved`));
    } catch (e) {
      console.log(e);
      dispatch({
        type: "DASHBOARD_REQUEST_FAIL",
      });
      dispatch(errorNotification(e.response.data.message));
    }
  };
};

export const updateDashboard = (id, dashboardData) => {
  return async (dispatch) => {
    dispatch({
      type: "DASHBOARD_REQUEST",
    });
    try {
      const updatedDashboard = await dashboardService.updateDashboard(
        id,
        dashboardData
      );

      dispatch({
        type: "UPDATE_DASHBOARDS",
        payLoad: { id, updatedDashboard },
      });
      dispatch(successNotification(`${updatedDashboard.description} saved`));
    } catch (e) {
      console.log(e);
      dispatch({
        type: "DASHBOARD_REQUEST_FAIL",
      });
      dispatch(errorNotification(e.response.data.message));
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
      dispatch(successNotification("Dashboard deleted"));
    } catch (e) {
      console.log(e);
      dispatch({
        type: "DASHBOARD_REQUEST_FAIL",
      });
      dispatch(errorNotification(e.response.data.message));
    }
  };
};

export default dashboardReducer;
