const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    minlength: 3,
    present: true,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  messagesRead: [
    {
      type: String,
      sparse: true,
    },
  ],
  roles: [
    {
      type: String,
      required: true,
      enum: ["demo", "user", "admin"],
      default: "user",
    },
  ],
  dashboards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dashboard",
    },
  ],
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
