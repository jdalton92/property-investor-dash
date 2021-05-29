const dbHandler = require("../dbHandler");
const {
  mockReq,
  mockRes,
  mockNext,
  getTestUser,
  getPasswordResetToken,
} = require("../factories");
const authService = require("../../services/auth.service");
const {
  loginController,
  logoutController,
  demoUserController,
  requestPasswordResetController,
  resetPasswordController,
} = require("../../controllers/auth.controller");

jest.mock("../../services/auth.service");

describe("Auth controller tests", () => {
  let res;
  let next;
  beforeAll(async () => {
    await dbHandler.connect();
    res = mockRes();
    next = mockNext();
  });
  afterEach(async () => {
    res = mockRes();
    next = mockNext();
  });
  afterEach(async () => await dbHandler.clearDatabase());
  afterAll(async () => await dbHandler.closeDatabase());

  it("Login user", async () => {
    const user = await getTestUser();
    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;
    const req = mockReq({
      email,
      password,
    });

    authService.loginUser.mockResolvedValue(user);
    await loginController(req, res, next);
    expect(authService.loginUser.mock.calls.length).toEqual(1);
    expect(authService.loginUser.mock.calls[0]).toEqual([email, password]);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith(user);
  });

  it("Logout user", async () => {
    const reqBody = undefined;
    const options = { session: { destroy: jest.fn() } };
    const req = mockReq(reqBody, options);
    await logoutController(req, res, next);
    expect(res.status).toBeCalledWith(204);
    expect(res.end).toBeCalled();
  });

  it("Login with demo user", async () => {
    const user = await getTestUser(process.env.DEMO_USER_EMAIL);
    const req = mockReq();

    authService.demoUser.mockResolvedValue(user);
    await demoUserController(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith(user);
  });

  it("Request password reset", async () => {
    const email = "test@email.com";
    await getTestUser(email);
    const req = mockReq({ email });

    await requestPasswordResetController(req, res, next);
    expect(authService.requestPasswordReset.mock.calls.length).toEqual(1);
    expect(authService.requestPasswordReset.mock.calls[0]).toEqual([email]);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      message: `An email has been sent to ${email}`,
    });
  });

  it("Reset password", async () => {
    const user = await getTestUser();
    const id = user._id;
    const token = await getPasswordResetToken(id);
    const password = process.env.TEST_USER_PASSWORD;
    const checkPassword = process.env.TEST_USER_PASSWORD;

    const req = mockReq({ id, token, password, checkPassword });
    authService.resetPassword.mockResolvedValue(user);

    await resetPasswordController(req, res, next);
    expect(authService.resetPassword.mock.calls.length).toEqual(1);
    expect(authService.resetPassword.mock.calls[0]).toEqual([
      id,
      token,
      password,
      checkPassword,
    ]);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith(user);
  });
});
