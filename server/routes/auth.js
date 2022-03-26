const express = require("express");
const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");

// import
const { createOrUpdateUser } = require("../controllers/auth");

router.post("/create-or-update-user", authCheck, createOrUpdateUser);

// const myMiddleware = (req, res, next) => {
//   console.log("I'm a middleware YaY!!");
//   next();
// };

// router.get("/testing", myMiddleware, (req, res, next) => {
//   res.json({
//     data: "You successfully tried middleware",
//   });
// });

module.exports = router;
