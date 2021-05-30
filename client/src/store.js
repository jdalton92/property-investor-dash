import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

//Reducers
import usersReducer from "./reducers/usersReducer";
import notificationReducer from "./reducers/notificationReducer";
import dashboardsReducer from "./reducers/dashboardsReducer";
import navigationReducer from "./reducers/navigationReducer";
import contactReducer from "./reducers/contactReducer";
import cashflowsReducer from "./reducers/cashflowsReducer";

const reducer = combineReducers({
  users: usersReducer,
  notifications: notificationReducer,
  dashboards: dashboardsReducer,
  cashflows: cashflowsReducer,
  navigation: navigationReducer,
  contact: contactReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
