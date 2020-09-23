import React, { useState } from "react";
import { connect } from "react-redux";
import { Alert } from "react-bootstrap";

const NotificationAlert = ({ notification }) => {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert
        id="notification-alert"
        variant={notification.type === "success" ? "success" : "danger"}
        onClose={() => setShow(false)}
        dismissible
      >
        <Alert.Heading>
          {notification.type === "success" ? "Success" : "Error"}
        </Alert.Heading>
        <p>
          {typeof notification.message === "string"
            ? notification.message
            : notification.statusText}
        </p>
      </Alert>
    );
  }
  return null;
};

export default connect(null, null)(NotificationAlert);
