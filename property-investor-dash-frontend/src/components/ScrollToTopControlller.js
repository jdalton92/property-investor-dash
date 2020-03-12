import { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { setSidebar } from "../reducers/navigationReducer";

const ScrollToTopControlller = props => {
  const history = useHistory();
  const pathname = history.location.pathname;
  useEffect(() => {
    props.setSidebar(false);
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
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
  setSidebar
};

export default connect(null, mapDispatchToProps)(ScrollToTopControlller);
