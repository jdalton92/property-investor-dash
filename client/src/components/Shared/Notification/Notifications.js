import React from "react";
import { connect } from "react-redux";
import NotificationAlert from "./NotificationAlert";

const Notifications = ({ notification }) => {
  if (notification.length > 0) {
    return (
      <div className="notifications mr8 flex-col">
        {notification.map((n) => {
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
    notification: state.notification,
  };
};

export default connect(mapStateToProps, null)(Notifications);
