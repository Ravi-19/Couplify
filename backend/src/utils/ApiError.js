class ApiError extends Error {
  constructor(
    statusCode = 500,
    message = "Internal Server Error",
    code = "INTERNAL_ERROR",
    details = null
  ) {
    super(message);

    this.statusCode = statusCode;
    this.code = code;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;