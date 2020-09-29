import React from "react";
import { connect } from "react-redux";
import { clearNotification } from "../../../reducers/notificationReducer";
import Button from "../Button";
import { Icon } from "../Icon";
import { CONSTANTS } from "../../../static/constants";
import MessageIcon from "../../../styles/svg/message.svg";
import TickIcon from "../../../styles/svg/tick.svg";
import ErrorIcon from "../../../styles/svg/error.svg";
import CloseIcon from "../../../styles/svg/close.svg";

const NotificationAlert = ({ notification, clearNotification }) => {
  const handleCloseNotification = (e) => {
    e.preventDefault();
    clearNotification(notification.id);
  };

  let notificationType;
  let iconUrl;
  switch (notification.type) {
    case CONSTANTS.NOTIFICATION.MESSAGE:
      notificationType = "message";
      iconUrl = MessageIcon;
      break;
    case CONSTANTS.NOTIFICATION.SUCCESS:
      notificationType = "success";
      iconUrl = TickIcon;
      break;
    case CONSTANTS.NOTIFICATION.ERROR:
      notificationType = "error";
      iconUrl = ErrorIcon;
      break;
    default:
      notificationType = "message";
      iconUrl = MessageIcon;
  }

  const toTitleCase = (string) => {
    return string.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  return (
    <div className="notification p8 ml8 mr8 mb8 fade-in flex-row align-c relative bs-2 jump r bs-3">
      <Icon url={iconUrl} color={"white"} hover={false} active={false} />
      <div className="w100 ml8">
        <span className={`${notificationType} bold`}>
          {toTitleCase(notificationType)}:
        </span>
        <span className="font-white pl4">
          {typeof notification.message === "string"
            ? ` ${notification.message}`
            : ` ${notification.statusText}`}
        </span>
      </div>
      <Button
        ariaLabel={"Close"}
        dataBalloonPos={"left"}
        extraClass={"button-transp-p align-c justify-c"}
        onClick={handleCloseNotification}
        iconUrl={CloseIcon}
        iconColor={"white"}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return;
};

const mapDispatchToProps = {
  clearNotification,
};

export default connect(null, mapDispatchToProps)(NotificationAlert);