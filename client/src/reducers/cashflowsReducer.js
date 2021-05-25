import cashflowsService from "../services/cashflows";
import { errorNotification } from "./notificationReducer";

const initialState = {
  isFetching: false,
  monthlyCashflow: [],
};

const cashflowsReducer = (state = initialState, action) => {
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
      const monthlyCashflow = await cashflowsService.getCashflow(
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

export const getDashboardAndCashflow = (dashboardId) => {
  return async (dispatch) => {
    dispatch({
      type: "CASHFLOW_REQUEST",
    });
    try {
      const { dashboard, cashflow } =
        await cashflowsService.getDashboardAndCashflow(dashboardId);
      dispatch({
        type: "GET_CASHFLOW",
        payLoad: {
          monthlyCashflow: cashflow,
        },
      });
      dispatch({
        type: "GET_DASHBOARD",
        payLoad: { dashboard },
      });
    } catch (e) {
      dispatch({
        type: "CASHFLOW_REQUEST_FAIL",
      });
      dispatch(errorNotification(e.response.data.message));
    }
  };
};

export default cashflowsReducer;
