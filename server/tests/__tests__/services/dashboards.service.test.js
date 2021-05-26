const dbHandler = require("../../dbHandler");
const User = require("../../../models/user.model");
const {
  occupierDashboardAssumptions,
  investorDashboardAssumptions,
  developerDashboardAssumptions,
} = require("../../constants");
const {
  getTestUserAndToken,
  getTestOccupierDashboard,
  getTestInvestorDashboard,
  getTestDeveloperDashboard,
} = require("../../factories");
const {
  getDashboard,
  getDashboards,
  createDashboard,
  updateDashboard,
  deleteDashboard,
} = require("../../../services/dashboards.service");
const Dashboard = require("../../../models/dashboard.model");

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

const paginateOptions = {};

describe("Dashboard Service Tests", () => {
  it("Get dashboard", async () => {
    const { userData } = await getTestUserAndToken();
    const dashboard = await getTestOccupierDashboard(userData._id);
    const res = await getDashboard(dashboard._id);
    expect(res.type).toEqual("occupier");
  });

  it("Get dashboards", async () => {
    const { userData } = await getTestUserAndToken();
    const invalidType = "invalid";
    await expect(() =>
      getDashboards(userData._id, invalidType, paginateOptions)
    ).rejects.toThrow("`type` must be 'occupier', 'investor', or 'developer'");

    await getTestOccupierDashboard(userData._id);
    await getTestInvestorDashboard(userData._id);
    await getTestDeveloperDashboard(userData._id);

    const res = await getDashboards(userData._id, null, paginateOptions);

    expect(res.resultsCount).toEqual(3);
    expect(res.results.map((d) => d.type)).toEqual([
      "occupier",
      "investor",
      "developer",
    ]);
  });

  it("Create dashboard", async () => {
    const { userData } = await getTestUserAndToken();
    const description = "Description";
    const address = "address";
    const invalidType = "invalid";

    await expect(() =>
      createDashboard(
        userData._id,
        description,
        address,
        invalidType,
        occupierDashboardAssumptions
      )
    ).rejects.toThrow("`type` must be 'occupier', 'investor', or 'developer'");

    const occupierResponse = await createDashboard(
      userData._id,
      description,
      address,
      "occupier",
      occupierDashboardAssumptions
    );
    expect(occupierResponse.assumptions).toEqual(occupierDashboardAssumptions);

    const investorResponse = await createDashboard(
      userData._id,
      description,
      address,
      "investor",
      investorDashboardAssumptions
    );
    expect(investorResponse.assumptions).toEqual(investorDashboardAssumptions);

    const developerResponse = await createDashboard(
      userData._id,
      description,
      address,
      "developer",
      developerDashboardAssumptions
    );
    expect(developerResponse.assumptions).toEqual(
      developerDashboardAssumptions
    );

    const user = await User.findById(userData._id);
    expect(user.dashboards.toObject()).toEqual([
      occupierResponse._id,
      investorResponse._id,
      developerResponse._id,
    ]);
  });

  it("Update dashboard", async () => {
    const { userData } = await getTestUserAndToken();
    const dashboard = await getTestOccupierDashboard(userData._id);

    const type = "occupier";
    const address = "New address";
    const description = "New description";
    const assumptions = {
      ...occupierDashboardAssumptions,
      purchasePrice: 500,
    };

    const res = await updateDashboard(
      dashboard._id,
      type,
      address,
      description,
      assumptions
    );
    expect(res.address).toEqual(address);
    expect(res.description).toEqual(description);
    expect(res.assumptions.purchasePrice).toEqual(assumptions.purchasePrice);
  });

  it("Delete dashboard", async () => {
    const { userData } = await getTestUserAndToken();
    const occupierDashboard = await getTestOccupierDashboard(userData._id);
    const investorDashboard = await getTestInvestorDashboard(userData._id);

    await deleteDashboard(userData._id, occupierDashboard._id);

    const dashboard = await Dashboard.findById(occupierDashboard._id);
    expect(dashboard).toBeFalsy();

    const user = await User.findById(userData._id);
    expect(user.dashboards.toObject()).toEqual([investorDashboard._id]);
  });
});
