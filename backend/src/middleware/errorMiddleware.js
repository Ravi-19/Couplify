const logger = require("../logger");

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const isProd = process.env.NODE_ENV === "production";

  // Log full error internally
  logger.error(
    {
      message: err.message,
      stack: err.stack,
      path: req.path,
      method: req.method,
      statusCode,
      code: err.code,
    },
    "Unhandled Error"
  );

  return res.status(statusCode).json({
    success: false,
    message:
      isProd && statusCode === 500
        ? "Internal Server Error"
        : err.message,

    error: {
      code: err.code || "INTERNAL_ERROR",

      // only expose details if safe
      details: isProd ? null : err.details || null,
    },
  });
};

module.exports = errorMiddleware;