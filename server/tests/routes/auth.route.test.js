const request = require("supertest");
const app = require("../../app");
const dbHandler = require("../dbHandler");
const authController = require("../../controllers/auth.controller");
const { getTestUserAndToken } = require("../factories");
const { V1_API } = require("../../utils/config");

const agent = request.agent(app);
const urlBase = `${V1_API}/auth`;

jest.mock("../../controllers/auth.controller");

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

describe("Auth route tests", () => {
  it("POST /login", async () => {
    const userAndToken = await getTestUserAndToken();
    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;
    authController.loginController.mockResolvedValue(userAndToken);

    const res = await agent.post(`${urlBase}/login`).send({
      email,
      password,
    });

    expect(authController.loginController.mock.calls.length).toEqual(1);
    expect(authController.loginController.mock.calls[0]).toEqual([
      email,
      password,
    ]);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(userAndToken);
  });
});
