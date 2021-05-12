import cashflowService from "../services/cashflow";
import { errorNotification } from "./notificationReducer";

const initialState = {
  isFetching: false,
  monthlyCashflow: [],
};

const cashflowReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case "CASHFLOW_REQUEST":
      newState = { ...state };
      newState.isFetching = true;
      return newState;
    case "GET_CASHFLOW":
      newState = { ...state };
      newState.isFetching = false;
      newState.monthlyCashflow = action.payLoad.monthlyCashflow;
      return newState;
    case "CASHFLOW_REQUEST_FAIL":
      newState = { ...state };
      newState.isFetching = false;
      return newState;
    default:
      return state;
  }
};

export const getCashflow = (type, assumptions) => {
  return async (dispatch) => {
    dispatch({
      type: "CASHFLOW_REQUEST",
    });
    try {
      const monthlyCashflow = await cashflowService.getCashflow(
        type,
        assumptions
      );
      dispatch({
        type: "GET_CASHFLOW",
        payLoad: {
          monthlyCashflow,
        },
      });
    } catch (e) {
      dispatch({
        type: "CASHFLOW_REQUEST_FAIL",
      });
      dispatch(errorNotification(e.response.data.message));
    }
  };
};

export const getDashboardCashflow = (dashboardId) => {
  return async (dispatch) => {
    dispatch({
      type: "CASHFLOW_REQUEST",
    });
    try {
      const monthlyCashflow = await cashflowService.getDashboardCashflow(
        dashboardId
      );
      dispatch({
        type: "GET_CASHFLOW",
        payLoad: {
          monthlyCashflow,
        },
      });
    } catch (e) {
      dispatch({
        type: "CASHFLOW_REQUEST_FAIL",
      });
      dispatch(errorNotification(e.response.data.message));
    }
  };
};

export default cashflowReducer;
