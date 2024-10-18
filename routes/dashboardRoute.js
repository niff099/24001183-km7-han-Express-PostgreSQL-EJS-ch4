const express = require("express");
const router = express.Router();
const dashboardController = require("../controller/dashboardController");

router.post("/users", dashboardController.userPage);
router.post("/users/create", dashboardController.createPage);

module.exports = router;
