import React from "react";
import { connect } from "react-redux";
import NotificationAlert from "./NotificationAlert";

const Notifications = ({ notifications }) => {
  if (notifications.length > 0) {
    return (
      <div className="notifications flex-col">
        {notifications.map((n) => {
          return <NotificationAlert notification={n} key={n.id} />;
        })}
      </div>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state) => {
  return {
    notifications: state.notification.notifications,
  };
};

export default connect(mapStateToProps, null)(Notifications);
