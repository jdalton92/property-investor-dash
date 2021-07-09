import React, { useState } from "react";
import { connect } from "react-redux";
import Tooltip from "../Shared/Tooltip";
import Button from "../Shared/Button";
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
      <h2 className="my-2 text-l font-semibold">Pre Funding Metrics</h2>
      <div className="flex flex-col md:flex-row mb-2">
        <table className="flex-1 mb-1 md:my-0 md:mr-1 text-left shadow-xl rounded-2xl bg-white overflow-hidden">
          <thead>
            <tr className="border-b border-gray-200 h-8 text-sm">
              <th className="font-semibold p-3">Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-b border-gray-200 h-12 hover:bg-gray-50">
              <td className="p-3">Revenue</td>
              <td className="p-3">{cashflowFormatter(total?.totalRevenue)}</td>
            </tr>
            <tr className="border-b border-gray-200 h-12 hover:bg-gray-50">
              <td className="p-3">Costs</td>
              <td className="p-3">
                {cashflowFormatter(total?.totalCostsPreFinance)}
              </td>
            </tr>
            <tr className="border-b border-gray-200 h-12 hover:bg-gray-50">
              <td className="p-3">Profit</td>
              <td className="p-3">
                {cashflowFormatter(total?.preFinanceCashflow)}
              </td>
            </tr>
          </tbody>
        </table>
        <table className="flex-1 mb-1 md:my-0 md:mr-1 text-left shadow-xl rounded-2xl bg-white overflow-hidden">
          <thead>
            <tr className="border-b border-gray-200 h-8 text-sm">
              <th className="font-semibold p-3">Per Dwelling</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-b border-gray-200 h-12 hover:bg-gray-50">
              <td className="p-3">Revenue</td>
              <td className="p-3">
                {cashflowFormatter(
                  total?.totalRevenue / currentDashboard.assumptions.dwellings
                )}
              </td>
            </tr>
            <tr className="border-b border-gray-200 h-12 hover:bg-gray-50">
              <td className="p-3">Costs</td>
              <td className="p-3">
                {cashflowFormatter(
                  total?.totalCostsPreFinance /
                    currentDashboard.assumptions.dwellings
                )}
              </td>
            </tr>
            <tr className="border-b border-gray-200 h-12 hover:bg-gray-50">
              <td className="p-3">Profit</td>
              <td className="p-3">
                {cashflowFormatter(
                  total?.preFinanceCashflow /
                    currentDashboard.assumptions.dwellings
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <table className="flex-1 mb-1 md:my-0 md:mr-1 text-left shadow-xl rounded-2xl bg-white overflow-hidden">
          <thead>
            <tr className="border-b border-gray-200 h-8 text-sm">
              <th className="font-semibold p-3">Unlevered Metrics</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-b border-gray-200 h-12 hover:bg-gray-50">
              <td className="p-3">IRR</td>
              <td className="p-3 text-gray-500">
                {percentageFormatter.format(
                  IRRCalculation(monthlyCashflow).preFinance
                )}
              </td>
            </tr>
            <tr className="border-b border-gray-200 h-12 hover:bg-gray-50">
              <td className="p-3">Margin On Cost</td>
              <td className="p-3 text-gray-500">
                {percentageFormatter.format(
                  developerMOCCalculation(monthlyCashflow).preFinance
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="shadow-xl rounded-2xl bg-white p-3 mb-2">
        <h3 className="text-l mb-3">Cumulative Cash Position Before Funding</h3>
        <Line
          data={cumulativeChart.data.preFinance}
          options={cumulativeChart.options}
        />
      </div>
      <div className="shadow-xl rounded-2xl bg-white p-3">
        <div
          className={`flex items-center justify-between text-l ${
            showPreFinanceCashflow ? "mb-3" : ""
          }`}
        >
          <div className="flex mr-3">
            <h3 className="text-l mr-3">Annual Cashflow Before Funding</h3>
            <Tooltip message={preFinanceMessage} extraClass="mt8 mt-md-48" />
          </div>
          <Button
            label={showPreFinanceCashflow ? "Hide" : "Show"}
            type={"button"}
            options={{
              styleType: "primary",
              buttonClass: "h-10 px-2",
              icon: showPreFinanceCashflow ? "collapse" : "expand",
              iconClass: "h-8 w-8 mr-2",
              onClick: () => setShowPreFinanceCashflow(!showPreFinanceCashflow),
            }}
          />
        </div>
        {showPreFinanceCashflow && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 h-8 text-sm">
                  <th className="font-semibold p-3">Year</th>
                  <th className="font-semibold p-3">Acquisition Costs</th>
                  <th className="font-semibold p-3">TDC</th>
                  <th className="font-semibold p-3">NOI</th>
                  <th className="font-semibold p-3">Net Sale</th>
                  <th className="font-semibold p-3">Total Income</th>
                  <th className="font-semibold p-3">Total Costs</th>
                  <th className="font-semibold p-3">Net Annual Cashflow</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {tableData?.annualCashflow.map((c) => (
                  <tr
                    className="border-b border-gray-200 hover:bg-gray-50"
                    key={c.year}
                  >
                    <td className="p-3">{c.year}</td>
                    <td className="p-3">
                      {cashflowFormatter(c.acquisitionCosts)}
                    </td>
                    <td className="p-3">{cashflowFormatter(c.TDC)}</td>
                    <td className="p-3">{cashflowFormatter(c.NOI)}</td>
                    <td className="p-3">{cashflowFormatter(c.netSale)}</td>
                    <td className="p-3">{cashflowFormatter(c.totalIncome)}</td>
                    <td className="p-3">
                      {cashflowFormatter(c.preFinanceTotalCost)}
                    </td>
                    <td className="p-3">
                      {cashflowFormatter(c.preFinanceCashflow)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="text-sm">
                <tr className="font-semibold border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-3">Total</td>
                  <td className="p-3">
                    {cashflowFormatter(total?.acquisitionCosts)}
                  </td>
                  <td className="p-3">{cashflowFormatter(total?.TDC)}</td>
                  <td className="p-3">{cashflowFormatter(total?.NOI)}</td>
                  <td className="p-3">{cashflowFormatter(total?.netSale)}</td>
                  <td className="p-3">
                    {cashflowFormatter(total?.totalIncome)}
                  </td>
                  <td className="p-3">
                    {cashflowFormatter(total?.preFinanceTotalCost)}
                  </td>
                  <td className="p-3">
                    {cashflowFormatter(total?.preFinanceCashflow)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
      <h2 className="my-2 text-l font-semibold">Post Funding Metrics</h2>
      <div className="flex flex-col md:flex-row mb-2">
        <table className="flex-1 mb-1 md:my-0 md:mr-1 text-left shadow-xl rounded-2xl bg-white overflow-hidden">
          <thead>
            <tr className="border-b border-gray-200 h-8 text-sm">
              <th className="font-semibold p-3">Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-b border-gray-200 h-12 hover:bg-gray-50">
              <td className="p-3">Revenue</td>
              <td className="p-3">{cashflowFormatter(total?.totalRevenue)}</td>
            </tr>
            <tr className="border-b border-gray-200 h-12 hover:bg-gray-50">
              <td className="p-3">Costs</td>
              <td className="p-3">
                {cashflowFormatter(total?.totalCostsPostFinance)}
              </td>
            </tr>
            <tr className="border-b border-gray-200 h-12 hover:bg-gray-50">
              <td className="p-3">Profit</td>
              <td className="p-3">
                {cashflowFormatter(total?.postFinanceCashflow)}
              </td>
            </tr>
          </tbody>
        </table>
        <table className="flex-1 mb-1 md:my-0 md:mr-1 text-left shadow-xl rounded-2xl bg-white overflow-hidden">
          <thead>
            <tr className="border-b border-gray-200 h-8 text-sm">
              <th className="font-semibold p-3">Per Dwelling</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-b border-gray-200 h-12 hover:bg-gray-50">
              <td className="p-3">Revenue</td>
              <td className="p-3">
                {cashflowFormatter(
                  total?.totalRevenue / currentDashboard.assumptions.dwellings
                )}
              </td>
            </tr>
            <tr className="border-b border-gray-200 h-12 hover:bg-gray-50">
              <td className="p-3">Costs</td>
              <td className="p-3">
                {cashflowFormatter(
                  total?.totalCostsPostFinance /
                    currentDashboard.assumptions.dwellings
                )}
              </td>
            </tr>
            <tr className="border-b border-gray-200 h-12 hover:bg-gray-50">
              <td className="p-3">Profit</td>
              <td className="p-3">
                {cashflowFormatter(
                  total?.postFinanceCashflow /
                    currentDashboard.assumptions.dwellings
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <table className="flex-1 mb-1 md:my-0 md:mr-1 text-left shadow-xl rounded-2xl bg-white overflow-hidden">
          <thead>
            <tr className="border-b border-gray-200 h-8 text-sm">
              <th className="font-semibold p-3">Levered Metrics</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-b border-gray-200 h-12 hover:bg-gray-50">
              <td className="p-3">IRR</td>
              <td className="p-3 text-gray-500">
                {percentageFormatter.format(
                  IRRCalculation(monthlyCashflow).postFinance
                )}
              </td>
            </tr>
            <tr className="border-b border-gray-200 h-12 hover:bg-gray-50">
              <td className="p-3">Margin On Cost</td>
              <td className="p-3 text-gray-500">
                {percentageFormatter.format(
                  developerMOCCalculation(monthlyCashflow).postFinance
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="shadow-xl rounded-2xl bg-white p-3 mb-2">
        <h3 className="text-l mb-3">Cumulative Position After Funding</h3>
        <Line
          data={cumulativeChart.data.postFinance}
          options={cumulativeChart.options}
        />
      </div>
      <div className="shadow-xl rounded-2xl bg-white p-3 mb-2">
        <h3 className="text-l mb-3">Cumulative Funding Uses</h3>
        <Line data={fundingChart.data} options={fundingChart.options} />
      </div>
      <div className="shadow-xl rounded-2xl bg-white p-3 mb-2">
        <h3 className="text-l mb-3">Annual Cashflow</h3>
        <Bar data={annualChart.data} options={annualChart.options} />
      </div>
      <div className="shadow-xl rounded-2xl bg-white p-3 mb-2">
        <div
          className={`flex items-center justify-between text-l ${
            showPostFinanceCashflow ? "mb-3" : ""
          }`}
        >
          <div className="flex mr-3">
            <h3 className="text-l mr-3">Annual Cashflow After Funding</h3>
            <Tooltip message={postFinanceMessage} extraClass="mt8 mt-md-48" />
          </div>
          <Button
            label={showPostFinanceCashflow ? "Hide" : "Show"}
            type={"button"}
            options={{
              styleType: "primary",
              buttonClass: "h-10 px-2",
              icon: showPostFinanceCashflow ? "collapse" : "expand",
              iconClass: "h-8 w-8 mr-2",
              onClick: () =>
                setShowPostFinanceCashflow(!showPostFinanceCashflow),
            }}
          />
        </div>
        {showPostFinanceCashflow && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 h-8 text-sm">
                  <th className="font-semibold p-3">Year</th>
                  <th className="font-semibold p-3">Acquisition Costs</th>
                  <th className="font-semibold p-3">TDC</th>
                  <th className="font-semibold p-3">NOI</th>
                  <th className="font-semibold p-3">Net Sale</th>
                  <th className="font-semibold p-3">Funding Costs</th>
                  <th className="font-semibold p-3">Total Income</th>
                  <th className="font-semibold p-3">Total Costs</th>
                  <th className="font-semibold p-3">Debt Source</th>
                  <th className="font-semibold p-3">Net Annual Cashflow</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {tableData?.annualCashflow.map((c) => (
                  <tr
                    className="border-b border-gray-200 hover:bg-gray-50"
                    key={c.year}
                  >
                    <td className="p-3">{c.year}</td>
                    <td className="p-3">
                      {cashflowFormatter(c.acquisitionCosts)}
                    </td>
                    <td className="p-3">{cashflowFormatter(c.TDC)}</td>
                    <td className="p-3">{cashflowFormatter(c.NOI)}</td>
                    <td className="p-3">{cashflowFormatter(c.netSale)}</td>
                    <td className="p-3">{cashflowFormatter(c.loanCosts)}</td>
                    <td className="p-3">{cashflowFormatter(c.totalIncome)}</td>
                    <td className="p-3">
                      {cashflowFormatter(c.postFinanceTotalCost)}
                    </td>
                    <td className="p-3">{cashflowFormatter(c.debtSource)}</td>
                    <td className="p-3">
                      {cashflowFormatter(c.postFinanceCashflow)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="text-sm">
                <tr className="font-semibold border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-3">Total</td>
                  <td className="p-3">
                    {cashflowFormatter(total?.acquisitionCosts)}
                  </td>
                  <td className="p-3">{cashflowFormatter(total?.TDC)}</td>
                  <td className="p-3">{cashflowFormatter(total?.NOI)}</td>
                  <td className="p-3">{cashflowFormatter(total?.netSale)}</td>
                  <td className="p-3">{cashflowFormatter(total?.loanCosts)}</td>
                  <td className="p-3">
                    {cashflowFormatter(total?.totalIncome)}
                  </td>
                  <td className="p-3">
                    {cashflowFormatter(total?.postFinanceTotalCost)}
                  </td>
                  <td className="p-3">
                    {cashflowFormatter(total?.debtSource)}
                  </td>
                  <td className="p-3">
                    {cashflowFormatter(total?.postFinanceCashflow)}
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
  return {
    currentDashboard: state.dashboards.currentDashboard,
    isFetchingDashboard: state.dashboards.isFetching,
    isFetchingCashflow: state.cashflows.isFetching,
    monthlyCashflow: state.cashflows.monthlyCashflow,
  };
};

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(DeveloperDashboard);
