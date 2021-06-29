import React, { useState } from "react";
import { connect } from "react-redux";
import Tooltip from "../Shared/Tooltip";
import {
  cumulativeChartParse,
  annualChartParse,
  tableParse,
  developerMOCCalculation,
  fundingChartParse,
} from "../../utils/developerCalculations";
import {
  percentageFormatter,
  cashflowFormatter,
  IRRCalculation,
} from "../../utils/dashboardHelper";
import { developerTooltips } from "../../static/tooltips";
import { Line, Bar } from "react-chartjs-2";
import Icon from "../Shared/Icon";
import ExpandIcon from "../../styles/svg/expand.svg";
import CollapseIcon from "../../styles/svg/collapse.svg";

const DeveloperDashboard = ({ currentDashboard, monthlyCashflow }) => {
  const [showPreFinanceCashflow, setShowPreFinanceCashflow] = useState(true);
  const [showPostFinanceCashflow, setShowPostFinanceCashflow] = useState(true);

  const preFinanceMessage = developerTooltips.cashflowBeforeFunding.message;
  const postFinanceMessage = developerTooltips.cashflowAfterFunding.message;
  const annualChart = annualChartParse(monthlyCashflow);
  const cumulativeChart = cumulativeChartParse(monthlyCashflow);
  const tableData = tableParse(monthlyCashflow);
  const fundingChart = fundingChartParse(monthlyCashflow);
  const total = tableData?.totalCashflow;
  return (
    <>
      <h2 className="f16 bold mt16 mb16">Pre Funding Metrics</h2>
      <div className="dash-row flex-row">
        <table className="dashboard-table r bs-3 bg-1 p20 mb16 o-hidden">
          <thead>
            <tr>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-s">Revenue:</td>
              <td>{cashflowFormatter(total?.totalRevenue)}</td>
            </tr>
            <tr>
              <td className="text-s">Costs:</td>
              <td>{cashflowFormatter(total?.totalCostsPreFinance)}</td>
            </tr>
            <tr>
              <td className="text-s">Profit:</td>
              <td>{cashflowFormatter(total?.preFinanceCashflow)}</td>
            </tr>
          </tbody>
        </table>
        <table className="dashboard-table r bs-3 bg-1 p20 mb16 o-hidden">
          <thead>
            <tr>
              <th>Per Dwelling</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-s">Revenue:</td>
              <td>
                {cashflowFormatter(
                  total?.totalRevenue / currentDashboard.assumptions.dwellings
                )}
              </td>
            </tr>
            <tr>
              <td className="text-s">Costs:</td>
              <td>
                {cashflowFormatter(
                  total?.totalCostsPreFinance /
                    currentDashboard.assumptions.dwellings
                )}
              </td>
            </tr>
            <tr>
              <td className="text-s">Profit:</td>
              <td>
                {cashflowFormatter(
                  total?.preFinanceCashflow /
                    currentDashboard.assumptions.dwellings
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <table className="dashboard-table r bs-3 bg-1 p20 mb16 o-hidden">
          <thead>
            <tr>
              <th>Unlevered Metrics</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-s">IRR:</td>
              <td>
                {percentageFormatter.format(
                  IRRCalculation(monthlyCashflow).preFinance
                )}
              </td>
            </tr>
            <tr>
              <td className="text-s">Margin On Cost:</td>
              <td>
                {percentageFormatter.format(
                  developerMOCCalculation(monthlyCashflow).preFinance
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="dash-chart r bs-3 bg-1 p20 mb16">
        <h3 className="f16 mb16">Cumulative Position Before Funding</h3>
        <Line
          data={cumulativeChart.data.preFinance}
          options={cumulativeChart.options}
        />
      </div>
      <div className="dash-cashflow r bs-3 bg-1 p20 mb16">
        <div className="relative">
          <div className="flex-row align-c mb16 mr100">
            <h3 className="f16 mt-md-48">Cashflow Summary Before Funding</h3>
            <Tooltip message={preFinanceMessage} extraClass="mt8 mt-md-48" />
          </div>
          <button
            type="button"
            className="absolute form-button-p bs-3 font-white pt4 pb4 flex-row align-c justify-c"
            onClick={() => setShowPreFinanceCashflow(!showPreFinanceCashflow)}
          >
            <Icon
              size={"20px"}
              url={showPreFinanceCashflow ? CollapseIcon : ExpandIcon}
              color={"white"}
              hover={false}
              active={false}
            />
            <span className="ml8">
              {showPreFinanceCashflow ? "Hide" : "Show"}
            </span>
          </button>
        </div>
        {showPreFinanceCashflow && (
          <div className="o-x-auto">
            <table className="dashboard-table w100 bg-1 p20 mb16 o-hidden">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Acquisition Costs</th>
                  <th>TDC</th>
                  <th>NOI</th>
                  <th>Net Sale</th>
                  <th>Total Income</th>
                  <th>Total Costs</th>
                  <th>Net Annual Cashflow</th>
                </tr>
              </thead>
              <tbody>
                {tableData?.annualCashflow.map((c) => (
                  <tr key={c.year}>
                    <td>{c.year}</td>
                    <td>{cashflowFormatter(c.acquisitionCosts)}</td>
                    <td>{cashflowFormatter(c.TDC)}</td>
                    <td>{cashflowFormatter(c.NOI)}</td>
                    <td>{cashflowFormatter(c.netSale)}</td>
                    <td>{cashflowFormatter(c.totalIncome)}</td>
                    <td>{cashflowFormatter(c.preFinanceTotalCost)}</td>
                    <td>{cashflowFormatter(c.preFinanceCashflow)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th>Total</th>
                  <td>{cashflowFormatter(total?.acquisitionCosts)}</td>
                  <td>{cashflowFormatter(total?.TDC)}</td>
                  <td>{cashflowFormatter(total?.NOI)}</td>
                  <td>{cashflowFormatter(total?.netSale)}</td>
                  <td>{cashflowFormatter(total?.totalIncome)}</td>
                  <td>{cashflowFormatter(total?.preFinanceTotalCost)}</td>
                  <td>{cashflowFormatter(total?.preFinanceCashflow)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
      <h2 className="f16 bold mt16 mb16">Post Funding Metrics</h2>
      <div className="dash-row flex-row">
        <table className="dashboard-table r bs-3 bg-1 p20 mb16 o-hidden">
          <thead>
            <tr>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-s">Revenue:</td>
              <td>{cashflowFormatter(total?.totalRevenue)}</td>
            </tr>
            <tr>
              <td className="text-s">Costs:</td>
              <td>{cashflowFormatter(total?.totalCostsPostFinance)}</td>
            </tr>
            <tr>
              <td className="text-s">Profit:</td>
              <td>{cashflowFormatter(total?.postFinanceCashflow)}</td>
            </tr>
          </tbody>
        </table>
        <table className="dashboard-table r bs-3 bg-1 p20 mb16 o-hidden">
          <thead>
            <tr>
              <th>Per Dwelling</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-s">Revenue:</td>
              <td>
                {cashflowFormatter(
                  total?.totalRevenue / currentDashboard.assumptions.dwellings
                )}
              </td>
            </tr>
            <tr>
              <td className="text-s">Costs:</td>
              <td>
                {cashflowFormatter(
                  total?.totalCostsPostFinance /
                    currentDashboard.assumptions.dwellings
                )}
              </td>
            </tr>
            <tr>
              <td className="text-s">Profit:</td>
              <td>
                {cashflowFormatter(
                  total?.postFinanceCashflow /
                    currentDashboard.assumptions.dwellings
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <table className="dashboard-table r bs-3 bg-1 p20 mb16 o-hidden">
          <thead>
            <tr>
              <th>Levered Metrics</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-s">IRR:</td>
              <td>
                {percentageFormatter.format(
                  IRRCalculation(monthlyCashflow).postFinance
                )}
              </td>
            </tr>
            <tr>
              <td className="text-s">Margin On Cost:</td>
              <td>
                {percentageFormatter.format(
                  developerMOCCalculation(monthlyCashflow).postFinance
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="dash-chart r bs-3 bg-1 p20 mb16">
        <h3 className="f16 mb16">Cumulative Position After Funding</h3>
        <Line
          data={cumulativeChart.data.postFinance}
          options={cumulativeChart.options}
        />
      </div>
      <div className="dash-chart r bs-3 bg-1 p20 mb16">
        <h3 className="f16 mb16">Cumulative Funding Uses</h3>
        <Line data={fundingChart.data} options={fundingChart.options} />
      </div>
      <div className="dash-chart r bs-3 bg-1 p20 mb16">
        <h3 className="f16 mb16">Annual Cashflow</h3>
        <Bar data={annualChart.data} options={annualChart.options} />
      </div>
      <div className="dash-cashflow r bs-3 bg-1 p20 mb16">
        <div className="relative">
          <div className="flex-row align-c mb16 mr100">
            <h3 className="f16 mt-md-48">Cashflow Summary After Funding</h3>
            <Tooltip message={postFinanceMessage} extraClass="mt8 mt-md-48" />
          </div>
          <button
            type="button"
            className="absolute form-button-p bs-3 font-white pt4 pb4 flex-row align-c justify-c"
            onClick={() => setShowPostFinanceCashflow(!showPostFinanceCashflow)}
          >
            <Icon
              size={"20px"}
              url={showPostFinanceCashflow ? CollapseIcon : ExpandIcon}
              color={"white"}
              hover={false}
              active={false}
            />
            <span className="ml8">
              {showPostFinanceCashflow ? "Hide" : "Show"}
            </span>
          </button>
        </div>
        {showPostFinanceCashflow && (
          <div className="o-x-auto">
            <table className="dashboard-table w100 bg-1 p20 mb16 o-hidden">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Acquisition Costs</th>
                  <th>TDC</th>
                  <th>NOI</th>
                  <th>Net Sale</th>
                  <th>Funding Costs</th>
                  <th>Total Income</th>
                  <th>Total Costs</th>
                  <th>Debt Source</th>
                  <th>Net Annual Cashflow</th>
                </tr>
              </thead>
              <tbody>
                {tableData?.annualCashflow.map((c) => (
                  <tr key={c.year}>
                    <td>{c.year}</td>
                    <td>{cashflowFormatter(c.acquisitionCosts)}</td>
                    <td>{cashflowFormatter(c.TDC)}</td>
                    <td>{cashflowFormatter(c.NOI)}</td>
                    <td>{cashflowFormatter(c.netSale)}</td>
                    <td>{cashflowFormatter(c.loanCosts)}</td>
                    <td>{cashflowFormatter(c.totalIncome)}</td>
                    <td>{cashflowFormatter(c.postFinanceTotalCost)}</td>
                    <td>{cashflowFormatter(c.debtSource)}</td>
                    <td>{cashflowFormatter(c.postFinanceCashflow)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th>Total</th>
                  <td>{cashflowFormatter(total?.acquisitionCosts)}</td>
                  <td>{cashflowFormatter(total?.TDC)}</td>
                  <td>{cashflowFormatter(total?.NOI)}</td>
                  <td>{cashflowFormatter(total?.netSale)}</td>
                  <td>{cashflowFormatter(total?.loanCosts)}</td>
                  <td>{cashflowFormatter(total?.totalIncome)}</td>
                  <td>{cashflowFormatter(total?.postFinanceTotalCost)}</td>
                  <td>{cashflowFormatter(total?.debtSource)}</td>
                  <td>{cashflowFormatter(total?.postFinanceCashflow)}</td>
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
  return {
    currentDashboard: state.dashboards.currentDashboard,
    isFetchingDashboard: state.dashboards.isFetching,
    isFetchingCashflow: state.cashflows.isFetching,
    monthlyCashflow: state.cashflows.monthlyCashflow,
  };
};

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(DeveloperDashboard);
