import React from "react";
import { connect } from "react-redux";
import NotificationAlert from "./NotificationAlert";
import "../styles/Notification.css";

const Notification = props => {
  if (props.notification.length > 0) {
    return (
      <section className="notification-section">
        {props.notification.map((n, i) => (
          <NotificationAlert notification={n} key={i} />
        ))}
      </section>
    );
  } else {
    return null;
  }
};

const mapStateToProps = state => {
  return {
    notification: state.notification
  };
};

export default connect(mapStateToProps, null)(Notification);
