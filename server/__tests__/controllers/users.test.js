const request = require("supertest");
const app = require("../../app");
const dbHandler = require("../dbHandler");
const User = require("../../models/user");

const agent = request.agent(app);
let token;
beforeAll(async () => {
  token = await dbHandler.connectAndCreateUser();
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
    const existingUser = new User({
      email: "user@email.com",
      passwordHash: "passwordHash",
      hasAcceptedTCs: true,
    });
    await existingUser.save();

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
      email: "user@email.com",
      password: "password",
      checkPassword: "password",
      hasAcceptedTCs: true,
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Email in use");
  });

  it("Update user email", async () => {
    const existingUser = new User({
      email: "user@email.com",
      passwordHash: "passwordHash",
      hasAcceptedTCs: true,
    });
    await existingUser.save();

    res = await agent
      .put(`/api/users/${existingUser._id}`)
      .set("authorization", `bearer ${token}`)
      .send({
        newEmail: "newUser@email.com",
      });

    const user = await User.findOne({ email: "newUser@email.com" });
    expect(res.statusCode).toEqual(200);
    expect(user._id).toEqual(existingUser._id);
  });

  it("Update user password", async () => {
    const existingUser = new User({
      email: "user@email.com",
      passwordHash: "passwordHash",
      hasAcceptedTCs: true,
    });
    await existingUser.save();

    res = await agent
      .put(`/api/users/${existingUser._id}`)
      .set("authorization", `bearer ${token}`)
      .send({
        oldPassword: "", // TODO
        newPassword: "test",
      });

    expect(res.statusCode).toEqual(200);
  });
});
