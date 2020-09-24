import React from "react";

const Button = ({ icon, caption, onClick }) => {
  return (
    <button class="button-p r pt8 pb8 pl4 pr4" onClick={onClick}>
      <span>{icon}</span>
      <span>{caption}</span>
    </button>
  );
};

export default Button;
