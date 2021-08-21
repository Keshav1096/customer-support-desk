const mongoose = require("mongoose");
const { Schema } = mongoose;

const User = new Schema(
  {
    name: { type: String, required: "Name is required" },
    email: { type: String, required: "Email is required" },
    password: { type: String, required: "Password is required" },
    workspaces: [String],
    username: { type: String, required: "Username is required" },
    authToken: { type: String, required: "Auth token missing" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", User);
