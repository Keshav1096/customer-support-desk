const mongoose = require("mongoose");
const { Schema } = mongoose;

const LogSchema = new Schema({
  log: { type: Object, required: false, default: {} },
});

module.exports = mongoose.model("logs", LogSchema);
