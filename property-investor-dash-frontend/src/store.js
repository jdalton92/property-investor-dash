import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

//Reducers
import userReducer from "./reducers/userReducer";
import notificationReducer from "./reducers/notificationReducer";
import formReducer from "./reducers/formReducer";
import dashboardReducer from "./reducers/dashboardReducer";
import navigationReducer from "./reducers/navigationReducer";

const reducer = combineReducers({
  user: userReducer,
  notification: notificationReducer,
  values: formReducer,
  dashboards: dashboardReducer,
  navigation: navigationReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
