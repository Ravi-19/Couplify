const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  { 
    firebaseUid: {
        type: String,
        required: true,
        unique: true,
        index: true,
        },
    name: { type: String, required: true, trim: true },

    email: { type: String, required: true, unique: true, index: true },

    avatar: { type: String, default: null },

    authProvider: {
      type: String,
      enum: ["google", "email"],
      default: "google",
    },

    coupleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Couple",
      default: null,
    },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);