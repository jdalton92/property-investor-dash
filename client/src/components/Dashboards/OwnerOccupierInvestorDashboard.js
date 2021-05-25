import React, { useState } from "react";
import { connect } from "react-redux";
import Tooltip from "../Shared/Tooltip";
import { Icon } from "../Shared/Icon";
import {
  cumulativeChartParse,
  tableParse,
  cardParse,
  occupierInvestorMOCCalculation,
} from "../../utils/occupierAndInvestorCalculations";
import {
  currencyFormatter,
  percentageFormatter,
  IRRCalculation,
} from "../../utils/dashboardHelper";
import { Line } from "react-chartjs-2";
import { occupierInvestorTooltip } from "../../static/tooltipText";
import ExpandIcon from "../../styles/svg/expand.svg";
import CollapseIcon from "../../styles/svg/collapse.svg";

const OwnerOccupierInvestorDashboard = ({ monthlyCashflow }) => {
  const [showCashflow, setShowCashflow] = useState(true);

  const message = occupierInvestorTooltip.cashflowAfterFunding.message;
  const chartData = cumulativeChartParse(monthlyCashflow);
  const tableData = tableParse(monthlyCashflow);
  const cardData = cardParse(monthlyCashflow);
  const total = tableData?.totalCashflow;
  return (
    <>
      <h2 className="f16 bold mt16 mb16">Post Funding Metrics</h2>
      <div className="dash-row flex-row">
        <table className="r bs-3 bg-1 p20 mb16 o-hidden">
          <thead>
            <tr>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Rental Income:</td>
              <td>{currencyFormatter.format(cardData.rentalIncome)}</td>
            </tr>
            <tr>
              <td>Loan Interest:</td>
              <td>{currencyFormatter.format(cardData.mortgageInterest)}</td>
            </tr>
            <tr>
              <td>Profit:</td>
              <td>{currencyFormatter.format(cardData.profit)}</td>
            </tr>
          </tbody>
        </table>
        <table className="r bs-3 bg-1 p20 mb16 o-hidden">
          <thead>
            <tr>
              <th>Avg Per Month</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Rental Income:</td>
              <td>
                {currencyFormatter.format(
                  cardData.rentalIncome / cardData.months
                )}
              </td>
            </tr>
            <tr>
              <td>Operating Costs:</td>
              <td>
                {currencyFormatter.format(cardData.opex / cardData.months)}
              </td>
            </tr>
            <tr>
              <td>Mortgage Payment:</td>
              <td>
                {currencyFormatter.format(
                  cardData.mortgagePayment / cardData.months
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <table className="r bs-3 bg-1 p20 mb16 o-hidden">
          <thead>
            <tr>
              <th>Project Metrics</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>IRR:</td>
              <td>
                {percentageFormatter.format(
                  IRRCalculation(monthlyCashflow).postFinance
                )}
              </td>
            </tr>
            <tr>
              <td>Margin On Cost:</td>
              <td>
                {percentageFormatter.format(
                  occupierInvestorMOCCalculation(monthlyCashflow)
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="dash-chart r bs-3 bg-1 p20 mb16">
        <h3 className="f16 mb16">Cumulative Position After Funding</h3>
        <Line data={chartData.data} options={chartData?.options} />
      </div>
      <div className="dash-cashflow r bs-3 bg-1 p20 mb16">
        <div className="relative">
          <div className="flex-row align-c mb16 mr100">
            <h3 className="f16 mt-md-48">Cashflow Summary After Funding</h3>
            <Tooltip message={message} extraClass="mt8 mt-md-48" />
          </div>
          <button
            type="button"
            className="absolute form-button-p bs-3 font-white pt4 pb4 flex-row align-c justify-c"
            onClick={() => setShowCashflow(!showCashflow)}
          >
            <Icon
              size={"20px"}
              url={showCashflow ? CollapseIcon : ExpandIcon}
              color={"white"}
              hover={false}
              active={false}
            />
            <span className="ml8">{showCashflow ? "Hide" : "Show"}</span>
          </button>
        </div>
        {showCashflow && (
          <div className="o-x-auto">
            <table className="w100 r bg-1 p20 mb16 o-hidden">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Deposit</th>
                  <th>Rent</th>
                  <th>Opex</th>
                  <th>Net Sale</th>
                  <th>Mortgage</th>
                  <th>Total Income</th>
                  <th>Total Costs</th>
                  <th>Net Annual Cashflow</th>
                </tr>
              </thead>
              <tbody>
                {tableData?.annualCashflow.map((c) => (
                  <tr key={c.year}>
                    <td>{c.year}</td>
                    <td>{currencyFormatter.format(c.equityUse)}</td>
                    <td>{currencyFormatter.format(c.rentalIncome)}</td>
                    <td>{currencyFormatter.format(c.opex)}</td>
                    <td>{currencyFormatter.format(c.netSale)}</td>
                    <td>{currencyFormatter.format(c.fundingCost)}</td>
                    <td>{currencyFormatter.format(c.totalIncome)}</td>
                    <td>{currencyFormatter.format(c.totalCost)}</td>
                    <td>{currencyFormatter.format(c.postFinanceCashflow)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th>Total</th>
                  <td>{currencyFormatter.format(total?.equityUse)}</td>
                  <td>{currencyFormatter.format(total?.rentalIncome)}</td>
                  <td>{currencyFormatter.format(total?.opex)}</td>
                  <td>{currencyFormatter.format(total?.netSale)}</td>
                  <td>{currencyFormatter.format(total?.fundingCost)}</td>
                  <td>{currencyFormatter.format(total?.totalIncome)}</td>
                  <td>{currencyFormatter.format(total?.totalCost)}</td>
                  <td>
                    {currencyFormatter.format(total?.postFinanceCashflow)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return { monthlyCashflow: state.cashflows.monthlyCashflow };
};

const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OwnerOccupierInvestorDashboard);
