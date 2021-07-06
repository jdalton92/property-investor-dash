import React from "react";
import Icon from "./Icon";

const Loader = () => (
  <div className="w-full h-screen flex items-center justify-center">
    <Icon icon={"loader"} className="w-12 h-12 text-gray-500" />
  </div>
);

export default Loader;
