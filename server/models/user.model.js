const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcryptjs");
const config = require("../utils/config");

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
  hasAcceptedTCs: {
    type: Boolean,
    required: true,
    default: false,
  },
  messagesRead: [
    {
      type: String,
      sparse: true,
    },
  ],
  roles: {
    type: [{ type: String, enum: ["demo", "user", "admin"] }],
    required: true,
    default: ["user"],
  },
  dashboards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dashboard",
    },
  ],
});

userSchema.plugin(uniqueValidator);

userSchema.pre("save", async function (next) {
  try {
    const user = this;
    if (!user.isModified("passwordHash")) {
      return next();
    }
    const passwordHash = await bcrypt.hash(
      user.passwordHash,
      config.SALT_ROUNDS
    );
    user.passwordHash = passwordHash;
    next();
  } catch (e) {
    next(e);
  }
});

userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.passwordHash);
};

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
