const sendEmail = require("../../utils/email");
const { contact } = require("../../services/contact.service");

jest.mock("../../utils/email");

describe("Contact Service Tests", () => {
  it("contact", async () => {
    expect(() => contact()).rejects.toThrow(
      "Full name, email, and message required"
    );

    const fullName = "Test Name";
    const company = "Company";
    const email = "test@email.com";
    const message = "Message";

    await contact(fullName, company, email, message);

    expect(sendEmail.mock.calls.length).toBe(1);
  });
});
