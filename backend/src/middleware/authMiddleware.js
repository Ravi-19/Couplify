const admin = require("../config/firebaseAdmin");

const ApiError = require("../utils/ApiError");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw new ApiError(
        401,
        "Authentication token missing",
        "TOKEN_MISSING"
      );
    }

    const token = authHeader.split("Bearer ")[1];

    const decodedToken = await admin.auth().verifyIdToken(token);

    req.user = decodedToken;

    next();
  } catch (error) {
    next(
      new ApiError(
        401,
        "Unauthorized access",
        "INVALID_TOKEN"
      )
    );
  }
};

module.exports = authMiddleware;