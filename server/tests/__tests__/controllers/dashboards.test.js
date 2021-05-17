const request = require("supertest");
const app = require("../../../app");
const dbHandler = require("../../dbHandler");
const factories = require("../../factories");
const constants = require("../../constants");
const Dashboard = require("../../../models/dashboard");
const User = require("../../../models/user");

const agent = request.agent(app);
let token;
beforeAll(async () => await dbHandler.connect());
beforeEach(async () => {
  token = await factories.getTestUserToken();
});
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

describe("Test Dashboard Controllers", () => {
  it("Unauthorized GET / ", async () => {
    const res = await agent.get("/api/dashboards");

    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual("Login required");
  });

  it("Authorized Dashboard GET /", async () => {
    const testUser = await User.findOne({ email: process.env.TEST_USER_EMAIL });
    let dashboard = new Dashboard({
      user: testUser._id,
      description: "Test Description",
      address: "Test Address",
      type: "occupier",
      assumptions: constants.occupierAssumptions,
    });
    dashboard = await dashboard.save();

    const res = await agent
      .get("/api/dashboards")
      .set("authorization", `bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.resultsCount).toEqual(1);
    expect(res.body.results[0].description).toEqual(dashboard.description);
    expect(res.body.results[0].address).toEqual(dashboard.address);
    expect(res.body.results[0].type).toEqual(dashboard.type);
  });

  it("Authorized POST / ", async () => {
    const data = {
      description: "Test Dashboard",
      address: "Test Address",
      type: "developer",
      assumptions: constants.developerAssumptions,
    };

    const res = await agent
      .post("/api/dashboards")
      .set("authorization", `bearer ${token}`)
      .send(data);

    expect(res.statusCode).toEqual(201);
    expect(res.body.description).toEqual(data.description);
    expect(res.body.address).toEqual(data.address);
    expect(res.body.type).toEqual(data.type);
    expect(res.body.assumptions).toEqual(data.assumptions);
  });
});
