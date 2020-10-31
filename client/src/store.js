import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

//Reducers
import userReducer from "./reducers/userReducer";
import notificationReducer from "./reducers/notificationReducer";
import dashboardReducer from "./reducers/dashboardReducer";
import navigationReducer from "./reducers/navigationReducer";
import contactReducer from "./reducers/contactReducer";

const reducer = combineReducers({
  user: userReducer,
  notification: notificationReducer,
  dashboards: dashboardReducer,
  navigation: navigationReducer,
  contact: contactReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
