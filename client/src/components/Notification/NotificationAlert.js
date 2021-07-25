import React from "react";
import { connect } from "react-redux";
import { clearNotification } from "../../reducers/notificationReducer";
import Icon from "../Shared/Icon";
import Button from "../Shared/Button";
import { CONSTANTS } from "../../constants/constants";

const NotificationAlert = ({ notification, clearNotification, key }) => {
  const handleCloseNotification = () => {
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
      <Button
        options={{
          styleType: "secondary-transparent",
          buttonClass: "w-8 h-8",
          icon: "close",
          iconClass: "h-8 w-8 font-white",
          onClick: () => handleCloseNotification(),
        }}
      />
    </div>
  );
};

const mapDispatchToProps = {
  clearNotification,
};

export default connect(null, mapDispatchToProps)(NotificationAlert);
