const app = require("../../index");
const testSession = require("supertest-session");
const { V1_API } = require("../../utils/config");

jest.mock("../../utils/email");

const urlBase = `${V1_API}/contact`;

afterAll(async () => app.close());

describe("Contact route tests", () => {
  it("POST /", async () => {
    const unauthenticatedSession = testSession(app);

    res = await unauthenticatedSession.post(`${urlBase}/`).send({
      fullName: "Test Name",
      company: "Company name",
      email: "test@email.com",
      message: "Test message",
    });

    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual("Email sent");
  });
});
