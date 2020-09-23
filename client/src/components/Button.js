import React from "react";

const Button = ({ icon, content, onClick }) => {
  return (
    <button class="button" onClick={onClick}>
      <span>{icon}</span>
      <span>{content}</span>
    </button>
  );
};

export default Button;
