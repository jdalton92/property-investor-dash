import React from "react";
import { connect } from "react-redux";
import { hideHelperMessage } from "../../reducers/notificationReducer";
import { Icon } from "./Icon";
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
      <div className="helper-message r w100 p20 bg-1 bs-2">
        <div className="flex-row align-c">
          <Icon
            url={MessageIcon}
            color={"black"}
            hover={false}
            active={false}
          />
          <div className="ml20">
            <p>{body}</p>
            <button
              type="submit"
              className="form-button-p bs-3 font-white mt20 pt4 pb4 flex-row align-c justify-c"
              onClick={handleClick}
            >
              <Icon
                size={"20px"}
                url={TickIcon}
                color={"white"}
                hover={false}
                active={false}
              />
              <span className="ml8">Okay</span>
            </button>
          </div>
        </div>
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
