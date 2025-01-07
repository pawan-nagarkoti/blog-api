const express = require("express");
const router = express.Router();
const homePageMiddleware = require("../middleware/homePage-middleware");
const authMiddleware = require("../middleware/auth-middleware");

router.get("/home-page", authMiddleware, homePageMiddleware, (req, res) => {
  res.status(200).json({
    message: "welcome to home page",
  });
});

module.exports = router;
