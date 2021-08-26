const mongoose = require("mongoose");
const { Schema } = mongoose;

const Workspace = new Schema(
  {
    workspaceId: { type: String, required: "Workspace ID is required" },
    name: { type: String, required: "Name is required" },
    users: [
      {
        userId: { type: String },
        isAdmin: Boolean,
      },
    ],
    domain: { type: String, required: "Domain is required" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("workspace", Workspace);
