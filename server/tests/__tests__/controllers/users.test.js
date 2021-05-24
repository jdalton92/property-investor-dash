const request = require("supertest");
const app = require("../../../app");
const dbHandler = require("../../dbHandler");
const factories = require("../../factories");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("../../../models/user");
const Token = require("../../../models/token");

const agent = request.agent(app);
let token;
beforeAll(async () => await dbHandler.connect());
beforeEach(async () => {
  token = await factories.getTestUserToken();
});
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

describe("Test User Controllers", () => {
  let res;

  it("Create new user", async () => {
    res = await agent.post("/api/users").send({
      email: "newUser@email.com",
      password: "password",
      checkPassword: "password",
      hasAcceptedTCs: true,
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body.email).toEqual("newUser@email.com");
  });

  it("Create invalid user", async () => {
    res = await agent.post("/api/users").send({
      email: "newUser@email.com",
      password: "password",
      checkPassword: "invalid",
      hasAcceptedTCs: true,
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Passwords must match");

    res = await agent.post("/api/users").send({
      email: "newUser@email.com",
      password: "password",
      checkPassword: "password",
      hasAcceptedTCs: false,
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Must accept terms and conditions");

    res = await agent.post("/api/users").send({
      email: "newUser@email.com",
      password: "a",
      checkPassword: "a",
      hasAcceptedTCs: true,
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Pasword minimum length 3");

    res = await agent.post("/api/users").send({
      email: process.env.TEST_USER_EMAIL,
      password: "password",
      checkPassword: "password",
      hasAcceptedTCs: true,
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Email in use");
  });

  it("Update user email", async () => {
    const testUser = await User.findOne({ email: process.env.TEST_USER_EMAIL });

    res = await agent
      .put(`/api/users/${testUser._id}`)
      .set("authorization", `bearer ${token}`)
      .send({
        newEmail: "newUser@email.com",
      });

    const user = await User.findOne({ email: "newUser@email.com" });
    expect(res.statusCode).toEqual(200);
    expect(user._id).toEqual(testUser._id);
  });

  it("Update user password", async () => {
    const testUser = await User.findOne({ email: process.env.TEST_USER_EMAIL });

    res = await agent
      .put(`/api/users/${testUser._id}`)
      .set("authorization", `bearer ${token}`)
      .send({
        oldPassword: process.env.TEST_USER_PASSWORD,
        newPassword: "newPassword",
        checkPassword: "newPassword",
      });

    expect(res.statusCode).toEqual(200);
  });

  it("Invalid update of user password", async () => {
    const testUser = await User.findOne({ email: process.env.TEST_USER_EMAIL });

    res = await agent
      .put(`/api/users/${testUser._id}`)
      .set("authorization", `bearer ${token}`)
      .send({
        oldPassword: "invalid",
        newPassword: "newPassword",
        checkPassword: "newPassword",
      });

    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual("Invalid password");

    res = await agent
      .put(`/api/users/${testUser._id}`)
      .set("authorization", `bearer ${token}`)
      .send({
        oldPassword: process.env.TEST_USER_PASSWORD,
        newPassword: "newPassword",
        checkPassword: "invalid",
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("New passwords must match");
  });

  it("Reset users password", async () => {
    const testUser = await User.findOne({ email: process.env.TEST_USER_EMAIL });
    const saltRounds = 10;
    const resetToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = await bcrypt.hash(resetToken, saltRounds);
    await new Token({
      user: testUser._id,
      tokenHash,
    }).save();

    res = await agent.post(`/api/users/reset-password`).send({
      id: testUser._id.toString(),
      token: resetToken,
      password: "newPassword",
      checkPassword: "newPassword",
    });

    expect(res.statusCode).toEqual(200);
  });
});
