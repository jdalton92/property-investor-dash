const { mockReq, mockRes, mockNext } = require("../../factories");
const contactService = require("../../../services/contact.service");
const {
  contactController,
} = require("../../../controllers/contact.controller");

jest.mock("../../../services/contact.service");

describe("Contact controller tests", () => {
  let res;
  let next;
  beforeAll(async () => {
    res = mockRes();
    next = mockNext();
  });
  afterEach(async () => {
    res = mockRes();
    next = mockNext();
  });

  it("Contact", async () => {
    const fullName = "Test name";
    const company = "Test company";
    const email = "Test email";
    const message = "Test message";
    const req = mockReq({
      fullName,
      company,
      email,
      message,
    });

    await contactController(req, res, next);
    expect(contactService.contact.mock.calls.length).toEqual(1);
    expect(contactService.contact.mock.calls[0]).toEqual([
      fullName,
      company,
      email,
      message,
    ]);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ message: "Email sent" });
  });
});
