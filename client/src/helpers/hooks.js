import React, { useRef, useEffect } from "react";
import store from "../store";

const useOutsideAlerter = ref => {
  const handleClickOutside = e => {
    const { navigation } = store.getState();
    if (
      ref.current &&
      !ref.current.contains(e.target) &&
      navigation.dropdown.username
    ) {
      store.dispatch({
        type: "SET_DROPDOWN",
        dropdownType: "username"
      });
    }
  };

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
};

export const OutsideAlerter = props => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return <div ref={wrapperRef}>{props.children}</div>;
};
