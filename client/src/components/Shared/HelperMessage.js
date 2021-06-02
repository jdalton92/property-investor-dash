import React from "react";
import { connect } from "react-redux";
import { readHelperMessage } from "../../reducers/usersReducer";
import { Icon } from "./Icon";
import MessageIcon from "../../styles/svg/message.svg";

const HelperMessage = ({
  user,
  readHelperMessage,
  type,
  body,
  messagesRead,
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    readHelperMessage(user, type);
  };

  if (messagesRead && messagesRead.includes(type)) {
    return null;
  } else {
    return (
      <div className="helper-message r w100 p20 bg-1 bs-2">
        <div className="flex-row align-c">
          <Icon
            url={MessageIcon}
            color={"#51535c"}
            hover={false}
            active={false}
          />
          <div className="ml20">
            <p className="f16">{body}</p>
            <button
              type="button"
              className="form-button-p bs-3 font-white mt20 pt4 pb4 flex-row align-c justify-c"
              onClick={handleClick}
            >
              <span>Okay</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.users.data,
    messagesRead: state.users.data?.messagesRead,
  };
};

const mapDispatchToProps = {
  readHelperMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(HelperMessage);
