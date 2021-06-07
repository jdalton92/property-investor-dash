import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { CONSTANTS } from "../../static/constants";
import { setDropdown, setTab } from "../../reducers/navigationReducer";
import { logoutUser } from "../../reducers/usersReducer";
import Button from "../Shared/Button";

const UserDropdown = ({
  setDropdown,
  logoutUser,
  isAuthedUser,
  email,
  setTab,
}) => {
  const history = useHistory();

  const handleLink = (route) => {
    setDropdown(CONSTANTS.DROPDOWNS.USERNAME, false);
    history.push(route);
  };

  const handleLogout = () => {
    logoutUser();
    handleLink("/");
  };

  return (
    <div
      className="absolute top-14 right-0 flex flex-col shadow-xl rounded-2xl
      p-4 w-full md:w-60 bg-gray-200"
    >
      {isAuthedUser && (
        <>
          <span className="truncate font-semibold mb-2">{email}</span>
          <Button
            label={"Saved Dashboards"}
            options={{
              styleType: "secondary-transparent",
              buttonClass: "w-full h-10 pl-2",
              labelClass: "ml-1",
              icon: "dashboard",
              iconClass: "h-8 w-8",
              onClick: () => handleLink("/saved-dashboards"),
            }}
          />
          <Button
            label={"Account Settings"}
            options={{
              styleType: "secondary-transparent",
              buttonClass: "w-full h-10 pl-2",
              labelClass: "ml-1",
              icon: "settings",
              iconClass: "h-8 w-8",
              onClick: () => handleLink("/settings"),
            }}
          />
          <Button
            label={"Logout"}
            options={{
              styleType: "secondary-transparent",
              buttonClass: "w-full h-10 pl-2",
              labelClass: "ml-1",
              icon: "logout",
              iconClass: "h-8 w-8",
              onClick: () => handleLogout(),
            }}
          />
        </>
      )}
      {!isAuthedUser && (
        <>
          <Button
            label={"Login"}
            options={{
              styleType: "secondary-transparent",
              buttonClass: "w-full h-10 pl-2",
              labelClass: "ml-1",
              icon: "logout",
              iconClass: "h-8 w-8",
              onClick: () => handleLink("/login"),
            }}
          />
          <Button
            label={"Create Account"}
            options={{
              styleType: "secondary-transparent",
              buttonClass: "w-full h-10 pl-2",
              labelClass: "ml-1",
              icon: "create-user",
              iconClass: "h-8 w-8",
              onClick: () => handleLink("/sign-up"),
            }}
          />
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthedUser: !!state.users.data?._id,
    email: state.users.data?.email,
  };
};

const mapDispatchToProps = {
  logoutUser,
  setDropdown,
  setTab,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDropdown);
