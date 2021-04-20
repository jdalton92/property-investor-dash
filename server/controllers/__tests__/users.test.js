const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");

describe("/api/users", () => {
  afterAll(async (done) => {
    try {
      await mongoose.connection.close();
      await app.close();
      done();
    } catch (e) {
      done(e);
    }
  });

  it("POST / ", async () => {
    const res = await request(app).post("/api/users").send({
      email: "newUser@email.com",
      password: "password",
      checkPassword: "password",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body.email).toEqual("newUser@email.com");
  });
});
