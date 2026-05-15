const mongoose = require("mongoose");

const coupleSchema = new mongoose.Schema(
  {
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    status: {
      type: String,
      enum: ["pending", "active", "broken"],
      default: "pending",
    },

    startDate: { type: Date, default: null },

    anniversaryDate: { type: Date, default: null },

    inviteCode: { type: String, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Couple", coupleSchema);