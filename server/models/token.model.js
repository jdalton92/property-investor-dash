const mongoose = require("mongoose");

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

const token = mongoose.model("Token", tokenSchema);

module.exports = token;
