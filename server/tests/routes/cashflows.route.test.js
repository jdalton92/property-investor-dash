const app = require("../../index");
const testSession = require("supertest-session");
const dbHandler = require("../dbHandler");
const {
  getTestUser,
  refreshTestUserAuthSession,
  getTestOccupierDashboard,
  getTestInvestorDashboard,
  getTestDeveloperDashboard,
} = require("../factories");
const {
  dashboardFields,
  occupierDashboardAssumptions,
  occupierCashflowFields,
  investorDashboardAssumptions,
  investorCashflowFields,
  developerDashboardAssumptions,
  developerCashflowFields,
} = require("../constants");

const { V1_API } = require("../../utils/config");
const urlBase = `${V1_API}/cashflows`;
let unauthenticatedSession = null;
let authenticatedSession = null;
let user = null;

beforeAll(async () => await dbHandler.connect());
beforeEach(async () => {
  unauthenticatedSession = testSession(app);
  authenticatedSession = testSession(app);
  user = await getTestUser();
  await authenticatedSession.post(`${V1_API}/auth/login`).send({
    email: process.env.TEST_USER_EMAIL,
    password: process.env.TEST_USER_PASSWORD,
  });
});
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => {
  await dbHandler.closeDatabase();
  app.close();
});

describe("Cashflow route tests", () => {
  it("Unauthenticated POST /", async () => {
    let res = await unauthenticatedSession.post(`${urlBase}/`).send({
      type: "occupier",
      assumptions: occupierDashboardAssumptions,
    });

    expect(res.status).toEqual(200);
    for (index in occupierCashflowFields) {
      expect(res.body[0]).toHaveProperty(occupierCashflowFields[index]);
    }

    res = await unauthenticatedSession.post(`${urlBase}/`).send({
      type: "investor",
      assumptions: investorDashboardAssumptions,
    });

    expect(res.status).toEqual(200);
    for (index in investorCashflowFields) {
      expect(res.body[0]).toHaveProperty(investorCashflowFields[index]);
    }

    res = await unauthenticatedSession.post(`${urlBase}/`).send({
      type: "developer",
      assumptions: developerDashboardAssumptions,
    });

    expect(res.status).toEqual(200);
    for (index in developerCashflowFields) {
      expect(res.body[0]).toHaveProperty(developerCashflowFields[index]);
    }
  });

  it("Unauthenticated GET /:id", async () => {
    const dashboard = await getTestOccupierDashboard(user._id);

    res = await unauthenticatedSession.get(`${urlBase}/${dashboard._id}`);

    expect(res.status).toEqual(401);
    expect(res.body.message).toEqual("Login required");
  });

  it("Authenticated GET /:id", async () => {
    const occupierDashboard = await getTestOccupierDashboard(user._id);
    const investorDashboard = await getTestInvestorDashboard(user._id);
    const developerDashboard = await getTestDeveloperDashboard(user._id);
    authenticatedSession = await refreshTestUserAuthSession(
      authenticatedSession
    );

    let res = await authenticatedSession.get(
      `${urlBase}/${occupierDashboard._id}`
    );
    expect(res.status).toEqual(200);
    for (index in dashboardFields) {
      expect(res.body.dashboard).toHaveProperty(dashboardFields[index]);
    }
    for (index in occupierCashflowFields) {
      expect(res.body.cashflow[0]).toHaveProperty(
        occupierCashflowFields[index]
      );
    }

    res = await authenticatedSession.get(`${urlBase}/${investorDashboard._id}`);
    expect(res.status).toEqual(200);
    for (index in dashboardFields) {
      expect(res.body.dashboard).toHaveProperty(dashboardFields[index]);
    }
    for (index in investorCashflowFields) {
      expect(res.body.cashflow[0]).toHaveProperty(
        investorCashflowFields[index]
      );
    }

    res = await authenticatedSession.get(
      `${urlBase}/${developerDashboard._id}`
    );
    expect(res.status).toEqual(200);
    for (index in dashboardFields) {
      expect(res.body.dashboard).toHaveProperty(dashboardFields[index]);
    }
    for (index in developerCashflowFields) {
      expect(res.body.cashflow[0]).toHaveProperty(
        developerCashflowFields[index]
      );
    }
  });
});
