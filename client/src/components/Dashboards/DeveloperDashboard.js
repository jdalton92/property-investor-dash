import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { setModal } from "../../reducers/navigationReducer";
import { CONSTANTS } from "../../static/constants";
import { editDashboard } from "../../reducers/dashboardReducer";
import {
  getCashflow,
  getDashboardAndCashflow,
} from "../../reducers/cashflowReducer";
import Tooltip from "../Shared/Tooltip";
import {
  cumulativeChartParse,
  annualChartParse,
  tableParse,
  developerMOCCalculation,
  fundingChartParse,
} from "../../utils/developerCalculations";
import {
  currencyFormatter,
  percentageFormatter,
  IRRCalculation,
  isEmpty,
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
  isFetchingDashboard,
  isFetchingCashflow,
  isEditing,
  getCashflow,
  getDashboardAndCashflow,
  currentDashboard,
  editDashboard,
  setModal,
  monthlyCashflow,
}) => {
  const [showPreFinanceCashflow, setShowPreFinanceCashflow] = useState(true);
  const [showPostFinanceCashflow, setShowPostFinanceCashflow] = useState(true);
  const id = useParams().id;
  const history = useHistory();

  useEffect(() => {
    if (id && !isEditing) {
      getDashboardAndCashflow(id);
    } else if (currentDashboard.type && currentDashboard.assumptions) {
      getCashflow(currentDashboard.type, currentDashboard.assumptions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSave = (e) => {
    e.preventDefault();
    setModal(CONSTANTS.MODALS.SAVEDASHBOARD, true);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    editDashboard();
    history.push("/developer/edit");
  };

  if (
    isFetchingDashboard ||
    isFetchingCashflow ||
    isEmpty(currentDashboard.assumptions)
  ) {
    return <Loader />;
  } else {
    // if (isEmpty(currentDashboard.assumptions)) {
    //   history.push("/developer/edit");
    // }
    const preFinanceMessage = developerTooltip.cashflowBeforeFunding.message;
    const postFinanceMessage = developerTooltip.cashflowAfterFunding.message;
    const annualChart = annualChartParse(monthlyCashflow);
    const cumulativeChart = cumulativeChartParse(monthlyCashflow);
    const tableData = tableParse(monthlyCashflow);
    const fundingChart = fundingChartParse(monthlyCashflow);
    const total = tableData?.totalCashflow;
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
                <td>{currencyFormatter.format(total?.totalRevenue)}</td>
              </tr>
              <tr>
                <td>Costs:</td>
                <td>{currencyFormatter.format(total?.totalCostsPreFinance)}</td>
              </tr>
              <tr>
                <td>Profit:</td>
                <td>{currencyFormatter.format(total?.preFinanceCashflow)}</td>
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
                    total?.totalRevenue / currentDashboard.assumptions.dwellings
                  )}
                </td>
              </tr>
              <tr>
                <td>Costs:</td>
                <td>
                  {currencyFormatter.format(
                    total?.totalCostsPreFinance /
                      currentDashboard.assumptions.dwellings
                  )}
                </td>
              </tr>
              <tr>
                <td>Profit:</td>
                <td>
                  {currencyFormatter.format(
                    total?.preFinanceCashflow /
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
                    IRRCalculation(monthlyCashflow).preFinance
                  )}
                </td>
              </tr>
              <tr>
                <td>Margin On Cost:</td>
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
            <div className="o-x-auto">
              <table className="w100 bg-1 p20 mb16 o-hidden">
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
                      <td>{currencyFormatter.format(c.acquisitionCosts)}</td>
                      <td>{currencyFormatter.format(c.TDC)}</td>
                      <td>{currencyFormatter.format(c.NOI)}</td>
                      <td>{currencyFormatter.format(c.netSale)}</td>
                      <td>{currencyFormatter.format(c.totalIncome)}</td>
                      <td>{currencyFormatter.format(c.preFinanceTotalCost)}</td>
                      <td>{currencyFormatter.format(c.preFinanceCashflow)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th>Total</th>
                    <td>{currencyFormatter.format(total?.acquisitionCosts)}</td>
                    <td>{currencyFormatter.format(total?.TDC)}</td>
                    <td>{currencyFormatter.format(total?.NOI)}</td>
                    <td>{currencyFormatter.format(total?.netSale)}</td>
                    <td>{currencyFormatter.format(total?.totalIncome)}</td>
                    <td>
                      {currencyFormatter.format(total?.preFinanceTotalCost)}
                    </td>
                    <td>
                      {currencyFormatter.format(total?.preFinanceCashflow)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
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
                <td>{currencyFormatter.format(total?.totalRevenue)}</td>
              </tr>
              <tr>
                <td>Costs:</td>
                <td>
                  {currencyFormatter.format(total?.totalCostsPostFinance)}
                </td>
              </tr>
              <tr>
                <td>Profit:</td>
                <td>{currencyFormatter.format(total?.postFinanceCashflow)}</td>
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
                    total?.totalRevenue / currentDashboard.assumptions.dwellings
                  )}
                </td>
              </tr>
              <tr>
                <td>Costs:</td>
                <td>
                  {currencyFormatter.format(
                    total?.totalCostsPostFinance /
                      currentDashboard.assumptions.dwellings
                  )}
                </td>
              </tr>
              <tr>
                <td>Profit:</td>
                <td>
                  {currencyFormatter.format(
                    total?.postFinanceCashflow /
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
                    IRRCalculation(monthlyCashflow).postFinance
                  )}
                </td>
              </tr>
              <tr>
                <td>Margin On Cost:</td>
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
            <div className="o-x-auto">
              <table className="w100 bg-1 p20 mb16 o-hidden">
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
                      <td>{currencyFormatter.format(c.acquisitionCosts)}</td>
                      <td>{currencyFormatter.format(c.TDC)}</td>
                      <td>{currencyFormatter.format(c.NOI)}</td>
                      <td>{currencyFormatter.format(c.netSale)}</td>
                      <td>{currencyFormatter.format(c.loanCosts)}</td>
                      <td>{currencyFormatter.format(c.totalIncome)}</td>
                      <td>
                        {currencyFormatter.format(c.postFinanceTotalCost)}
                      </td>
                      <td>{currencyFormatter.format(c.debtSource)}</td>
                      <td>{currencyFormatter.format(c.postFinanceCashflow)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th>Total</th>
                    <td>{currencyFormatter.format(total?.acquisitionCosts)}</td>
                    <td>{currencyFormatter.format(total?.TDC)}</td>
                    <td>{currencyFormatter.format(total?.NOI)}</td>
                    <td>{currencyFormatter.format(total?.netSale)}</td>
                    <td>{currencyFormatter.format(total?.loanCosts)}</td>
                    <td>{currencyFormatter.format(total?.totalIncome)}</td>
                    <td>
                      {currencyFormatter.format(total?.postFinanceTotalCost)}
                    </td>
                    <td>{currencyFormatter.format(total?.debtSource)}</td>
                    <td>
                      {currencyFormatter.format(total?.postFinanceCashflow)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    currentDashboard: state.dashboards.currentDashboard,
    isEditing: state.dashboards.isEditing,
    isFetchingDashboard: state.dashboards.isFetching,
    isFetchingCashflow: state.cashflow.isFetching,
    monthlyCashflow: state.cashflow.monthlyCashflow,
  };
};

const mapDispatchToProps = {
  setModal,
  getCashflow,
  getDashboardAndCashflow,
  editDashboard,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeveloperDashboard);
