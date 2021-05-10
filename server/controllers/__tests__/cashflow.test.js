const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");
const constants = require("./constants");

describe("/api/dashboards", () => {
  let token;

  beforeAll(async (done) => {
    try {
      const res = await request(app).post("/api/login").send({
        email: process.env.TEST_USER_EMAIL,
        password: process.env.TEST_USER_PASSWORD,
      });
      token = res.body.token;
      done();
    } catch (e) {
      done(e);
    }
  });

  afterAll(async (done) => {
    try {
      await mongoose.connection.close();
      await app.close();
      done();
    } catch (e) {
      done(e);
    }
  });

  it("Unauthorized GET / ", async () => {
    const res = await request(app).get("/api/cashflow");

    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual("Login required");
  });

  it("Invalid GET / ", async () => {
    const res = await request(app)
      .post("/api/cashflow")
      .set("authorization", `bearer ${token}`)
      .send({
        type: "invalid",
        assumptions: {
          test: "test",
        },
      });

    console.log(res);

    expect(res.statusCode).toEqual(400);
  });

  it("Invalid occupier GET / ", async () => {
    const res = await request(app)
      .post("/api/cashflow")
      .set("authorization", `bearer ${token}`)
      .send({
        type: "occupier",
        assumptions: {
          test: "test",
        },
      });

    console.log(res);

    expect(res.statusCode).toEqual(400);
  });

  it("Invalid investor GET / ", async () => {
    const res = await request(app)
      .post("/api/cashflow")
      .set("authorization", `bearer ${token}`)
      .send({
        type: "investor",
        assumptions: constants.investorAssumptions,
      });

    expect(res.statusCode).toEqual(200);
    // TODO: expect(res.body.length).toEqual(1);
  });

  it("Invalid developer GET / ", async () => {
    const res = await request(app)
      .post("/api/cashflow")
      .set("authorization", `bearer ${token}`)
      .send({
        type: "developer",
        assumptions: {
          test: "test",
        },
      });

    expect(res.statusCode).toEqual(200);
    // TODO: expect(res.body.length).toEqual(1);
  });

  it("Valid occupier GET / ", async () => {
    const res = await request(app)
      .post("/api/cashflow")
      .set("authorization", `bearer ${token}`)
      .send({
        type: "occupier",
        assumptions: {
          test: "test",
        },
      });

    expect(res.statusCode).toEqual(200);
    // TODO: expect(res.body.length).toEqual(1);
  });

  it("Valid investor GET / ", async () => {
    const res = await request(app)
      .post("/api/cashflow")
      .set("authorization", `bearer ${token}`)
      .send({
        type: "investor",
        assumptions: constants.investorAssumptions,
      });

    expect(res.statusCode).toEqual(200);
    // TODO: expect(res.body.length).toEqual(1);
  });

  it("Valid developer GET / ", async () => {
    const res = await request(app)
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
