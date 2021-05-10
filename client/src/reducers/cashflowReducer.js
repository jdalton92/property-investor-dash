import cashflowService from "../services/cashflow";
import { errorNotification } from "./notificationReducer";

const initialState = {
  isFetching: false,
  cashflow: [],
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
      newState.isFetching = true;
      newState.cashflow = action.payLoad.cashflow;
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
      const cashflow = cashflowService.getCashflow(type, assumptions);
      dispatch({
        type: "GET_CASHFLOW",
        payLoad: {
          cashflow,
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
