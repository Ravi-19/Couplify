const mongoose = require("mongoose");
const logger = require("../logger");

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not defined in .env");
    }

    const conn = await mongoose.connect(MONGO_URI);

    logger.info({
      message: "MongoDB Connected",
      host: conn.connection.host,
      name: conn.connection.name,
    });
  } catch (error) {
    logger.error({
      message: "MongoDB connection failed",
      error: error.message,
    });

    // Crash app if DB is not connected (correct for backend reliability)
    process.exit(1);
  }
};

module.exports = connectDB;