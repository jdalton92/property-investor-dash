import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// import CalculatorFormTooltip from "../CalculatorForms/CalculatorFormTooltip";
import {
  getDashboard,
  preSaveDashboard,
} from "../../reducers/dashboardReducer";
import { setCashflow, setModal } from "../../reducers/navigationReducer";
import {
  cumulativeChartParse,
  tableParse,
  occupierInvestorCalculation,
  cardParse,
  occupierInvestorMOCCalculation,
} from "../../utils/occupierInvestorDashboardHelper";
import {
  currencyFormatter,
  percentageFormatter,
  IRRCalculation,
} from "../../utils/dashboardHelper";
import { Line } from "react-chartjs-2";
import { Table, Card, ListGroup, Button, Spinner } from "react-bootstrap";

const OccupierInvestorDashboard = ({
  title,
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
      if (dashboards.data[0].values.investor) {
        history.push(`/investor/edit/${id}`);
      } else {
        history.push(`/owner-occupier/edit/${id}`);
      }
    } else {
      if (dashboards.data[0].values.investor) {
        history.replace("/investor/edit");
      } else {
        history.replace("/owner-occupier/edit");
      }
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
    const userType = dashboards.data[0].values.investor
      ? "investor"
      : "ownerOccupier";
    const rawData = occupierInvestorCalculation(dashboards.data[0].values);
    const chartData = cumulativeChartParse(rawData);
    const tableData = tableParse(rawData);
    const cardData = cardParse(rawData);
    return (
      <section className="dashboard-section">
        <div className="dashboard-header">
          <h1>
            <b>{title}</b>
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
              <Line data={chartData.data} options={chartData?.options} />
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
                      {currencyFormatter.format(
                        cardData.opex / cardData.months
                      )}
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
                {/* <CalculatorFormTooltip
                  input={"cashflowAfterFunding"}
                  type={"occupierInvestor"}
                  placement={"right"}
                /> */}
              </div>
            </div>
            <div className="dashboard-button-container">
              <Button
                id="dashboard-button"
                className="dashboard-table-button"
                onClick={() => setCashflow(userType)}
                variant="primary"
              >
                {cashflowTable[userType] ? "hide" : "show"}
              </Button>
            </div>
          </div>
          <div
            className={`dashboard-table-row
                        ${cashflowTable[userType] ? "" : "hide"}`}
          >
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Year</th>
                  <th className="dashboard-table-desktop">Deposit</th>
                  <th className="dashboard-table-desktop">Rental Income</th>
                  <th className="dashboard-table-desktop">
                    Operating Expenses
                  </th>
                  <th className="dashboard-table-desktop">Net Sale Proceeds</th>
                  <th className="dashboard-table-desktop">Mortgage Costs</th>
                  <th className="dashboard-table-mobile">Total Income</th>
                  <th className="dashboard-table-mobile">Total Costs</th>
                  <th>Net Annual Cashflow</th>
                </tr>
              </thead>
              <tbody>
                {tableData?.annualCashflow.map((c) => (
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
                      tableData?.summaryCashflow[0].equityUse
                    )}
                  </td>
                  <td className="dashboard-table-desktop">
                    {currencyFormatter.format(
                      tableData?.summaryCashflow[0].rentalIncome
                    )}
                  </td>
                  <td className="dashboard-table-desktop">
                    {currencyFormatter.format(
                      tableData?.summaryCashflow[0].opex
                    )}
                  </td>
                  <td className="dashboard-table-desktop">
                    {currencyFormatter.format(
                      tableData?.summaryCashflow[0].netSale
                    )}
                  </td>
                  <td className="dashboard-table-desktop">
                    {currencyFormatter.format(
                      tableData?.summaryCashflow[0].fundingCost
                    )}
                  </td>
                  <td className="dashboard-table-mobile">
                    {currencyFormatter.format(
                      tableData?.summaryCashflow[0].totalIncome
                    )}
                  </td>
                  <td className="dashboard-table-mobile">
                    {currencyFormatter.format(
                      tableData?.summaryCashflow[0].totalCost
                    )}
                  </td>
                  <td>
                    {currencyFormatter.format(
                      tableData?.summaryCashflow[0].postFinanceCashflow
                    )}
                  </td>
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
  };
};

const mapDispatchToProps = {
  setCashflow,
  setModal,
  getDashboard,
  preSaveDashboard,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OccupierInvestorDashboard);
