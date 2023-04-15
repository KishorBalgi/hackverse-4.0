const mongoose = require("mongoose");
const ticketConfig = require("../configs/ticket.config.json");
const error = require("../configs/error.codes.json");

const ticketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, error[400].userRequired],
  },
  purpose: {
    type: String,
    required: [true, error[400].ticketPurposeRequired],
    enum: Object.values(ticketConfig.ticket_purpose),
  },
  token: {
    type: String,
    required: [true, error[400].ticketTokenRequired],
  },
  expiresAt: {
    type: Date,
    default: () => Date.now() + ticketConfig.expiration * 60 * 1000,
  },
});

ticketSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
