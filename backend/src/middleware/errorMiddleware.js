const logger = require("../logger");

const { errorResponse } = require("../utils/apiResponse");

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const isProd = process.env.NODE_ENV === "production";

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

  return errorResponse(
    res,
    isProd && statusCode === 500
      ? "Internal Server Error"
      : err.message,
    {
      code: err.code || "INTERNAL_ERROR",

      details: isProd
        ? null
        : err.details || null,
    },
    statusCode
  );
};

module.exports = errorMiddleware;