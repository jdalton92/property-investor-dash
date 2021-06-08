import contactService from "../services/contact";
import { successNotification, errorNotification } from "./notificationReducer";

const initialState = { isFetching: false };

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEND_REQUEST":
      return { isFetching: true };
    case "END_REQUEST":
      return { isFetching: false };
    default:
      return state;
  }
};

export const sendMessage = (values) => {
  return async (dispatch) => {
    dispatch({
      type: "SEND_REQUEST",
    });
    try {
      const response = await contactService.sendEmail(values);
      dispatch({
        type: "END_REQUEST",
      });
      dispatch(successNotification(response.message));
    } catch (e) {
      console.log(e);
      dispatch({
        type: "END_REQUEST",
      });
      dispatch(errorNotification(e.response.data.message));
    }
  };
};

export default contactReducer;
