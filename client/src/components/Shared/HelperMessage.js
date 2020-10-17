import React from "react";
import { connect } from "react-redux";
import { hideHelperMessage } from "../../reducers/notificationReducer";
import { Icon } from "./Icon";
import Button from "../Shared/Button";
import TickIcon from "../../styles/svg/tick.svg";
import MessageIcon from "../../styles/svg/message.svg";

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
      <div className="r w100 p20 bg-1 bs-2">
        <div className="flex-row align-c mb20">
          <Icon
            url={MessageIcon}
            color={"black"}
            hover={false}
            active={false}
          />
          <span className="ml20">{body}</span>
        </div>
        <Button
          extraClass={"form-button-p bs-3 font-white r"}
          // captionClass={"mt8"}
          caption={"Okay"}
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
