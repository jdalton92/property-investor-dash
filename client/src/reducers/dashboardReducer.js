import dashboardService from "../services/dashboard";
import { successNotification, errorNotification } from "./notificationReducer";

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

const investorAsssumptions = {
  ...occupierAsssumptions,
  rentalYield: 3,
};

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
//   repaymentType: "interestOnly",
//   interestRate: 3.5,
//   loanTerm: 30,
//   overPayment: 200,

//   capitalGrowth: 3.5,
//   constructionCostGrowth: 2.5,
// };

let initialState = {
  isFetching: false,
  // isEditing: false,
  savedDashboards: [],
  // currentDashboard: {
  //   name: "",
  //   description: "",
  //   date: "",
  //   type: "",
  //   assumptions: {},
  // },
  isEditing: true,
  currentDashboard: {
    name: "",
    description: "",
    date: "",
    type: "occupier",
    assumptions: occupierAsssumptions,
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
      newState = { ...initialState };
      newState.isFetching = false;
      newState.savedDashboards = action.payLoad.dashboards;
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

      dispatch({
        type: "INIT_DASHBOARDS",
        payLoad: { dashboards: results },
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
      dispatch(successNotification(`${newDash.description} saved`));
    } catch (e) {
      dispatch({
        type: "DASHBOARD_REQUEST_FAIL",
      });
      dispatch(errorNotification(e.response.data.message));
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
      dispatch(successNotification(`${dashboard.description} saved`));
    } catch (e) {
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
