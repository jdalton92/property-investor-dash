import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import CalculatorFormTooltip from "../CalculatorForms/CalculatorFormTooltip";
import { editDashboard } from "../../reducers/dashboardReducer";
import { setCashflow, setModal } from "../../reducers/navigationReducer";
import {
  cumulativeChartParse,
  tableParse,
  occupierInvestorCalculation,
  cardParse,
  occupierInvestorMOCCalculation,
} from "../../helpers/occupierInvestorDashboardHelper";
import {
  currencyFormatter,
  percentageFormatter,
  IRRCalculation,
} from "../../helpers/dashboardHelper";
import { Line } from "react-chartjs-2";
import { Table, Card, ListGroup, Button } from "react-bootstrap";
import "../styles/Dashboard.css";

const OccupierInvestorDashboard = (props) => {
  const history = useHistory();
  const rawData = occupierInvestorCalculation(props.values.values);
  const chartData = cumulativeChartParse(rawData);
  const tableData = tableParse(rawData);
  const cardData = cardParse(rawData);

  const handleSave = (e) => {
    e.preventDefault();
    props.setModal("saveDashboard");
  };

  const handleEdit = (e) => {
    e.preventDefault();
    props.editDashboard();
    if (props.values.values.investor) {
      history.replace("/investor");
    } else {
      history.replace("/owner-occupier");
    }
  };

  const occupier = history.location.pathname.includes("occupier");
  const userType = occupier ? "ownerOccupier" : "investor";

  return (
    <section className="dashboard-section">
      <div className="dashboard-header">
        <h1>
          <b>{occupier ? "Owner-Occupier" : "Investor"} Dashboard</b>
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
            <i>after funding</i>
          </h5>
        </div>
        <div className="dashboard-row">
          <div className="dashboard-chart-container">
            <Line data={chartData.data} options={chartData.options} />
          </div>
        </div>
        <div className="dashboard-row">
          <div className="dashboard-card-deck">
            <Card className="dashboard-card">
              <Card.Header>Total</Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  Rental Income:{" "}
                  <b>{currencyFormatter.format(cardData.rentalIncome)}</b>
                </ListGroup.Item>
                <ListGroup.Item>
                  Loan Interest:{" "}
                  <b>{currencyFormatter.format(cardData.mortgageInterest)}</b>
                </ListGroup.Item>
                <ListGroup.Item>
                  Profit: <b>{currencyFormatter.format(cardData.profit)}</b>
                </ListGroup.Item>
              </ListGroup>
            </Card>
            <Card className="dashboard-card">
              <Card.Header>Average per Month</Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  Rental Income:{" "}
                  <b>
                    {currencyFormatter.format(
                      cardData.rentalIncome / cardData.months
                    )}
                  </b>
                </ListGroup.Item>
                <ListGroup.Item>
                  Operating Costs:{" "}
                  <b>
                    {currencyFormatter.format(cardData.opex / cardData.months)}
                  </b>
                </ListGroup.Item>
                <ListGroup.Item>
                  Mortgage Payment:{" "}
                  <b>
                    {currencyFormatter.format(
                      cardData.mortgagePayment / cardData.months
                    )}
                  </b>
                </ListGroup.Item>
              </ListGroup>
            </Card>
            <Card className="dashboard-card">
              <Card.Header>Project Metrics</Card.Header>
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
                      occupierInvestorMOCCalculation(rawData)
                    )}
                  </b>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </div>
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
                type={"occupierInvestor"}
                placement={"right"}
              />
            </div>
          </div>
          <div className="dashboard-button-container">
            <Button
              id="dashboard-button"
              className="dashboard-table-button"
              onClick={() => props.setCashflow(userType)}
              variant="primary"
            >
              {props.cashflowTable[userType] ? "hide" : "show"}
            </Button>
          </div>
        </div>
        <div
          className={`dashboard-table-row 
                        ${props.cashflowTable[userType] ? "" : "hide"}`}
        >
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Year</th>
                <th className="dashboard-table-desktop">Deposit</th>
                <th className="dashboard-table-desktop">Rental Income</th>
                <th className="dashboard-table-desktop">Operating Expenses</th>
                <th className="dashboard-table-desktop">Net Sale Proceeds</th>
                <th className="dashboard-table-desktop">Mortgage Costs</th>
                <th className="dashboard-table-mobile">Total Income</th>
                <th className="dashboard-table-mobile">Total Costs</th>
                <th>Net Annual Cashflow</th>
              </tr>
            </thead>
            <tbody>
              {tableData.annualCashflow.map((c) => (
                <tr key={c.year}>
                  <td>{c.year}</td>
                  <td className="dashboard-table-desktop">
                    {currencyFormatter.format(c.equityUse)}
                  </td>
                  <td className="dashboard-table-desktop">
                    {currencyFormatter.format(c.rentalIncome)}
                  </td>
                  <td className="dashboard-table-desktop">
                    {currencyFormatter.format(c.opex)}
                  </td>
                  <td className="dashboard-table-desktop">
                    {currencyFormatter.format(c.netSale)}
                  </td>
                  <td className="dashboard-table-desktop">
                    {currencyFormatter.format(c.fundingCost)}
                  </td>
                  <td className="dashboard-table-mobile">
                    {currencyFormatter.format(c.totalIncome)}
                  </td>
                  <td className="dashboard-table-mobile">
                    {currencyFormatter.format(c.totalCost)}
                  </td>
                  <td>{currencyFormatter.format(c.postFinanceCashflow)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th>Total</th>
                <td className="dashboard-table-desktop">
                  {currencyFormatter.format(
                    tableData.summaryCashflow[0].equityUse
                  )}
                </td>
                <td className="dashboard-table-desktop">
                  {currencyFormatter.format(
                    tableData.summaryCashflow[0].rentalIncome
                  )}
                </td>
                <td className="dashboard-table-desktop">
                  {currencyFormatter.format(tableData.summaryCashflow[0].opex)}
                </td>
                <td className="dashboard-table-desktop">
                  {currencyFormatter.format(
                    tableData.summaryCashflow[0].netSale
                  )}
                </td>
                <td className="dashboard-table-desktop">
                  {currencyFormatter.format(
                    tableData.summaryCashflow[0].fundingCost
                  )}
                </td>
                <td className="dashboard-table-mobile">
                  {currencyFormatter.format(
                    tableData.summaryCashflow[0].totalIncome
                  )}
                </td>
                <td className="dashboard-table-mobile">
                  {currencyFormatter.format(
                    tableData.summaryCashflow[0].totalCost
                  )}
                </td>
                <td>
                  {currencyFormatter.format(
                    tableData.summaryCashflow[0].postFinanceCashflow
                  )}
                </td>
              </tr>
            </tfoot>
          </Table>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    values: state.values,
    cashflowTable: state.navigation.cashflowTable,
  };
};

const mapDispatchToProps = {
  setCashflow,
  setModal,
  editDashboard,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OccupierInvestorDashboard);
