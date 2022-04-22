const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.get("/new", UsersController.New);
router.post("/", UsersController.Create);
router.post("/profile", UsersController.Update);
router.get("/profile", UsersController.Profile);
router.get("/", UsersController.Delete);
router.get("/", UsersController.Logout);

module.exports = router;
