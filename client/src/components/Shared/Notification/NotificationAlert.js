import React from "react";
import { connect } from "react-redux";
import { clearNotification } from "../../../reducers/notificationReducer";
import Icon from "../Icon";
import { CONSTANTS } from "../../../static/constants";
import CloseIcon from "../../../styles/svg/close.svg";

const NotificationAlert = ({ notification, clearNotification, key }) => {
  const handleCloseNotification = (e) => {
    e.preventDefault();
    clearNotification(notification.id);
  };

  let notificationType = notification.type.toLowerCase();
  let typeClass;
  let icon;
  switch (notification.type) {
    case CONSTANTS.NOTIFICATION.INFO:
      icon = "message";
      typeClass = "text-gray-500";
      break;
    case CONSTANTS.NOTIFICATION.SUCCESS:
      icon = "tick";
      typeClass = "text-green-500";
      break;
    case CONSTANTS.NOTIFICATION.ERROR:
      icon = "error";
      typeClass = "text-red-500";
      break;
    default:
      notificationType = "info";
      icon = "message";
      typeClass = "text-gray-500";
  }

  const toTitleCase = (string) => {
    return string.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  return (
    <div
      key={key}
      className="flex items-center rounded-lg shadow-2xl p-1 md:my-1 md:mr-1
      bg-opacity-70 bg-gray-800"
    >
      <Icon icon={icon} className={`${typeClass} w-6 h-6 mx-2`} />
      <div className="flex flex-col flex-1">
        <h3 className={`text-md font-medium ${typeClass}`}>
          {toTitleCase(notificationType)}
        </h3>
        <span className="text-sm text-white">{notification.message}</span>
      </div>
      <button
        type="button"
        className="bg-opacity-50 rounded-lg mr-1 transition ease-in
        duration-100 focus:ring-2 focus:ring-offset-2 hover:bg-opacity-90
        hover:bg-gray-400 hover:text-indigo-100 "
        onClick={handleCloseNotification}
      >
        <Icon icon="close" className="h-8 w-8" />
      </button>
    </div>
  );
};

const mapDispatchToProps = {
  clearNotification,
};

export default connect(null, mapDispatchToProps)(NotificationAlert);
