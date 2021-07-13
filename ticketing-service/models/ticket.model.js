const mongoose = require("mongoose");
const { Schema } = mongoose;

const Ticket = new Schema({
  ticketId: { type: String, required: true, unique: true },
  assignedTo: { type: String, default: null },
  isResolved: { type: Boolean, default: false, required: true },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
    required: true,
  },
  tags: [String],
});

module.exports = mongoose.model("tickets", Ticket);
