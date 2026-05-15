const express = require("express");
const cors = require("cors");

const requestLogger = require("./logger/requestLogger");
const errorMiddleware = require("./middleware/errorMiddleware");

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

/**
 * ======================
 * 404 HANDLER
 * ======================
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/**
 * ======================
 * ERROR HANDLER
 * ======================
 */
app.use(errorMiddleware);

module.exports = app;