import dashboardService from "../services/dashboard";

let initialState = { isFetching: false, isEditing: false, data: [] };

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DASHBOARD_REQUEST":
      return { ...state, isFetching: true };
    case "DASHBOARD_REQUEST_FAIL":
      return { ...state, isFetching: false, isEditing: false };
    case "EDIT_DASHBOARD":
      return { ...state, isEditing: true };
    case "EDIT_DASHBOARD_CANCEL":
      return { ...state, isEditing: false };
    case "INIT_DASHBOARDS":
      return { isFetching: false, isEditing: false, data: [...action.data] };
    case "SAVE_DASHBOARD":
      return {
        isFetching: false,
        isEditing: false,
        data: [...state.data, action.data]
      };
    case "UPDATE_DASHBOARD":
      const dashboardList = state.data.filter(d => d._id !== action.data._id);
      return {
        isFetching: false,
        isEditing: false,
        data: [...dashboardList, action.data]
      };
    case "DELETE_DASHBOARD":
      return {
        isFetching: false,
        isEditing: false,
        data: [...state.data.filter(d => d._id !== action.id)]
      };
    default:
      return state;
  }
};

export const getDashboards = () => {
  return async dispatch => {
    dispatch({
      type: "DASHBOARD_REQUEST"
    });
    try {
      const dashboards = await dashboardService.getAllDash();

      dispatch({
        type: "INIT_DASHBOARDS",
        data: dashboards
      });
    } catch (e) {
      dispatch({
        type: "DASHBOARD_REQUEST_FAIL"
      });
      dispatch({
        type: "SET_NOTIFICATION",
        content: {
          message: e.response.data.error,
          type: "danger"
        }
      });

      setTimeout(() => {
        dispatch({
          type: "CLEAR_NOTIFICATION"
        });
      }, 5000);
    }
  };
};

export const saveDashboard = dashboardObject => {
  return async dispatch => {
    dispatch({
      type: "DASHBOARD_REQUEST"
    });
    try {
      const newDash = await dashboardService.saveDash(dashboardObject);

      dispatch({
        type: "SAVE_DASHBOARD",
        data: newDash
      });
    } catch (e) {
      dispatch({
        type: "DASHBOARD_REQUEST_FAIL"
      });
      dispatch({
        type: "SET_NOTIFICATION",
        content: {
          message: e.response.data.error,
          type: "danger"
        }
      });
      setTimeout(() => {
        dispatch({
          type: "CLEAR_NOTIFICATION"
        });
      }, 5000);
    }
  };
};

export const editDashboard = () => {
  return dispatch => {
    dispatch({
      type: "EDIT_DASHBOARD"
    });
  };
};

export const updateDashboard = dashboardObject => {
  return async dispatch => {
    dispatch({
      type: "DASHBOARD_REQUEST"
    });
    try {
      const newDash = await dashboardService.updateDash(dashboardObject);

      dispatch({
        type: "UPDATE_DASHBOARD",
        data: newDash
      });
    } catch (e) {
      dispatch({
        type: "DASHBOARD_REQUEST_FAIL"
      });
      dispatch({
        type: "SET_NOTIFICATION",
        content: {
          message: e.response.data.error,
          type: "danger"
        }
      });
      setTimeout(() => {
        dispatch({
          type: "CLEAR_NOTIFICATION"
        });
      }, 5000);
    }
  };
};

export const deleteDashboard = id => {
  return async dispatch => {
    dispatch({
      type: "DASHBOARD_REQUEST"
    });
    try {
      await dashboardService.removeDash(id);

      dispatch({
        type: "DELETE_DASHBOARD",
        id
      });
    } catch (e) {
      dispatch({
        type: "DASHBOARD_REQUEST_FAIL"
      });
      dispatch({
        type: "SET_NOTIFICATION",
        content: {
          message: e.response.data.error,
          type: "danger"
        }
      });
      setTimeout(() => {
        dispatch({
          type: "CLEAR_NOTIFICATION"
        });
      }, 5000);
    }
  };
};

export default dashboardReducer;
