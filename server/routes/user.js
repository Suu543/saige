const express = require("express");
const router = express.Router();

router.get("/user", (req, res, next) => {
  res.json({
    data: "Hey you hit user API endpoint...",
  });
});

module.exports = router;
