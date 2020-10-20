import React, { useState } from "react";
import { connect } from "react-redux";
import Tooltip from "../Shared/Tooltip";
import { Icon } from "../Shared/Icon";
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
} from "../../utils/occupierAndInvestorDataParser";
import {
  currencyFormatter,
  percentageFormatter,
  IRRCalculation,
} from "../../utils/dashboardHelper";
import { Line } from "react-chartjs-2";
import { occupierInvestorTooltipHelper } from "../../utils/tooltipHelper";
import ExpandIcon from "../../styles/svg/expand.svg";
import CollapseIcon from "../../styles/svg/collapse.svg";

const OwnerOccupierInvestorDashboard = ({ dashboards }) => {
  const [showCashflow, setShowCashflow] = useState(true);

  const message = occupierInvestorTooltipHelper.cashflowAfterFunding.message;
  const rawData = occupierInvestorCalculation(dashboards.data[0].values);
  const chartData = cumulativeChartParse(rawData);
  const tableData = tableParse(rawData);
  const cardData = cardParse(rawData);

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
                  IRRCalculation(rawData).postFinance
                )}
              </td>
            </tr>
            <tr>
              <td>Margin On Cost:</td>
              <td>
                {percentageFormatter.format(
                  occupierInvestorMOCCalculation(rawData)
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
          <div className="flex-row align-c mb16">
            <h3 className="f16">Cashflow Summary After Funding</h3>
            <Tooltip message={message} />
          </div>
          <button
            type="submit"
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
          <table className="w100 r bs-3 bg-1 p20 mb16 o-hidden">
            <thead>
              <tr>
                <th>Year</th>
                <th className="dash-desktop">Deposit</th>
                <th className="dash-desktop">Rent</th>
                <th className="dash-desktop">Opex</th>
                <th className="dash-desktop">Net Sale</th>
                <th className="dash-desktop">Mortgage</th>
                <th className="dash-mobile">Total Income</th>
                <th className="dash-mobile">Total Costs</th>
                <th>Net Annual Cashflow</th>
              </tr>
            </thead>
            <tbody>
              {tableData?.annualCashflow.map((c) => (
                <tr key={c.year}>
                  <td>{c.year}</td>
                  <td className="dash-desktop">
                    {currencyFormatter.format(c.equityUse)}
                  </td>
                  <td className="dash-desktop">
                    {currencyFormatter.format(c.rentalIncome)}
                  </td>
                  <td className="dash-desktop">
                    {currencyFormatter.format(c.opex)}
                  </td>
                  <td className="dash-desktop">
                    {currencyFormatter.format(c.netSale)}
                  </td>
                  <td className="dash-desktop">
                    {currencyFormatter.format(c.fundingCost)}
                  </td>
                  <td className="dash-mobile">
                    {currencyFormatter.format(c.totalIncome)}
                  </td>
                  <td className="dash-mobile">
                    {currencyFormatter.format(c.totalCost)}
                  </td>
                  <td>{currencyFormatter.format(c.postFinanceCashflow)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th>Total</th>
                <td className="dash-desktop">
                  {currencyFormatter.format(
                    tableData?.summaryCashflow[0].equityUse
                  )}
                </td>
                <td className="dash-desktop">
                  {currencyFormatter.format(
                    tableData?.summaryCashflow[0].rentalIncome
                  )}
                </td>
                <td className="dash-desktop">
                  {currencyFormatter.format(tableData?.summaryCashflow[0].opex)}
                </td>
                <td className="dash-desktop">
                  {currencyFormatter.format(
                    tableData?.summaryCashflow[0].netSale
                  )}
                </td>
                <td className="dash-desktop">
                  {currencyFormatter.format(
                    tableData?.summaryCashflow[0].fundingCost
                  )}
                </td>
                <td className="dash-mobile">
                  {currencyFormatter.format(
                    tableData?.summaryCashflow[0].totalIncome
                  )}
                </td>
                <td className="dash-mobile">
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
          </table>
        )}
      </div>
    </>
  );
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
)(OwnerOccupierInvestorDashboard);
