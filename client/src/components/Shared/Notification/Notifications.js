import React from "react";
import { connect } from "react-redux";
import NotificationAlert from "./NotificationAlert";

const Notifications = ({ notifications }) => {
  if (notifications.length > 0) {
    return (
      <div className="absolute bottom-0 right-0 z-50 w-full md:w-350px">
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
    notifications: state.notifications,
  };
};

export default connect(mapStateToProps, null)(Notifications);
