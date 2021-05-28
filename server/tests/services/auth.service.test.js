const dbHandler = require("../dbHandler");
const sendEmail = require("../../../utils/email");
const { getPasswordResetToken, getTestUserAndToken } = require("../factories");
const {
  loginUser,
  demoUser,
  requestPasswordReset,
  resetPassword,
} = require("../../services/auth.service");

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

jest.mock("../../utils/email");

describe("Auth Service Tests", () => {
  it("Login user", async () => {
    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;

    await expect(() => loginUser()).rejects.toThrow(
      "Provide both email and password"
    );
    await expect(() => loginUser(email, "invalid-password")).rejects.toThrow(
      "Invalid email or password"
    );

    const { token, userData } = await getTestUserAndToken();
    const res = await loginUser(email, password);
    expect(res.token).toEqual(token);
    expect(res.userData._id).toEqual(userData._id);
  });

  it("Demo user", async () => {
    await expect(() => demoUser()).rejects.toThrow("Demo user not found");

    const email = process.env.DEMO_USER_EMAIL;
    const password = process.env.DEMO_USER_PASSWORD;

    const { token, userData } = await getTestUserAndToken(email, password);

    const res = await demoUser();

    expect(res.token).toEqual(token);
    expect(res.userData._id).toEqual(userData._id);
  });

  it("Request password reset", async () => {
    await expect(() => requestPasswordReset()).rejects.toThrow(
      "Please provide email"
    );
    await expect(() =>
      requestPasswordReset("invalid@email.com")
    ).rejects.toThrow("User not found");

    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;
    await getTestUserAndToken(email, password);

    await requestPasswordReset(email);

    expect(sendEmail.mock.calls.length).toBe(1);
  });

  it("Reset password", async () => {
    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;
    const newPassword = "newPassword";
    const confirmNewPassword = "newPassword";

    const { userData, token } = await getTestUserAndToken(email, password);
    const passwordResetToken = await getPasswordResetToken(userData._id);

    await expect(() =>
      resetPassword(userData._id, passwordResetToken, newPassword, "invalid")
    ).rejects.toThrow("New passwords must match");
    await expect(() =>
      resetPassword(
        userData._id,
        "invalidtoken",
        newPassword,
        confirmNewPassword
      )
    ).rejects.toThrow(
      "Invalid or expired password reset token. Please generate a new link"
    );

    const res = await resetPassword(
      userData._id,
      passwordResetToken,
      newPassword,
      confirmNewPassword
    );

    expect(res.token).toEqual(token);
    expect(res.userData._id).toEqual(userData._id);
  });
});
