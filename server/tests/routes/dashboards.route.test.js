const app = require("../../index");
const testSession = require("supertest-session");
const dbHandler = require("../dbHandler");
const Dashboard = require("../../models/dashboard.model");
const User = require("../../models/user.model");
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
  investorDashboardAssumptions,
  developerDashboardAssumptions,
} = require("../constants");

const { V1_API } = require("../../utils/config");
const urlBase = `${V1_API}/dashboards`;
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

describe("Dashboard route tests", () => {
  it("Unauthenticated GET /", async () => {
    const res = await unauthenticatedSession.get(`${urlBase}/`);

    expect(res.status).toEqual(401);
    expect(res.body.message).toEqual("Login required");
  });

  it("Authenticated GET /", async () => {
    const occupierDashboard = await getTestOccupierDashboard(user._id);
    const investorDashboard = await getTestInvestorDashboard(user._id);
    const developerDashboard = await getTestDeveloperDashboard(user._id);
    authenticatedSession = await refreshTestUserAuthSession(
      authenticatedSession
    );

    const res = await authenticatedSession.get(`${urlBase}/`);

    expect(res.status).toEqual(200);
    expect(res.body.resultsCount).toEqual(3);
    const resultsIds = res.body.results.map((d) => d._id);
    expect(resultsIds).toEqual([
      occupierDashboard._id.toString(),
      investorDashboard._id.toString(),
      developerDashboard._id.toString(),
    ]);
  });

  it("Unauthenticated POST /", async () => {
    const res = await unauthenticatedSession.post(`${urlBase}/`);

    expect(res.status).toEqual(401);
    expect(res.body.message).toEqual("Login required");
  });

  it("Authenticated POST /", async () => {
    let res = await authenticatedSession.post(`${urlBase}/`).send({
      description: "Test description",
      address: "Test address",
      type: "occupier",
      assumptions: occupierDashboardAssumptions,
    });

    expect(res.status).toEqual(201);
    for (index in dashboardFields) {
      expect(res.body).toHaveProperty(dashboardFields[index]);
    }

    res = await authenticatedSession.post(`${urlBase}/`).send({
      description: "Test description",
      address: "Test address",
      type: "investor",
      assumptions: investorDashboardAssumptions,
    });
    expect(res.status).toEqual(201);
    for (index in dashboardFields) {
      expect(res.body).toHaveProperty(dashboardFields[index]);
    }

    res = await authenticatedSession.post(`${urlBase}/`).send({
      description: "Test description",
      address: "Test address",
      type: "developer",
      assumptions: developerDashboardAssumptions,
    });
    expect(res.status).toEqual(201);
    for (index in dashboardFields) {
      expect(res.body).toHaveProperty(dashboardFields[index]);
    }
  });

  it("Unauthenticated PUT /:id", async () => {
    await getTestOccupierDashboard(user._id);
    const res = await unauthenticatedSession.post(`${urlBase}/`);

    expect(res.status).toEqual(401);
    expect(res.body.message).toEqual("Login required");
  });

  it("Authenticated PUT /:id", async () => {
    const occupierDashboard = await getTestOccupierDashboard(user._id);
    authenticatedSession = await refreshTestUserAuthSession(
      authenticatedSession
    );

    let res = await authenticatedSession
      .put(`${urlBase}/${occupierDashboard._id}`)
      .send({
        description: "New description",
        address: "New address",
        type: "investor",
        assumptions: investorDashboardAssumptions,
      });

    expect(res.status).toEqual(200);
    expect(res.body.type).toEqual("investor");
  });

  it("Unauthenticated DELETE /:id", async () => {
    const occupierDashboard = await getTestOccupierDashboard(user._id);
    const res = await unauthenticatedSession.delete(
      `${urlBase}/${occupierDashboard._id}`
    );

    expect(res.status).toEqual(401);
    expect(res.body.message).toEqual("Login required");
  });

  it("Authenticated DELETE /:id", async () => {
    const occupierDashboard = await getTestOccupierDashboard(user._id);
    authenticatedSession = await refreshTestUserAuthSession(
      authenticatedSession
    );

    let res = await authenticatedSession.delete(
      `${urlBase}/${occupierDashboard._id}`
    );

    expect(res.status).toEqual(204);
    const dashboard = await Dashboard.findById(occupierDashboard._id);
    expect(dashboard).toBeFalsy();
    const testUser = await User.findById(user._id);
    expect(testUser.dashboards.length).toEqual(0);
  });
});
