import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

const PageTitleController = () => {
  const { pathname } = useLocation();
  const [title, setTitle] = useState("");
  useEffect(() => {
    parseLoction(pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const parseLoction = (pathname) => {
    switch (pathname) {
      case "/login":
        setTitle("Login");
        break;
      case "/":
        setTitle("Home");
        break;
      case "/settings":
        setTitle("Settings");
        break;
      case "/calculator-types":
        setTitle("Calculator Types");
        break;
      case "/saved-dashboards":
        setTitle("Saved Dashboards");
        break;
      case "/blog":
        setTitle("Blog");
        break;
      case "/terms-and-conditions":
        setTitle("Terms and Conditions");
        break;
      case "/privacy-policy":
        setTitle("Privacy Policy");
        break;
      case "/contact":
        setTitle("Contact");
        break;
      case "/404":
        setTitle("Not Found");
        break;
      case (pathname.match(/\/dashboard.*/) || {}).input:
        setTitle("Dashboard");
        break;
      case (pathname.match(/\/owner-occupier.*/) || {}).input:
        setTitle("Owner-Occupier Inputs");
        break;
      case (pathname.match(/\/investor.*/) || {}).input:
        setTitle("Investor Inputs");
        break;
      case (pathname.match(/\/developer.*/) || {}).input:
        setTitle("Developer Inputs");
        break;
      default:
        setTitle("");
    }
  };

  return (
    <Helmet>
      <title>{`PropertyInvestorDash${title ? ` | ${title}` : ""}`}</title>
    </Helmet>
  );
};

export default PageTitleController;
