import { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  setLeftSidebar,
  setRightSidebar,
} from "../../reducers/navigationReducer";

const ScrollToTopControlller = (props) => {
  const { pathname } = useLocation();

  useEffect(() => {
    setLeftSidebar(false);
    setRightSidebar(false);
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } catch (e) {
      window.scrollTo(0, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Renders nothing, since nothing is needed
  return null;
};

const mapDispatchToProps = {
  setLeftSidebar,
  setRightSidebar,
};

export default connect(null, mapDispatchToProps)(ScrollToTopControlller);