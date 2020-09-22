import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { setCashflow, setModal } from "../../reducers/navigationReducer";
import {
  getDashboard,
  preSaveDashboard,
} from "../../reducers/dashboardReducer";
import CalculatorFormTooltip from "../CalculatorForms/CalculatorFormTooltip";
import {
  cumulativeChartParse,
  annualChartParse,
  tableParse,
  developerCalculation,
  developerMOCCalculation,
  fundingChartParse,
} from "../../helpers/developerDashboardHelper";
import {
  currencyFormatter,
  percentageFormatter,
  IRRCalculation,
} from "../../helpers/dashboardHelper";
import { Line, Bar } from "react-chartjs-2";
import { Table, Card, ListGroup, Button, Spinner } from "react-bootstrap";
import "../styles/Dashboard.css";

const DeveloperDashboard = ({
  dashboards,
  getDashboard,
  preSaveDashboard,
  setModal,
  cashflowTable,
  setCashflow,
}) => {
  const id = useParams().id;
  const history = useHistory();

  useEffect(() => {
    if (id && !dashboards.preSave) {
      getDashboard(id);
    }
  }, [id]);

  const handleSave = (e) => {
    e.preventDefault();
    setModal("saveDashboard");
  };

  const handleEdit = (e) => {
    e.preventDefault();
    preSaveDashboard();
    if (id) {
      history.push(`/developer/edit/${id}`);
    } else {
      history.push(`/developer/edit`);
    }
  };

  if (dashboards.isFetching || !dashboards.data[0]) {
    return (
      <div className="dashboard-spinner-container">
        <Spinner
          className="loading-spinner"
          animation="border"
          variant="primary"
        />
      </div>
    );
  } else {
    const rawData = developerCalculation(dashboards.data[0].values);
    const annualChart = annualChartParse(rawData);
    const cumulativeChart = cumulativeChartParse(rawData);
    const tableData = tableParse(rawData);
    const fundingChart = fundingChartParse(rawData);
    return (
      <section className="dashboard-section">
        <div className="dashboard-header">
          <h1>
            <b>Developer Dashboard</b>
          </h1>
          <Button
            id="dashboard-button"
            className="dashboard-save-button"
            onClick={handleSave}
            variant="primary"
          >
            Save Dashboard
          </Button>
          <Button
            id="dashboard-button"
            className="dashboard-edit-button"
            onClick={handleEdit}
            variant="outline-primary"
          >
            Edit Dashboard
          </Button>
        </div>

        <div className="dashboard-item">
          <div className="dashboard-subheader">
            <h3>Cumulative Position</h3>
            <h5>
              <i>before funding</i>
            </h5>
          </div>
          <div className="dashboard-row">
            <div className="dashboard-chart-container">
              <Line
                data={cumulativeChart.data.preFinance}
                options={cumulativeChart.options}
              />
            </div>
          </div>
          <div className="dashboard-row">
            <div className="dashboard-card-deck">
              <Card className="dashboard-card">
                <Card.Header>Total</Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    Revenue:{" "}
                    <b>
                      {currencyFormatter.format(
                        tableData.summaryCashflow[0].totalRevenue
                      )}
                    </b>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Costs:{" "}
                    <b>
                      {currencyFormatter.format(
                        tableData.summaryCashflow[0].totalCostsPreFinance
                      )}
                    </b>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Profit:{" "}
                    <b>
                      {currencyFormatter.format(
                        tableData.summaryCashflow[0].preFinanceCashflow
                      )}
                    </b>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
              <Card className="dashboard-card">
                <Card.Header>Total per Dwelling</Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    Revenue:{" "}
                    <b>
                      {currencyFormatter.format(
                        tableData.summaryCashflow[0].totalRevenue /
                          dashboards.data[0].values.dwellings
                      )}
                    </b>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Costs:{" "}
                    <b>
                      {currencyFormatter.format(
                        tableData.summaryCashflow[0].totalCostsPreFinance /
                          dashboards.data[0].values.dwellings
                      )}
                    </b>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Profit:{" "}
                    <b>
                      {currencyFormatter.format(
                        tableData.summaryCashflow[0].preFinanceCashflow /
                          dashboards.data[0].values.dwellings
                      )}
                    </b>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
              <Card className="dashboard-card">
                <Card.Header>Unlevered Metrics</Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    IRR:{" "}
                    <b>
                      {percentageFormatter.format(
                        IRRCalculation(rawData).preFinance
                      )}
                    </b>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Margin:{" "}
                    <b>
                      {percentageFormatter.format(
                        developerMOCCalculation(rawData).preFinance
                      )}
                    </b>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </div>
          </div>
        </div>
        <div className="dashboard-item">
          <div className="dashboard-subheader">
            <h3>Cumulative Position</h3>
            <h5>
              <i>after funding</i>
            </h5>
          </div>
          <div className="dashboard-row">
            <div className="dashboard-chart-container">
              <Line
                data={cumulativeChart.data.postFinance}
                options={cumulativeChart.options}
              />
            </div>
          </div>
          <div className="dashboard-row">
            <div className="dashboard-card-deck">
              <Card className="dashboard-card">
                <Card.Header>Total</Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    Revenue:{" "}
                    <b>
                      {currencyFormatter.format(
                        tableData.summaryCashflow[0].totalRevenue
                      )}
                    </b>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Costs:{" "}
                    <b>
                      {currencyFormatter.format(
                        tableData.summaryCashflow[0].totalCostsPostFinance
                      )}
                    </b>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Profit:{" "}
                    <b>
                      {currencyFormatter.format(
                        tableData.summaryCashflow[0].postFinanceCashflow
                      )}
                    </b>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
              <Card className="dashboard-card">
                <Card.Header>Total per Dwelling</Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    Revenue:{" "}
                    <b>
                      {currencyFormatter.format(
                        tableData.summaryCashflow[0].totalRevenue /
                          dashboards.data[0].values.dwellings
                      )}
                    </b>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Costs:{" "}
                    <b>
                      {currencyFormatter.format(
                        tableData.summaryCashflow[0].totalCostsPostFinance /
                          dashboards.data[0].values.dwellings
                      )}
                    </b>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Profit:{" "}
                    <b>
                      {currencyFormatter.format(
                        tableData.summaryCashflow[0].postFinanceCashflow /
                          dashboards.data[0].values.dwellings
                      )}
                    </b>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
              <Card className="dashboard-card">
                <Card.Header>Levered Metrics</Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    IRR:{" "}
                    <b>
                      {percentageFormatter.format(
                        IRRCalculation(rawData).postFinance
                      )}
                    </b>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Margin:{" "}
                    <b>
                      {percentageFormatter.format(
                        developerMOCCalculation(rawData).postFinance
                      )}
                    </b>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </div>
          </div>
        </div>
        <div className="dashboard-item">
          <div className="dashboard-subheader">
            <h3>Cumulative Funding Uses</h3>
            <h5>
              <i>debt / equity</i>
            </h5>
          </div>
          <div className="dashboard-row">
            <div className="dashboard-chart-container">
              <Line data={fundingChart.data} options={fundingChart.options} />
            </div>
          </div>
        </div>
        <div className="dashboard-item">
          <div className="dashboard-subheader">
            <h3>Annual Cashflow</h3>
            <h5>
              <i>summary cost / revenue cashflow</i>
            </h5>
          </div>
          <div className="dashboard-row">
            <div className="dashboard-chart-container">
              <Bar data={annualChart.data} options={annualChart.options} />
            </div>
          </div>
        </div>
        <div className="dashboard-item">
          <div className="dashboard-header-container">
            <div className="dashboard-subheader-container">
              <div className="dashboard-subheader">
                <h3>Cashflow Summary</h3>
                <h5>
                  <i>before funding</i>
                </h5>
              </div>
              <div className="dashboard-table-tooltip">
                <CalculatorFormTooltip
                  input={"cashflowBeforeFunding"}
                  type={"developer"}
                  placement={"right"}
                />
              </div>
            </div>
            <div className="dashboard-button-container">
              <Button
                id="dashboard-button"
                className="dashboard-table-button"
                onClick={() => setCashflow("developer", "preFinance")}
                variant="primary"
              >
                {cashflowTable.developer.preFinance ? "hide" : "show"}
              </Button>
            </div>
          </div>
          <div
            className={`dashboard-table-row
                        ${cashflowTable.developer.preFinance ? "" : "hide"}`}
          >
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Year</th>
                  <th className="dashboard-table-desktop">Acquisition Costs</th>
                  <th className="dashboard-table-desktop">
                    Total Development Costs
                  </th>
                  <th className="dashboard-table-desktop">
                    Net Operating Income
                  </th>
                  <th className="dashboard-table-desktop">Net Sale Proceeds</th>
                  <th className="dashboard-table-mobile">Total Income</th>
                  <th className="dashboard-table-mobile">Total Cost</th>
                  <th>Net Annual Cashflow</th>
                </tr>
              </thead>
              <tbody>
                {tableData.annualCashflow.map((c) => (
                  <tr key={c.year}>
                    <td>{c.year}</td>
                    <td className="dashboard-table-desktop">
                      {currencyFormatter.format(c.acquisitionCosts)}
                    </td>
                    <td className="dashboard-table-desktop">
                      {currencyFormatter.format(c.TDC)}
                    </td>
                    <td className="dashboard-table-desktop">
                      {currencyFormatter.format(c.NOI)}
                    </td>
                    <td className="dashboard-table-desktop">
                      {currencyFormatter.format(c.netSale)}
                    </td>
                    <td className="dashboard-table-mobile">
                      {currencyFormatter.format(c.totalIncome)}
                    </td>
                    <td className="dashboard-table-mobile">
                      {currencyFormatter.format(c.preFinanceTotalCost)}
                    </td>
                    <td>{currencyFormatter.format(c.preFinanceCashflow)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th>Total</th>
                  <th className="dashboard-table-desktop">
                    {currencyFormatter.format(
                      tableData.summaryCashflow[0].acquisitionCosts
                    )}
                  </th>
                  <th className="dashboard-table-desktop">
                    {currencyFormatter.format(tableData.summaryCashflow[0].TDC)}
                  </th>
                  <th className="dashboard-table-desktop">
                    {currencyFormatter.format(tableData.summaryCashflow[0].NOI)}
                  </th>
                  <th className="dashboard-table-desktop">
                    {currencyFormatter.format(
                      tableData.summaryCashflow[0].netSale
                    )}
                  </th>
                  <th className="dashboard-table-mobile">
                    {currencyFormatter.format(
                      tableData.summaryCashflow[0].totalIncome
                    )}
                  </th>
                  <th className="dashboard-table-mobile">
                    {currencyFormatter.format(
                      tableData.summaryCashflow[0].preFinanceTotalCost
                    )}
                  </th>
                  <th>
                    {currencyFormatter.format(
                      tableData.summaryCashflow[0].preFinanceCashflow
                    )}
                  </th>
                </tr>
              </tfoot>
            </Table>
          </div>
        </div>

        <div className="dashboard-item">
          <div className="dashboard-header-container">
            <div className="dashboard-subheader-container">
              <div className="dashboard-subheader">
                <h3>Cashflow Summary</h3>
                <h5>
                  <i>after funding</i>
                </h5>
              </div>
              <div className="dashboard-table-tooltip">
                <CalculatorFormTooltip
                  input={"cashflowAfterFunding"}
                  type={"developer"}
                  placement={"right"}
                />
              </div>
            </div>
            <div className="dashboard-button-container">
              <Button
                id="dashboard-button"
                className="dashboard-table-button"
                onClick={() => setCashflow("developer", "postFinance")}
                variant="primary"
              >
                {cashflowTable.developer.postFinance ? "hide" : "show"}
              </Button>
            </div>
          </div>
          <div
            className={`dashboard-table-row
                        ${cashflowTable.developer.postFinance ? "" : "hide"}`}
          >
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Year</th>
                  <th className="dashboard-table-desktop">Acquisition Costs</th>
                  <th className="dashboard-table-desktop">
                    Total Development Costs
                  </th>
                  <th className="dashboard-table-desktop">
                    Net Operating Income
                  </th>
                  <th className="dashboard-table-desktop">Net Sale Proceeds</th>
                  <th className="dashboard-table-desktop">Funding Costs</th>
                  <th className="dashboard-table-mobile">Total Income</th>
                  <th className="dashboard-table-mobile">Total Costs</th>
                  <th className="dashboard-table-xs-mobile">Debt Source</th>
                  <th>Net Annual Cashflow</th>
                </tr>
              </thead>
              <tbody>
                {tableData.annualCashflow.map((c) => (
                  <tr key={c.year}>
                    <td>{c.year}</td>
                    <td className="dashboard-table-desktop">
                      {currencyFormatter.format(c.acquisitionCosts)}
                    </td>
                    <td className="dashboard-table-desktop">
                      {currencyFormatter.format(c.TDC)}
                    </td>
                    <td className="dashboard-table-desktop">
                      {currencyFormatter.format(c.NOI)}
                    </td>
                    <td className="dashboard-table-desktop">
                      {currencyFormatter.format(c.netSale)}
                    </td>
                    <td className="dashboard-table-desktop">
                      {currencyFormatter.format(c.loanCosts)}
                    </td>
                    <td className="dashboard-table-mobile">
                      {currencyFormatter.format(c.totalIncome)}
                    </td>
                    <td className="dashboard-table-mobile">
                      {currencyFormatter.format(c.postFinanceTotalCost)}
                    </td>
                    <td className="dashboard-table-xs-mobile">
                      {currencyFormatter.format(c.debtSource)}
                    </td>
                    <td>{currencyFormatter.format(c.postFinanceCashflow)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th>Total</th>
                  <th className="dashboard-table-desktop">
                    {currencyFormatter.format(
                      tableData.summaryCashflow[0].acquisitionCosts
                    )}
                  </th>
                  <th className="dashboard-table-desktop">
                    {currencyFormatter.format(tableData.summaryCashflow[0].TDC)}
                  </th>
                  <th className="dashboard-table-desktop">
                    {currencyFormatter.format(tableData.summaryCashflow[0].NOI)}
                  </th>
                  <th className="dashboard-table-desktop">
                    {currencyFormatter.format(
                      tableData.summaryCashflow[0].netSale
                    )}
                  </th>
                  <th className="dashboard-table-desktop">
                    {currencyFormatter.format(
                      tableData.summaryCashflow[0].loanCosts
                    )}
                  </th>
                  <th className="dashboard-table-mobile">
                    {currencyFormatter.format(
                      tableData.summaryCashflow[0].totalIncome
                    )}
                  </th>
                  <th className="dashboard-table-mobile">
                    {currencyFormatter.format(
                      tableData.summaryCashflow[0].postFinanceTotalCost
                    )}
                  </th>
                  <th className="dashboard-table-xs-mobile">
                    {currencyFormatter.format(
                      tableData.summaryCashflow[0].debtSource
                    )}
                  </th>
                  <th>
                    {currencyFormatter.format(
                      tableData.summaryCashflow[0].postFinanceCashflow
                    )}
                  </th>
                </tr>
              </tfoot>
            </Table>
          </div>
        </div>
      </section>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    dashboards: state.dashboards,
    cashflowTable: state.navigation.cashflowTable,
    user: state.user,
  };
};

const mapDispatchToProps = {
  setCashflow,
  setModal,
  getDashboard,
  preSaveDashboard,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeveloperDashboard);
