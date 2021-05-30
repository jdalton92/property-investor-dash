const app = require("../../index");
const testSession = require("supertest-session");
const dbHandler = require("../dbHandler");
const { getTestUser, getPasswordResetToken } = require("../factories");
const { V1_API } = require("../../utils/config");

jest.mock("../../utils/email");

const urlBase = `${V1_API}/auth`;
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

describe("Auth route tests", () => {
  it("POST /init-user", async () => {
    let res = await unauthenticatedSession.post(`${urlBase}/init-user`);

    expect(res.status).toEqual(204);
    expect(res.body).toEqual({});

    res = await authenticatedSession.post(`${urlBase}/init-user`);

    expect(res.status).toEqual(200);
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

  it("POST /login", async () => {
    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;

    const res = await unauthenticatedSession.post(`${urlBase}/login`).send({
      email,
      password,
    });

    expect(res.status).toEqual(200);
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

  it("POST /logout", async () => {
    const res = await authenticatedSession.post(`${urlBase}/logout`);

    expect(res.status).toEqual(204);
    expect(res.body).toEqual({});
  });

  it("POST /demo", async () => {
    await getTestUser(process.env.DEMO_USER_EMAIL);
    const res = await unauthenticatedSession.post(`${urlBase}/demo`);

    expect(res.status).toEqual(200);
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

  it("POST /request-password-reset", async () => {
    const email = process.env.TEST_USER_EMAIL;
    const res = await unauthenticatedSession
      .post(`${urlBase}/request-password-reset`)
      .send({ email });

    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual(`An email has been sent to ${email}`);
  });

  it("POST /reset-password", async () => {
    const id = user._id;
    const token = await getPasswordResetToken(id);
    const password = "password";
    const checkPassword = "password";

    const res = await unauthenticatedSession
      .post(`${urlBase}/reset-password`)
      .send({ id, token, password, checkPassword });

    expect(res.status).toEqual(200);
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
});
