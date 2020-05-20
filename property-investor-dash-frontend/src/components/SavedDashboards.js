import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { getDashboards, deleteDashboard } from "../reducers/dashboardReducer";
import { setDashboard } from "../reducers/formReducer";
import { dashboardType, formatDate } from "../helpers/dashboardHelper";
import { setNotification } from "../reducers/notificationReducer";
import { Table, Button, Spinner } from "react-bootstrap";
import "./styles/SavedDashboards.css";

const SavedDashboards = (props) => {
  useEffect(() => {
    props.getDashboards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const history = useHistory();

  const handleView = async (dashboard) => {
    await props.setDashboard(dashboard);
    if (dashboard.values.type === "developer") {
      history.push("/developer/dashboard");
    } else if (
      dashboard.values.type === "occupierInvestor" &&
      dashboard.values.investor
    ) {
      history.push("/investor/dashboard");
    } else if (
      dashboard.values.type === "occupierInvestor" &&
      !dashboard.values.investor
    ) {
      history.push("/owner-occupier/dashboard");
    }
  };

  const handleDelete = async (dashboard) => {
    if (window.confirm(`Delete dashboard ${dashboard.description}?`)) {
      await props.deleteDashboard(dashboard._id);
      props.setNotification(`${dashboard.description} deleted`, "success");
    }
  };

  return (
    <section className="saved-dashboard-section">
      <div className="saved-dashboard-container">
        <div className="saved-dashboard-header">
          <h1>
            <b>Saved Dashboards</b>
          </h1>
        </div>
        <div className="saved-dashboard-table-container">
          {props.dashboards.isFetching ? (
            <div className="saved-dashboards-loader-wrapper">
              <Spinner
                className="loading-spinner"
                animation="border"
                variant="primary"
              />
            </div>
          ) : props.dashboards.data.length === 0 ? (
            <h2 className="saved-dashboard-subheader">No saved Dashboards</h2>
          ) : (
            <Table
              striped
              bordered
              hover
              size="sm"
              className="saved-dashboard-table"
            >
              <thead>
                <tr>
                  <th className="saved-dashboard-mobile">#</th>
                  <th>Description</th>
                  <th className="saved-dashboard-xs-mobile">Address</th>
                  <th className="saved-dashboard-mobile">Dashboard Type</th>
                  <th className="saved-dashboard-mobile">Saved Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {props.dashboards.data.map((d, i) => (
                  <tr className="saved-dashboard-row" key={d._id}>
                    <td className="saved-dashboard-mobile">{i + 1}</td>
                    <td>{d.description}</td>
                    <td className="saved-dashboard-xs-mobile">{d.address}</td>
                    <td className="saved-dashboard-mobile">
                      {dashboardType(d.values)}
                    </td>
                    <td className="saved-dashboard-mobile">
                      {formatDate(d.date)}
                    </td>
                    <td>
                      <div className="saved-dashboard-button-container">
                        <Button
                          variant="primary"
                          type="button"
                          className="saved-dashboard-button view-dashboard"
                          id="dashboard-view"
                          onClick={() => handleView(d)}
                        >
                          View
                        </Button>
                        <Button
                          variant="outline-primary"
                          type="button"
                          className="saved-dashboard-button delete-dashboard"
                          id="dashboard-delete"
                          onClick={() => handleDelete(d)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    dashboards: state.dashboards,
    values: state.values,
    user: state.user,
  };
};

const mapDispatchToProps = {
  getDashboards,
  deleteDashboard,
  setDashboard,
  setNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedDashboards);
