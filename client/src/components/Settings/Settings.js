import React from "react";
import ChangeEmail from "./Settings.ChangeEmail";
import ChangePassword from "./Settings.ChangePassword";
import DeleteAccount from "./Settings.DeleteAccount";

const Settings = () => {
  return (
    <>
      <h1 className="my-2 text-xl font-semibold">Settings</h1>
      <ChangeEmail />
      <ChangePassword />
      <DeleteAccount />
    </>
  );
};

export default Settings;
