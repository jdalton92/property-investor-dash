import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { setModal } from "../../reducers/navigationReducer";
import { CONSTANTS } from "../../static/constants";
import {
  getDashboard,
  preSaveDashboard,
} from "../../reducers/dashboardReducer";
import Tooltip from "../Shared/Tooltip";
import {
  cumulativeChartParse,
  annualChartParse,
  tableParse,
  developerCalculation,
  developerMOCCalculation,
  fundingChartParse,
} from "../../utils/developerDashboardDataParser";
import {
  currencyFormatter,
  percentageFormatter,
  IRRCalculation,
} from "../../utils/dashboardHelper";
import { developerTooltip } from "../../static/tooltipText";
import { Line, Bar } from "react-chartjs-2";
import Loader from "../Shared/Loader";
import { Icon } from "../Shared/Icon";
import SaveIcon from "../../styles/svg/save.svg";
import EditIcon from "../../styles/svg/edit.svg";
import ExpandIcon from "../../styles/svg/expand.svg";
import CollapseIcon from "../../styles/svg/collapse.svg";

const DeveloperDashboard = ({
  isFetching,
  currentDashboard,
  getDashboard,
  preSaveDashboard,
  setModal,
}) => {
  const [showPreFinanceCashflow, setShowPreFinanceCashflow] = useState(true);
  const [showPostFinanceCashflow, setShowPostFinanceCashflow] = useState(true);
  const id = useParams().id;
  const history = useHistory();

  useEffect(() => {
    if (id) {
      getDashboard(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSave = (e) => {
    e.preventDefault();
    setModal(CONSTANTS.MODALS.SAVEDASHBOARD, true);
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

  const isEmpty = (obj) =>
    Object.keys(obj).length === 0 && obj.constructor === Object;

  if (isFetching || (isEmpty(currentDashboard.assumptions) && id)) {
    return <Loader />;
  } else {
    if (isEmpty(currentDashboard.assumptions)) {
      history.push("/developer/edit");
    }
    const preFinanceMessage = developerTooltip.cashflowBeforeFunding.message;
    const postFinanceMessage = developerTooltip.cashflowAfterFunding.message;
    const rawData = developerCalculation(currentDashboard.assumptions);
    const annualChart = annualChartParse(rawData);
    const cumulativeChart = cumulativeChartParse(rawData);
    const tableData = tableParse(rawData);
    const fundingChart = fundingChartParse(rawData);
    return (
      <div className="fade-in">
        <div className="dash-row relative">
          <h2 className="f20 bold mt16 mb16">Developer Dashboard</h2>
          <div className="dash-btns flex-row">
            <button
              type="submit"
              className="form-button-p bs-3 font-white pt4 pb4 flex-row align-c justify-c"
              onClick={handleSave}
            >
              <Icon
                size={"20px"}
                url={SaveIcon}
                color={"white"}
                hover={false}
                active={false}
              />
              <span className="ml8">Save</span>
            </button>
            <button
              type="submit"
              className="form-button-s bs-3 font-white pt4 pb4 flex-row align-c justify-c"
              onClick={handleEdit}
            >
              <Icon
                size={"20px"}
                url={EditIcon}
                color={"white"}
                hover={false}
                active={false}
              />
              <span className="ml8">Edit</span>
            </button>
          </div>
        </div>
        <h2 className="f16 bold mt16 mb16">Pre Funding Metrics</h2>
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
                <td>Revenue:</td>
                <td>
                  {currencyFormatter.format(
                    tableData.summaryCashflow[0].totalRevenue
                  )}
                </td>
              </tr>
              <tr>
                <td>Costs:</td>
                <td>
                  {currencyFormatter.format(
                    tableData.summaryCashflow[0].totalCostsPreFinance
                  )}
                </td>
              </tr>
              <tr>
                <td>Profit:</td>
                <td>
                  {currencyFormatter.format(
                    tableData.summaryCashflow[0].preFinanceCashflow
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <table className="r bs-3 bg-1 p20 mb16 o-hidden">
            <thead>
              <tr>
                <th>Per Dwelling</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Revenue:</td>
                <td>
                  {currencyFormatter.format(
                    tableData.summaryCashflow[0].totalRevenue /
                      currentDashboard.assumptions.dwellings
                  )}
                </td>
              </tr>
              <tr>
                <td>Costs:</td>
                <td>
                  {currencyFormatter.format(
                    tableData.summaryCashflow[0].totalCostsPreFinance /
                      currentDashboard.assumptions.dwellings
                  )}
                </td>
              </tr>
              <tr>
                <td>Profit:</td>
                <td>
                  {currencyFormatter.format(
                    tableData.summaryCashflow[0].preFinanceCashflow /
                      currentDashboard.assumptions.dwellings
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <table className="r bs-3 bg-1 p20 mb16 o-hidden">
            <thead>
              <tr>
                <th>Unlevered Metrics</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>IRR:</td>
                <td>
                  {percentageFormatter.format(
                    IRRCalculation(rawData).preFinance
                  )}
                </td>
              </tr>
              <tr>
                <td>Margin On Cost:</td>
                <td>
                  {percentageFormatter.format(
                    developerMOCCalculation(rawData).preFinance
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
              type="submit"
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
            <table className="w100 bg-1 p20 mb16 o-hidden">
              <thead>
                <tr>
                  <th>Year</th>
                  <th className="dash-desktop">Acquisition Costs</th>
                  <th className="dash-desktop">TDC</th>
                  <th className="dash-desktop">NOI</th>
                  <th className="dash-desktop">Net Sale</th>
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
                      {currencyFormatter.format(c.acquisitionCosts)}
                    </td>
                    <td className="dash-desktop">
                      {currencyFormatter.format(c.TDC)}
                    </td>
                    <td className="dash-desktop">
                      {currencyFormatter.format(c.NOI)}
                    </td>
                    <td className="dash-desktop">
                      {currencyFormatter.format(c.netSale)}
                    </td>
                    <td className="dash-mobile">
                      {currencyFormatter.format(c.totalIncome)}
                    </td>
                    <td className="dash-mobile">
                      {currencyFormatter.format(c.preFinanceTotalCost)}
                    </td>
                    <td>{currencyFormatter.format(c.preFinanceCashflow)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th>Total</th>
                  <td className="dash-desktop">
                    {currencyFormatter.format(
                      tableData.summaryCashflow[0].acquisitionCosts
                    )}
                  </td>
                  <td className="dash-desktop">
                    {currencyFormatter.format(tableData.summaryCashflow[0].TDC)}
                  </td>
                  <td className="dash-desktop">
                    {currencyFormatter.format(tableData.summaryCashflow[0].NOI)}
                  </td>
                  <td className="dash-desktop">
                    {currencyFormatter.format(
                      tableData.summaryCashflow[0].netSale
                    )}
                  </td>
                  <td className="dash-mobile">
                    {currencyFormatter.format(
                      tableData.summaryCashflow[0].totalIncome
                    )}
                  </td>
                  <td className="dash-mobile">
                    {currencyFormatter.format(
                      tableData.summaryCashflow[0].preFinanceTotalCost
                    )}
                  </td>
                  <td>
                    {currencyFormatter.format(
                      tableData.summaryCashflow[0].preFinanceCashflow
                    )}
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>
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
                <td>Revenue:</td>
                <td>
                  {currencyFormatter.format(
                    tableData.summaryCashflow[0].totalRevenue
                  )}
                </td>
              </tr>
              <tr>
                <td>Costs:</td>
                <td>
                  {currencyFormatter.format(
                    tableData.summaryCashflow[0].totalCostsPostFinance
                  )}
                </td>
              </tr>
              <tr>
                <td>Profit:</td>
                <td>
                  {currencyFormatter.format(
                    tableData.summaryCashflow[0].postFinanceCashflow
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <table className="r bs-3 bg-1 p20 mb16 o-hidden">
            <thead>
              <tr>
                <th>Per Dwelling</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Revenue:</td>
                <td>
                  {currencyFormatter.format(
                    tableData.summaryCashflow[0].totalRevenue /
                      currentDashboard.assumptions.dwellings
                  )}
                </td>
              </tr>
              <tr>
                <td>Costs:</td>
                <td>
                  {currencyFormatter.format(
                    tableData.summaryCashflow[0].totalCostsPostFinance /
                      currentDashboard.assumptions.dwellings
                  )}
                </td>
              </tr>
              <tr>
                <td>Profit:</td>
                <td>
                  {currencyFormatter.format(
                    tableData.summaryCashflow[0].postFinanceCashflow /
                      currentDashboard.assumptions.dwellings
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <table className="r bs-3 bg-1 p20 mb16 o-hidden">
            <thead>
              <tr>
                <th>Levered Metrics</th>
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
                    developerMOCCalculation(rawData).postFinance
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
              type="submit"
              className="absolute form-button-p bs-3 font-white pt4 pb4 flex-row align-c justify-c"
              onClick={() =>
                setShowPostFinanceCashflow(!showPostFinanceCashflow)
              }
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
            <table className="w100 bg-1 p20 mb16 o-hidden">
              <thead>
                <tr>
                  <th>Year</th>
                  <th className="dash-desktop">Acquisition Costs</th>
                  <th className="dash-desktop">TDC</th>
                  <th className="dash-desktop">NOI</th>
                  <th className="dash-desktop">Net Sale</th>
                  <th className="dash-desktop">Funding Costs</th>
                  <th className="dash-mobile">Total Income</th>
                  <th className="dash-mobile">Total Costs</th>
                  <th className="dash-xs-mobile">Debt Source</th>
                  <th className="dash-desktop">Net Annual Cashflow</th>
                </tr>
              </thead>
              <tbody>
                {tableData?.annualCashflow.map((c) => (
                  <tr key={c.year}>
                    <td>{c.year}</td>
                    <td className="dash-desktop">
                      {currencyFormatter.format(c.acquisitionCosts)}
                    </td>
                    <td className="dash-desktop">
                      {currencyFormatter.format(c.TDC)}
                    </td>
                    <td className="dash-desktop">
                      {currencyFormatter.format(c.NOI)}
                    </td>
                    <td className="dash-desktop">
                      {currencyFormatter.format(c.netSale)}
                    </td>
                    <td className="dash-desktop">
                      {currencyFormatter.format(c.loanCosts)}
                    </td>
                    <td className="dash-mobile">
                      {currencyFormatter.format(c.totalIncome)}
                    </td>
                    <td className="dash-mobile">
                      {currencyFormatter.format(c.postFinanceTotalCost)}
                    </td>
                    <td className="dash-xs-mobile">
                      {currencyFormatter.format(c.debtSource)}
                    </td>
                    <td className="dash-desktop">
                      {currencyFormatter.format(c.postFinanceCashflow)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th>Total</th>
                  <td className="dash-desktop">
                    {currencyFormatter.format(
                      tableData.summaryCashflow[0].acquisitionCosts
                    )}
                  </td>
                  <td className="dash-desktop">
                    {currencyFormatter.format(tableData.summaryCashflow[0].TDC)}
                  </td>
                  <td className="dash-desktop">
                    {currencyFormatter.format(tableData.summaryCashflow[0].NOI)}
                  </td>
                  <td className="dash-desktop">
                    {currencyFormatter.format(
                      tableData.summaryCashflow[0].netSale
                    )}
                  </td>
                  <td className="dash-desktop">
                    {currencyFormatter.format(
                      tableData.summaryCashflow[0].loanCosts
                    )}
                  </td>
                  <td className="dash-mobile">
                    {currencyFormatter.format(
                      tableData.summaryCashflow[0].totalIncome
                    )}
                  </td>
                  <td className="dash-mobile">
                    {currencyFormatter.format(
                      tableData.summaryCashflow[0].postFinanceTotalCost
                    )}
                  </td>
                  <td className="dash-xs-mobile">
                    {currencyFormatter.format(
                      tableData.summaryCashflow[0].debtSource
                    )}
                  </td>
                  <td className="dash-desktop">
                    {currencyFormatter.format(
                      tableData.summaryCashflow[0].postFinanceCashflow
                    )}
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    currentDashboard: state.dashboards.currentDashboard,
    isFetching: state.dashboards.isFetching,
  };
};

const mapDispatchToProps = {
  setModal,
  getDashboard,
  preSaveDashboard,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeveloperDashboard);
