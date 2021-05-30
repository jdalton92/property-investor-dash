const app = require("../../index");
const testSession = require("supertest-session");
const dbHandler = require("../dbHandler");
const User = require("../../models/user.model");
const { getTestUser, getPasswordResetToken } = require("../factories");
const { V1_API } = require("../../utils/config");

jest.mock("../../utils/email");

const urlBase = `${V1_API}/users`;
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

describe("Users route tests", () => {
  it("POST /", async () => {
    const res = await unauthenticatedSession.post(`${urlBase}/`).send({
      email: "newUser@email.com",
      password: "password",
      checkPassword: "password",
      hasAcceptedTCs: true,
    });

    expect(res.status).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        email: expect.any(String),
        dashboards: expect.any(Array),
        messagesRead: expect.any(Array),
        hasAcceptedTCs: expect.any(Boolean),
        roles: expect.any(Array),
      })
    );
  });

  it("Unauthenticated PUT /:id", async () => {
    const res = await unauthenticatedSession
      .put(`${urlBase}/${user._id}`)
      .send({
        newEmail: "newUser@email.com",
        oldPassword: process.env.TEST_USER_PASSWORD,
        newPassword: "newPassword",
        checkPassword: "newPassword",
        messagesRead: ["TESTMESSAGE"],
      });

    expect(res.status).toEqual(401);
    expect(res.body.message).toEqual("Login required");
  });

  it("Authenticated PUT /:id", async () => {
    const res = await authenticatedSession.put(`${urlBase}/${user._id}`).send({
      newEmail: "newUser@email.com",
      oldPassword: process.env.TEST_USER_PASSWORD,
      newPassword: "newPassword",
      checkPassword: "newPassword",
      messagesRead: ["TESTMESSAGE"],
    });

    expect(res.status).toEqual(200);
    expect(res.body.email).toEqual("newUser@email.com");
    expect(res.body.messagesRead).toEqual(["TESTMESSAGE"]);

    user = await User.findById(user._id);
    const passwordUpdated = await user.validatePassword("newPassword");
    expect(passwordUpdated).toBeTruthy();
  });

  it("Unauthenticated DELETE /:id", async () => {
    const res = await unauthenticatedSession.delete(`${urlBase}/${user._id}`);

    expect(res.status).toEqual(401);
    expect(res.body.message).toEqual("Login required");
  });

  it("Authenticated DELETE /:id", async () => {
    const res = await authenticatedSession
      .delete(`${urlBase}/${user._id}`)
      .send({ password: process.env.TEST_USER_PASSWORD });

    expect(res.status).toEqual(204);

    user = await User.findById(user._id);
    expect(user).toBeFalsy();
  });
});
