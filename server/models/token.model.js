const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../utils/config");

const tokenSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tokenHash: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
    expires: 3600, // expires in 1 hour
  },
});

tokenSchema.pre("save", async function (next) {
  try {
    const token = this;
    if (!token.isModified("tokenHash")) {
      return next();
    }
    const tokenHash = await bcrypt.hash(token.tokenHash, config.SALT_ROUNDS);
    token.tokenHash = tokenHash;
    next();
  } catch (e) {
    next(e);
  }
});

tokenSchema.methods.validateToken = async function (token) {
  return await bcrypt.compare(token, this.tokenHash);
};

const token = mongoose.model("Token", tokenSchema);

module.exports = token;
