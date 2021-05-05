import cashflowService from "../services/cashflow";
import { errorNotification } from "./notificationReducer";

const initialState = {
  isFetchingSummary: false,
  isFetchingMonthly: false,
  totalCashflow: [],
  annualCashflow: [],
  monthlyCashflow: [],
};

const cashflowReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case "SUMMARY_REQUEST":
      newState = { ...state };
      newState.isFetchingSummary = true;
      return newState;
    case "MONTHLY_REQUEST":
      newState = { ...state };
      newState.isFetchingMonthly = true;
      return newState;
    case "SUMMARY_REQUEST_FAIL":
      newState = { ...state };
      newState.isFetchingSummary = false;
      return newState;
    case "MONTHLY_REQUEST_FAIL":
      newState = { ...state };
      newState.isFetchingMonthly = false;
      return newState;
    case "GET_SUMMARY":
      newState = { ...state };
      newState.isFetchingSummary = false;
      newState.totalCashflow = action.payLoad.totalCashflow;
      newState.annualCashflow = action.payLoad.annualCashflow;
      return newState;
    case "GET_MONTHLY":
      newState = { ...state };
      newState.isFetchingMonthly = false;
      newState.monthlyCashflow.append(action.payLoad.monthlyCashflow);
      return newState;
    default:
      return state;
  }
};

export const getSummary = (type, assumptions) => {
  return async (dispatch) => {
    dispatch({
      type: "SUMMARY_REQUEST",
    });
    try {
      // TODO: create service call and server logic
      const {
        totalCashflow,
        annualCashflow,
      } = cashflowService.getSummaryCashflow(type, assumptions);
      dispatch({
        type: "GET_SUMMARY",
        payLoad: {
          totalCashflow,
          annualCashflow,
        },
      });
    } catch (e) {
      dispatch({
        type: "SUMMARY_REQUEST_FAIL",
      });
      dispatch(errorNotification(e.response.data.message));
    }
  };
};

export const getMonthly = (type, assumptions, params) => {
  return async (dispatch) => {
    dispatch({
      type: "SUMMARY_REQUEST",
    });
    try {
      // TODO: get monthly cashflow from server incl. pagination
      const { monthlyCashflow } = cashflowService.getMonthlyCashflow(
        type,
        assumptions,
        params
      );
      dispatch({
        type: "GET_SUMMARY",
        payLoad: { monthlyCashflow },
      });
    } catch (e) {
      dispatch({
        type: "SUMMARY_REQUEST_FAIL",
      });
      dispatch(errorNotification(e.response.data.message));
    }
  };
};

export default cashflowReducer;
