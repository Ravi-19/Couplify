const express = require("express");

const router = express.Router();

const authController = require("./auth.controller");

const authMiddleware = require("../../middleware/authMiddleware");

router.post(
  "/google",
  authMiddleware,
  authController.loginWithGoogle
);

module.exports = router;