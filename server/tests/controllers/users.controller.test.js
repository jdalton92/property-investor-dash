const dbHandler = require("../dbHandler");
const { mockReq, mockRes, mockNext, getTestUser } = require("../factories");
const usersService = require("../../services/users.service");
const {
  createUserController,
  updateUserController,
  deleteUserController,
} = require("../../controllers/users.controller");

jest.mock("../../services/users.service");

describe("Users controller tests", () => {
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

  it("Create user", async () => {
    const user = await getTestUser();
    const email = "test@email.com";
    const password = "password";
    const checkPassword = "password";
    const hasAcceptedTCs = true;
    const reqBody = {
      email,
      password,
      checkPassword,
      hasAcceptedTCs,
    };
    const req = mockReq(reqBody);

    usersService.createUser.mockResolvedValue(user);
    await createUserController(req, res, next);
    expect(usersService.createUser.mock.calls.length).toEqual(1);
    expect(usersService.createUser.mock.calls[0]).toEqual([
      password,
      email,
      checkPassword,
      hasAcceptedTCs,
    ]);
    expect(res.status).toBeCalledWith(201);
    expect(res.json).toBeCalledWith(user);
  });

  it("Update user", async () => {
    const user = await getTestUser();
    const reqBody = {
      email: "test@email.com",
      password: "newPassword",
      checkPassword: "newPassword",
      hasAcceptedTCs: true,
    };
    const options = { session: { user } };
    const req = mockReq(reqBody, options);

    usersService.updateUser.mockResolvedValue(user);
    await updateUserController(req, res, next);
    expect(usersService.updateUser.mock.calls.length).toEqual(1);
    expect(usersService.updateUser.mock.calls[0]).toEqual([user._id, reqBody]);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith(user);
  });

  it("Delete user", async () => {
    const user = await getTestUser();
    const password = "password";
    const reqBody = { password };
    const options = {
      params: { id: user._id },
    };
    const req = mockReq(reqBody, options);

    await deleteUserController(req, res, next);
    expect(usersService.deleteUser.mock.calls.length).toEqual(1);
    expect(usersService.deleteUser.mock.calls[0]).toEqual([user._id, password]);
    expect(res.status).toBeCalledWith(204);
    expect(res.end).toBeCalled();
  });
});
