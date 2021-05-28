const dbHandler = require("../dbHandler");
const {
  mockReq,
  mockRes,
  mockNext,
  getTestUserAndToken,
} = require("../factories");
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
    const userAndToken = await getTestUserAndToken();
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

    usersService.createUser.mockResolvedValue(userAndToken);
    await createUserController(req, res, next);
    expect(usersService.createUser.mock.calls.length).toEqual(1);
    expect(usersService.createUser.mock.calls[0]).toEqual([
      password,
      email,
      checkPassword,
      hasAcceptedTCs,
    ]);
    expect(res.status).toBeCalledWith(201);
    expect(res.json).toBeCalledWith(userAndToken);
  });

  it("Update user", async () => {
    const userAndToken = await getTestUserAndToken();
    const reqBody = {
      email: "test@email.com",
      password: "newPassword",
      checkPassword: "newPassword",
      hasAcceptedTCs: true,
    };
    const options = {
      user: userAndToken.userData,
    };
    const req = mockReq(reqBody, options);

    usersService.updateUser.mockResolvedValue(userAndToken);
    await updateUserController(req, res, next);
    expect(usersService.updateUser.mock.calls.length).toEqual(1);
    expect(usersService.updateUser.mock.calls[0]).toEqual([
      userAndToken.userData._id,
      reqBody,
    ]);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith(userAndToken);
  });

  it("Delete user", async () => {
    const { userData } = await getTestUserAndToken();
    const password = "password";
    const reqBody = { password };
    const options = {
      params: { id: userData._id },
    };
    const req = mockReq(reqBody, options);

    await deleteUserController(req, res, next);
    expect(usersService.deleteUser.mock.calls.length).toEqual(1);
    expect(usersService.deleteUser.mock.calls[0]).toEqual([
      userData._id,
      password,
    ]);
    expect(res.status).toBeCalledWith(204);
    expect(res.end).toBeCalled();
  });
});
