import { useEffect } from "react";
import { withRouter, useLocation } from "react-router-dom";
import ReactGA from "react-ga";

const AnalyticsController = () => {
  ReactGA.initialize("UA-158975814-1");

  const { pathname, search } = useLocation();
  useEffect(() => {
    ReactGA.set({ page: pathname });
    ReactGA.pageview(pathname + search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, search]);

  return null;
};

export default withRouter(AnalyticsController);
