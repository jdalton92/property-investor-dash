const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    minlength: 3,
    present: true,
    required: true,
  },
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
      unique: true,
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
