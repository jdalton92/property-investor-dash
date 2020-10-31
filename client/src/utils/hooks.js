import React, { useRef, useEffect } from "react";
import { CONSTANTS } from "../static/constants";
import store from "../store";

const useDropdownOutsideAlerter = (ref) => {
  const handleClickOutside = (e) => {
    const { navigation } = store.getState();
    if (
      ref.current &&
      !ref.current.contains(e.target) &&
      navigation.dropdown[CONSTANTS.DROPDOWNS.USERNAME]
    ) {
      store.dispatch({
        type: "SET_DROPDOWN",
        payLoad: {
          dropdown: CONSTANTS.DROPDOWNS.USERNAME,
          status: false,
          overlay: false,
        },
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

const useOverlayOutsideAlerter = (ref) => {
  const handleClickOutside = (e) => {
    if (ref.current && ref.current.contains(e.target)) {
      store.dispatch({
        type: "SET_RIGHT_SIDEBAR",
        status: false,
      });
      store.dispatch({
        type: "SET_LEFT_SIDEBAR",
        status: false,
      });
      store.dispatch({
        type: "SET_MODAL",
        payLoad: {
          modalType: CONSTANTS.MODALS.SAVEDASHBOARD,
          status: false,
        },
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

export const DropdownOutsideAlerter = (props) => {
  const wrapperRef = useRef(null);
  useDropdownOutsideAlerter(wrapperRef);

  return <div ref={wrapperRef}>{props.children}</div>;
};

export const OverlayOutsideAlerter = (props) => {
  const wrapperRef = useRef(null);
  useOverlayOutsideAlerter(wrapperRef);

  return <div ref={wrapperRef}>{props.children}</div>;
};
