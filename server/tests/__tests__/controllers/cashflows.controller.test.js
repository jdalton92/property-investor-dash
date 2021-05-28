const dbHandler = require("../../dbHandler");
const {
  mockReq,
  mockRes,
  mockNext,
  getTestUserAndToken,
  getTestOccupierDashboard,
} = require("../../factories");
const { occupierDashboardAssumptions } = require("../../constants");
const {
  getCashflow,
  getCashflowAndDashboard,
} = require("../../../services/cashflows.service");
const {
  getCashflowController,
  getCashflowAndDashboardController,
} = require("../../../controllers/cashflows.controller");

describe("Cashflow controller tests", () => {
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

  it("Get cashflow", async () => {
    const req = mockReq({
      type: "occupier",
      assumptions: occupierDashboardAssumptions,
    });

    const cashflow = getCashflow("occupier", occupierDashboardAssumptions);

    await getCashflowController(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith(cashflow);
  });

  it("Get cashflow and dashboards", async () => {
    const { userData } = await getTestUserAndToken();
    const dashboard = await getTestOccupierDashboard(userData._id);
    const reqBody = {
      type: "occupier",
      assumptions: occupierDashboardAssumptions,
    };
    const options = { params: { id: dashboard._id } };
    const req = mockReq(reqBody, options);

    const cashflowAndDashboard = await getCashflowAndDashboard(dashboard._id);

    await getCashflowAndDashboardController(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith(cashflowAndDashboard);
  });
});
