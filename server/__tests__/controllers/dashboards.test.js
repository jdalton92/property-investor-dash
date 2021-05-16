const request = require("supertest");
const app = require("../../app");
const dbHandler = require("../dbHandler");
const constants = require("../constants");

const agent = request.agent(app);
let token;
beforeAll(async () => {
  token = await dbHandler.connectAndCreateUser();
});
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

describe("Test Dashboard Controllers", () => {
  it("Unauthorized GET / ", async () => {
    const res = await agent.get("/api/dashboards");

    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual("Login required");
  });

  it("Authorized GET / ", async () => {
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
