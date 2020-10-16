import React from "react";
import { connect } from "react-redux";
import { hideHelperMessage } from "../../reducers/notificationReducer";
import Button from "../Shared/Button";
import TickIcon from "../../styles/svg/tick.svg";

const HelperMessage = ({
  userId,
  hideHelperMessage,
  type,
  body,
  messagesRead,
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    hideHelperMessage(userId, type);
  };

  if (messagesRead.includes(type)) {
    return null;
  } else {
    return (
      <div className="r w100 p8 bg-1 bs-2">
        <div className="mt12 mb12">{body}</div>
        <Button
          extraClass={"bg-blue-1 bs-3 font-white p0"}
          // captionClass={""}
          // caption={"Okay"}
          onClick={handleClick}
          iconUrl={TickIcon}
          iconColor={"white"}
        />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    userId: state.user.data.id,
    messagesRead: state.notification.messagesRead,
  };
};

const mapDispatchToProps = {
  hideHelperMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(HelperMessage);
