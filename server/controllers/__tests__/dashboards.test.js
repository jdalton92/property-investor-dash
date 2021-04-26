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
    const res = await request(app).get("/api/dashboards");

    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual("Login required");
  });

  it("Authorized GET / ", async () => {
    await request(app)
      .post("/api/dashboards")
      .set("authorization", `bearer ${token}`)
      .send({
        description: "Test Dashboard",
        address: "Test Address",
        type: "developer",
        assumptions: constants.developerAssumptions,
      });

    const res = await request(app)
      .get("/api/dashboards")
      .set("authorization", `bearer ${token}`);

    console.log(res.body);

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(1);
  });
});
