import { useEffect } from "react";
import { withRouter } from "react-router-dom";
import ReactGA from "react-ga";

const AnalyticsController = () => {
  if (process.env.NODE_ENV === "production") {
    ReactGA.initialize("UA-158975814-1");
  }
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      ReactGA.set({ page: window.location.pathname });
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);

  return null;
};

export default withRouter(AnalyticsController);
