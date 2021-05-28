const dbHandler = require("../dbHandler");
const {
  mockReq,
  mockRes,
  mockNext,
  getTestUserAndToken,
  getTestOccupierDashboard,
  getTestInvestorDashboard,
  paginateArray,
} = require("../factories");
const {
  occupierDashboardAssumptions,
  investorDashboardAssumptions,
} = require("../constants");
const dashboardsService = require("../../services/dashboards.service");
const {
  createDashboardController,
  getDashboardsController,
  getDashboardController,
  updateDashboardController,
  deleteDashboardController,
} = require("../../controllers/dashboards.controller");

jest.mock("../../services/dashboards.service");

describe("Dashboards controller tests", () => {
  let res;
  let next;
  beforeAll(async () => {
    await dbHandler.connect();
    res = mockRes();
    next = mockNext();
  });
  afterEach(async () => {
    res = mockRes();
    next = mockNext();
  });
  afterEach(async () => await dbHandler.clearDatabase());
  afterAll(async () => await dbHandler.closeDatabase());

  it("Create dashboard", async () => {
    const { userData } = await getTestUserAndToken();
    const occupierDashboard = await getTestOccupierDashboard(userData._id);
    const description = "Dashboard description";
    const address = "Address";
    const type = "occupier";
    const reqBody = {
      description,
      address,
      type,
      assumptions: occupierDashboardAssumptions,
    };
    const options = {
      user: userData,
    };
    const req = mockReq(reqBody, options);

    dashboardsService.createDashboard.mockResolvedValue(occupierDashboard);
    await createDashboardController(req, res, next);
    expect(dashboardsService.createDashboard.mock.calls.length).toEqual(1);
    expect(dashboardsService.createDashboard.mock.calls[0]).toEqual([
      userData._id,
      description,
      address,
      type,
      occupierDashboardAssumptions,
    ]);
    expect(res.status).toBeCalledWith(201);
    expect(res.json).toBeCalledWith(occupierDashboard);
  });

  it("Get dashboard", async () => {
    const { userData } = await getTestUserAndToken();
    const occupierDashboard = await getTestOccupierDashboard(userData._id);
    const reqBody = undefined;
    const options = {
      params: { id: occupierDashboard._id },
    };
    const req = mockReq(reqBody, options);

    dashboardsService.getDashboard.mockResolvedValue(occupierDashboard);
    await getDashboardController(req, res, next);
    expect(dashboardsService.getDashboard.mock.calls.length).toEqual(1);
    expect(dashboardsService.getDashboard.mock.calls[0]).toEqual([
      occupierDashboard._id,
    ]);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith(occupierDashboard);
  });

  it("Get dashboards", async () => {
    const { userData } = await getTestUserAndToken();
    const occupierDashboard1 = await getTestOccupierDashboard(userData._id);
    const occupierDashboard2 = await getTestOccupierDashboard(userData._id);
    const occupierDashboard3 = await getTestOccupierDashboard(userData._id);
    const reqBody = undefined;
    const page = 1;
    const limit = 10;
    const options = {
      user: userData,
      query: { type: "occupier", page, limit },
    };
    const req = mockReq(reqBody, options);

    const paginatedDashboards = paginateArray(
      [occupierDashboard1, occupierDashboard2, occupierDashboard3],
      { page, limit }
    );

    dashboardsService.getDashboards.mockResolvedValue(paginatedDashboards);
    await getDashboardsController(req, res, next);
    expect(dashboardsService.getDashboards.mock.calls.length).toEqual(1);
    expect(dashboardsService.getDashboards.mock.calls[0]).toEqual([
      userData._id,
      "occupier",
      { page, limit },
    ]);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith(paginatedDashboards);
  });

  it("Update dashboard", async () => {
    const { userData } = await getTestUserAndToken();
    const occupierDashboard = await getTestOccupierDashboard(userData._id);
    const investorDashboard = await getTestInvestorDashboard(userData._id);
    const type = "investor";
    const description = "Updated dashboard description";
    const address = "Updated address";
    const reqBody = {
      type,
      description,
      address,
      assumptions: investorDashboardAssumptions,
    };
    const options = {
      params: { id: occupierDashboard._id },
    };
    const req = mockReq(reqBody, options);

    dashboardsService.updateDashboard.mockResolvedValue(investorDashboard);
    await updateDashboardController(req, res, next);
    expect(dashboardsService.updateDashboard.mock.calls.length).toEqual(1);
    expect(dashboardsService.updateDashboard.mock.calls[0]).toEqual([
      occupierDashboard._id,
      type,
      address,
      description,
      investorDashboardAssumptions,
    ]);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith(investorDashboard);
  });

  it("Delete dashboard", async () => {
    const { userData } = await getTestUserAndToken();
    const occupierDashboard = await getTestOccupierDashboard(userData._id);
    const reqBody = undefined;
    const options = {
      user: userData,
      params: {
        id: occupierDashboard._id,
      },
    };
    const req = mockReq(reqBody, options);

    await deleteDashboardController(req, res, next);
    expect(dashboardsService.deleteDashboard.mock.calls.length).toEqual(1);
    expect(dashboardsService.deleteDashboard.mock.calls[0]).toEqual([
      userData._id,
      occupierDashboard._id,
    ]);
    expect(res.status).toBeCalledWith(204);
    expect(res.end).toBeCalled();
  });
});
