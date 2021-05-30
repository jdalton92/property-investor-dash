const dbHandler = require("../dbHandler");
const {
  getOccupierInvestorCashflow,
  getDeveloperCashflow,
} = require("../../utils/cashflows");
const {
  occupierDashboardAssumptions,
  investorDashboardAssumptions,
  developerDashboardAssumptions,
} = require("../constants");
const { getTestUser, getTestDeveloperDashboard } = require("../factories");
const {
  getCashflowAndDashboard,
  getCashflow,
} = require("../../services/cashflows.service");

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

describe("Cashflow Service Tests", () => {
  it("Get cashflow", async () => {
    let cashflow = getOccupierInvestorCashflow(occupierDashboardAssumptions);
    let res = getCashflow("occupier", occupierDashboardAssumptions);
    expect(res).toEqual(cashflow);

    cashflow = getOccupierInvestorCashflow(investorDashboardAssumptions);
    res = getCashflow("investor", investorDashboardAssumptions);
    expect(res).toEqual(cashflow);

    cashflow = getDeveloperCashflow(developerDashboardAssumptions);
    res = getCashflow("developer", developerDashboardAssumptions);
    expect(res).toEqual(cashflow);
  });

  it("Get cashflow and dashboard", async () => {
    const user = await getTestUser();
    const testDashboard = await getTestDeveloperDashboard(user._id);
    const cashflow = getDeveloperCashflow(testDashboard.assumptions);

    const res = await getCashflowAndDashboard(testDashboard._id);
    expect(res.cashflow).toEqual(cashflow);
    expect(res.dashboard._id).toEqual(testDashboard._id);
  });
});
