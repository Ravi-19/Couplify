const authService = require("./auth.service");
const { successResponse } = require("../../utils/apiResponse");
const asyncHandler = require("../../utils/asyncHandler");

const loginWithGoogle = asyncHandler(async (req, res) => {
  const user = await authService.syncGoogleUser(req.user);

  return successResponse(
    res,
    "Login successful",
    user,
    200
  );
});

module.exports = {
  loginWithGoogle,
};