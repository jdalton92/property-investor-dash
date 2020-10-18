import contactService from "../services/contact";

const initialState = { isFetching: false };

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CONTACT_REQUEST":
      return { isFetching: true };
    case "MESSAGE_SENT":
      return { isFetching: false };
    default:
      return state;
  }
};

export const setMessage = (values) => {
  return async (dispatch) => {
    dispatch({
      type: "CONTACT_REQUEST",
    });
    try {
      const response = await contactService.sendEmail(values);
      dispatch({
        type: "MESSAGE_SENT",
      });
      dispatch({
        type: "SET_NOTIFICATION",
        content: {
          message: response.message,
          type: "success",
        },
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: "MESSAGE_SENT",
      });
      dispatch({
        type: "SET_NOTIFICATION",
        content: {
          message: e.response.data.error,
          type: "danger",
        },
      });
    }
  };
};

export default contactReducer;
