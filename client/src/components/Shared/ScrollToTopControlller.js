import { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { setLeftSidebar, setDropdown } from "../../reducers/navigationReducer";
import { CONSTANTS } from "../../static/constants";

const ScrollToTopControlller = ({ setLeftSidebar, setDropdown }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    setLeftSidebar(false);
    setDropdown(CONSTANTS.DROPDOWNS.USERNAME, false);
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

  return null;
};

const mapDispatchToProps = {
  setLeftSidebar,
  setDropdown,
};

export default connect(null, mapDispatchToProps)(ScrollToTopControlller);
