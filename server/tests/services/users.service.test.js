const dbHandler = require("../dbHandler");
const User = require("../../models/user.model");
const { getTestUser, getTestOccupierDashboard } = require("../factories");
const {
  createUser,
  updateUser,
  deleteUser,
} = require("../../services/users.service");
const Dashboard = require("../../models/dashboard.model");

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

describe("User Service Tests", () => {
  it("Create user", async () => {
    const email = "newUser@email.com";
    const password = "password";
    const hasAcceptedTCs = true;
    const checkPassword = password;

    await expect(() => createUser()).rejects.toThrow("Email required");
    expect(() =>
      createUser(password, email, "invalid", hasAcceptedTCs)
    ).rejects.toThrow("Passwords must match");
    await expect(() =>
      createUser("p", email, "p", hasAcceptedTCs)
    ).rejects.toThrow("Pasword minimum length 3");
    await expect(() =>
      createUser(password, email, checkPassword, false)
    ).rejects.toThrow("Must accept terms and conditions");

    const res = await createUser(
      password,
      email,
      checkPassword,
      hasAcceptedTCs
    );
    expect(res.email).toEqual(email);
  });

  it("Update user", async () => {
    await getTestUser("existing@email.com");
    const user = await getTestUser();
    await expect(() =>
      updateUser(user._id, {
        newEmail: "existing@email.com",
      })
    ).rejects.toThrow("Email already in use");

    const newEmail = "new@email.com";
    const oldPassword = process.env.TEST_USER_PASSWORD;
    const newPassword = "password";
    const checkPassword = "password";
    const messagesRead = ["NEWMESSAGE"];
    await expect(() =>
      updateUser(user._id, {
        oldPassword: "",
        newPassword,
        checkPassword,
      })
    ).rejects.toThrow("Old password is required");
    await expect(() =>
      updateUser(user._id, {
        oldPassword,
        newPassword: "p",
        checkPassword: "p",
      })
    ).rejects.toThrow("Pasword minimum length 3");
    await expect(() =>
      updateUser(user._id, {
        oldPassword: "invalid",
        newPassword,
        checkPassword,
      })
    ).rejects.toThrow("Incorrect password");
    await expect(() =>
      updateUser(user._id, {
        oldPassword,
        newPassword,
        checkPassword: "invalid",
      })
    ).rejects.toThrow("New passwords must match");

    let res = await updateUser(user._id, { newEmail });
    expect(res.email).toEqual(newEmail);

    res = await updateUser(user._id, {
      oldPassword,
      newPassword,
      checkPassword,
    });
    expect(!!res._id).toBeTruthy();

    res = await updateUser(user._id, { messagesRead });
    expect(res.messagesRead).toEqual(expect.arrayContaining(messagesRead));
  });

  it("Delete user", async () => {
    const userData = await getTestUser();
    await getTestOccupierDashboard(userData._id);

    await deleteUser(userData._id, process.env.TEST_USER_PASSWORD);
    const user = await User.findById(userData._id);
    const dashboards = await Dashboard.find({ user: userData._id });
    expect(user).toBeFalsy();
    expect(dashboards.length).toEqual(0);
  });
});
