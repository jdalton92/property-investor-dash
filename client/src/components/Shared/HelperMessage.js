import React from "react";
import { connect } from "react-redux";
import { readHelperMessage } from "../../reducers/usersReducer";
import Icon from "./Icon";
import Button from "./Button";

const HelperMessage = ({
  user,
  readHelperMessage,
  type,
  body,
  messagesRead,
}) => {
  const handleClick = () => {
    readHelperMessage(user, type);
  };

  if (messagesRead && messagesRead.includes(type)) {
    return null;
  } else {
    return (
      <div className="shadow-xl rounded-2xl p-4 bg-indigo-200 border-2 border-indigo-400">
        <div className="flex flex-row">
          <div>
            <Icon className={"text-gray-600 w-10 h-10"} icon={"message"} />
          </div>
          <div className="ml-8">
            <p className="mb-4">{body}</p>
            <Button
              label={"Okay"}
              type={"button"}
              options={{
                styleType: "primary",
                buttonClass: "flex justify-center h-10 px-2 w-full md:w-24",
                icon: "tick",
                iconClass: "h-8 w-8 mr-2",
                onClick: () => handleClick(),
              }}
            />
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
