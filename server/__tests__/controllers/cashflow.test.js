const request = require("supertest");
const app = require("../../app");
const Dashboard = require("../../models/dashboard");
const constants = require("../constants");
const dbHandler = require("../dbHandler");

const agent = request.agent(app);
let token;
beforeAll(async () => {
  token = await dbHandler.connectAndCreateUser();
});
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

describe("/api/dashboards", () => {
  let res;

  it("Anonymous POST / is allowed", async () => {
    res = await agent.post("/api/cashflow").send({
      type: "occupier",
      assumptions: constants.occupierAssumptions,
    });

    expect(res.statusCode).toEqual(200);
  });

  it("Unauthenticated GET /:id", async () => {
    let dashboard = new Dashboard({
      description: "Test Description",
      address: "Test Address",
      type: "occupier",
      assumptions: constants.occupierAssumptions,
    });
    dashboard = await dashboard.save();

    res = await agent.get(`/api/cashflow/${dashboard._id}`);

    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual("Login required");
  });

  it("Authenticated GET /:id", async () => {
    let dashboard = new Dashboard({
      description: "Test Description",
      address: "Test Address",
      type: "occupier",
      assumptions: constants.occupierAssumptions,
    });
    dashboard = await dashboard.save();

    res = await agent
      .get(`/api/cashflow/${dashboard._id}`)
      .set("authorization", `bearer ${token}`);

    expect(res.statusCode).toEqual(200);
  });

  it("Invalid POST / ", async () => {
    res = await agent
      .post("/api/cashflow")
      .set("authorization", `bearer ${token}`)
      .send({
        type: "invalid",
        assumptions: {
          test: "test",
        },
      });

    expect(res.statusCode).toEqual(400);
  });

  it("Invalid occupier POST / ", async () => {
    res = await agent
      .post("/api/cashflow")
      .set("authorization", `bearer ${token}`)
      .send({
        type: "occupier",
        assumptions: {
          test: "test",
        },
      });

    expect(res.statusCode).toEqual(400);
  });

  it("Invalid investor POST / ", async () => {
    res = await agent
      .post("/api/cashflow")
      .set("authorization", `bearer ${token}`)
      .send({
        type: "investor",
        assumptions: {
          test: "test",
        },
      });

    expect(res.statusCode).toEqual(400);
    // TODO: expect(res.body.length).toEqual(1);
  });

  it("Invalid developer POST / ", async () => {
    res = await agent
      .post("/api/cashflow")
      .set("authorization", `bearer ${token}`)
      .send({
        type: "developer",
        assumptions: {
          test: "test",
        },
      });

    expect(res.statusCode).toEqual(400);
    // TODO: expect(res.body.length).toEqual(1);
  });

  it("Valid occupier POST / ", async () => {
    res = await agent
      .post("/api/cashflow")
      .set("authorization", `bearer ${token}`)
      .send({
        type: "occupier",
        assumptions: constants.occupierAssumptions,
      });

    expect(res.statusCode).toEqual(200);
    // TODO: expect(res.body.length).toEqual(1);
  });

  it("Valid investor POST / ", async () => {
    res = await agent
      .post("/api/cashflow")
      .set("authorization", `bearer ${token}`)
      .send({
        type: "investor",
        assumptions: constants.investorAssumptions,
      });

    expect(res.statusCode).toEqual(200);
    // TODO: expect(res.body.length).toEqual(1);
  });

  it("Valid developer POST / ", async () => {
    res = await agent
      .post("/api/cashflow")
      .set("authorization", `bearer ${token}`)
      .send({
        type: "developer",
        assumptions: constants.developerAssumptions,
      });

    expect(res.statusCode).toEqual(200);
    // TODO: expect(res.body.length).toEqual(1);
  });
});
