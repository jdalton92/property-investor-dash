import React, { useState } from "react";
import { connect } from "react-redux";
import Tooltip from "../Shared/Tooltip";
import Button from "../Shared/Button";
import {
  cumulativeChartParse,
  tableParse,
  cardParse,
  occupierInvestorMOCCalculation,
} from "../../utils/occupierAndInvestorCalculations";
import {
  cashflowFormatter,
  percentageFormatter,
  IRRCalculation,
} from "../../utils/dashboardHelper";
import { Line } from "react-chartjs-2";
import { occupierTooltips } from "../../static/tooltips";

const OwnerOccupierInvestorDashboard = ({ monthlyCashflow }) => {
  const [showCashflow, setShowCashflow] = useState(true);

  const message = occupierTooltips.cashflowAfterFunding.message;
  const chartData = cumulativeChartParse(monthlyCashflow);
  const tableData = tableParse(monthlyCashflow);
  const cardData = cardParse(monthlyCashflow);
  const total = tableData?.totalCashflow;
  return (
    <>
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
              <td className="p-3">Rental Income</td>
              <td className="p-3">
                {cashflowFormatter(cardData.rentalIncome)}
              </td>
            </tr>
            <tr className="border-b border-gray-200 h-12 hover:bg-gray-50">
              <td className="p-3">Loan Interest</td>
              <td className="p-3">
                {cashflowFormatter(cardData.mortgageInterest)}
              </td>
            </tr>
            <tr className="border-b border-gray-200 h-12 hover:bg-gray-50">
              <td className="rounded-bl-2xl p-3">Profit</td>
              <td className="rounded-br-2xl p-3">
                {cashflowFormatter(cardData.profit)}
              </td>
            </tr>
          </tbody>
        </table>
        <table className="flex-1 my-1 md:my-0 md:mx-1 text-left shadow-xl rounded-2xl bg-white overflow-hidden">
          <thead>
            <tr className="border-b border-gray-200 h-8 text-sm">
              <th className="font-semibold p-3">Avg Per Month</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-b border-gray-200 h-12 hover:bg-gray-50">
              <td className="p-3">Rental Income</td>
              <td className="p-3">
                {cashflowFormatter(cardData.rentalIncome / cardData.months)}
              </td>
            </tr>
            <tr className="border-b border-gray-200 h-12 hover:bg-gray-50">
              <td className="p-3">Loan Interest</td>
              <td className="p-3">
                {cashflowFormatter(cardData.mortgageInterest / cardData.months)}
              </td>
            </tr>
            <tr className="border-b border-gray-200 h-12 hover:bg-gray-50">
              <td className="rounded-bl-2xl p-3">Profit</td>
              <td className="rounded-br-2xl p-3">
                {cashflowFormatter(cardData.profit / cardData.months)}
              </td>
            </tr>
          </tbody>
        </table>
        <table className="flex-1 mt-1 md:my-0 md:ml-1 text-left shadow-xl rounded-2xl bg-white overflow-hidden">
          <thead>
            <tr className="border-b border-gray-200 h-8 text-sm">
              <th className="font-semibold p-3">Project Metrics</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-b border-gray-200 h-12 hover:bg-gray-50">
              <td className="p-3">IRR</td>
              <td className="p-3">
                {percentageFormatter.format(
                  IRRCalculation(monthlyCashflow).postFinance
                )}
              </td>
            </tr>
            <tr className="border-b border-gray-200 h-12 hover:bg-gray-50">
              <td className="rounded-bl-2xl p-3">Margin On Cost</td>
              <td className="rounded-br-2xl p-3">
                {percentageFormatter.format(
                  occupierInvestorMOCCalculation(monthlyCashflow)
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="shadow-xl rounded-2xl bg-white p-3 mb-2">
        <h3 className="text-l mb-3">Cumulative Cash Position After Funding</h3>
        <Line data={chartData.data} options={chartData?.options} />
      </div>
      <div className="shadow-xl rounded-2xl bg-white p-3">
        <div
          className={`flex items-center justify-between text-l ${
            showCashflow ? "mb-3" : ""
          }`}
        >
          <div className="flex mr-3">
            <h3 className="text-l mr-3">Annual Cashflow After Funding</h3>
            <Tooltip message={message} extraClass="mt8 mt-md-48" />
          </div>
          <Button
            label={showCashflow ? "Hide" : "Show"}
            type={"button"}
            options={{
              styleType: "primary",
              buttonClass: "h-10 px-2",
              icon: showCashflow ? "collapse" : "expand",
              iconClass: "h-8 w-8 mr-2",
              onClick: () => setShowCashflow(!showCashflow),
            }}
          />
        </div>
        {showCashflow && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 h-8 text-sm">
                  <th className="font-semibold p-3">Year</th>
                  <th className="font-semibold p-3">Deposit</th>
                  <th className="font-semibold p-3">Rent</th>
                  <th className="font-semibold p-3">Opex</th>
                  <th className="font-semibold p-3">Net Sale</th>
                  <th className="font-semibold p-3">Mortgage</th>
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
                    <td className="p-3">{cashflowFormatter(c.equityUse)}</td>
                    <td className="p-3">{cashflowFormatter(c.rentalIncome)}</td>
                    <td className="p-3">{cashflowFormatter(c.opex)}</td>
                    <td className="p-3">{cashflowFormatter(c.netSale)}</td>
                    <td className="p-3">{cashflowFormatter(c.fundingCost)}</td>
                    <td className="p-3">{cashflowFormatter(c.totalIncome)}</td>
                    <td className="p-3">{cashflowFormatter(c.totalCost)}</td>
                    <td className="p-3">
                      {cashflowFormatter(c.postFinanceCashflow)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="text-sm">
                <tr className="font-semibold border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-3">Total</td>
                  <td className="p-3">{cashflowFormatter(total?.equityUse)}</td>
                  <td className="p-3">
                    {cashflowFormatter(total?.rentalIncome)}
                  </td>
                  <td className="p-3">{cashflowFormatter(total?.opex)}</td>
                  <td className="p-3">{cashflowFormatter(total?.netSale)}</td>
                  <td className="p-3">
                    {cashflowFormatter(total?.fundingCost)}
                  </td>
                  <td className="p-3">
                    {cashflowFormatter(total?.totalIncome)}
                  </td>
                  <td className="p-3">{cashflowFormatter(total?.totalCost)}</td>
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
  return { monthlyCashflow: state.cashflows.monthlyCashflow };
};

const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OwnerOccupierInvestorDashboard);
