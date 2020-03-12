import contactService from "../services/contact";

const initialState = {};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MESSAGE":
      return action.data;
    default:
      return state;
  }
};

export const setMessage = values => {
  return async dispatch => {
    try {
      const response = await contactService.sendEmail(values);
      dispatch({
        type: "SET_NOTIFICATION",
        content: {
          message: response.message,
          type: "success"
        }
      });
      setTimeout(() => {
        dispatch({
          type: "CLEAR_NOTIFICATION"
        });
      }, 10000);
    } catch (e) {
      dispatch({
        type: "SET_NOTIFICATION",
        content: {
          message: e.response,
          type: "danger"
        }
      });
      setTimeout(() => {
        dispatch({
          type: "CLEAR_NOTIFICATION"
        });
      }, 10000);
    }
  };
};

export default contactReducer;
