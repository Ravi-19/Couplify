const express = require("express");
const cors = require("cors");
const authRoutes = require("./modules/auth/auth.routes");
const requestLogger = require("./logger/requestLogger");
const errorMiddleware = require("./middleware/errorMiddleware");
const ApiError = require("./utils/ApiError");

const app = express();

/**
 * ======================
 * CORE MIDDLEWARES
 * ======================
 */
app.use(cors());
app.use(express.json());
app.use(requestLogger);

/**
 * ======================
 * ROUTES
 * ======================
 */
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend is healthy",
    uptime: process.uptime(),
  });
});

// main business logic routes
app.use("/api/v1/auth", authRoutes);

/**
 * ======================
 * 404 HANDLER
 * ======================
 */
app.use((req, res, next) => {
  next(
    new ApiError(
      404,
      `Route not found: ${req.originalUrl}`,
      "ROUTE_NOT_FOUND"
    )
  );
});

/**
 * ======================
 * ERROR HANDLER
 * ======================
 */
app.use(errorMiddleware);

module.exports = app;