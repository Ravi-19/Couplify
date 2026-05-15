const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const logger = require("./logger");
const { successResponse } = require("./utils/apiResponse");
const requestLogger = require("./logger/requestLogger");
const errorMiddleware = require("./middleware/errorMiddleware");
const AppError = require("./errors/AppError");
const asyncHandler = require("./utils/asyncHandler");


const app = express();

dotenv.config();
// configure middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(errorMiddleware);

app.get("/health", (req, res) => {
  logger.info("Health route called");
  return successResponse(res, "Backend is healthy", {
    uptime: process.uptime(),
  });
});

app.get(
  "/test",
  asyncHandler(async (req, res) => {
    throw new AppError("Invalid request", 400, "BAD_REQUEST");
  })
);


/**
 * ========================
 * 404 HANDLER (IMPORTANT)
 * ========================
 */
app.use((req, res) => {
  throw new AppError("Route not found", 404, "NOT_FOUND");
});

/**
 * ========================
 * ERROR HANDLER (MUST BE LAST)
 * ========================
 */
app.use(errorMiddleware);

/**
 * ========================
 * START SERVER
 * ========================
 */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

