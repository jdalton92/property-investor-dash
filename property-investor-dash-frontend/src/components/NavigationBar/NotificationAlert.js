import React, { useState } from "react";
import { connect } from "react-redux";
import { Alert } from "react-bootstrap";
import "../styles/Notification.css";

const NotificationAlert = props => {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert
        id="notification-alert"
        variant={props.notification.type === "success" ? "success" : "danger"}
        onClose={() => setShow(false)}
        dismissible
      >
        <Alert.Heading>
          {props.notification.type === "success" ? "Success" : "Error"}
        </Alert.Heading>
        <p>
          {typeof props.notification.message === "string"
            ? props.notification.message
            : props.notification.statusText}
        </p>
      </Alert>
    );
  }
  return null;
};

export default connect(null, null)(NotificationAlert);
