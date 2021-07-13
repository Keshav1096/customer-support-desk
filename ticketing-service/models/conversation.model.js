const mongoose = require("mongoose");
const { Schema } = mongoose;

const Conversation = new Schema(
  {
    conversationId: { type: String, required: true, unique: true },
    participants: [String],
    createdBy: { type: String },
    tickets: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("conversations", Conversation);
