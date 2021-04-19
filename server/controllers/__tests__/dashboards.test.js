const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");

describe("/api/dashboards", () => {
  let token;

  beforeAll(async (done) => {
    try {
      const res = await request(app).post("/api/login").send({
        email: "test@email.com",
        password: "test",
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
    const res = await request(app)
      .get("/api/dashboards")
      .set("authorization", `bearer ${token}`);

    expect(res.statusCode).toEqual(200);
  });
});
