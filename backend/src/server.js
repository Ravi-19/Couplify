const dotenv = require("dotenv");
const logger = require("./logger");
const app = require("./app");
const connectDB = require("./config/db");

dotenv.config();

const PORT = process.env.PORT || 3000;

/**
 * CONNECT DATABASE FIRST
 */
connectDB();

/**
 * START SERVER
 */
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

/**
 * GLOBAL SAFETY NETS
 */
process.on("uncaughtException", (err) => {
  logger.error(err, "Uncaught Exception");
});

process.on("unhandledRejection", (err) => {
  logger.error(err, "Unhandled Rejection");
});