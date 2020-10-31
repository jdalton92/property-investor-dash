import React from "react";
import ChangeEmail from "./Settings.ChangeEmail";
import ChangePassword from "./Settings.ChangePassword";
import DeleteAccount from "./Settings.DeleteAccount";

const Settings = () => {
  return (
    <>
      <h1 className="f24 bold mt16 mb16">Settings</h1>
      <ChangeEmail />
      <ChangePassword />
      <DeleteAccount />
    </>
  );
};

export default Settings;
