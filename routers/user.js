var {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
  } = require("../controllers/user");
  var express = require("express");
  var router = express.Router();
  var {checkRole } = require("../middleware/roleChecker")

  router.get("/", checkRole("admin"), getAllUsers);
  router.get("/:username", getUser);
  router.post("/", createUser);
  router.put("/:username", updateUser);
  router.delete("/:username", deleteUser);
  
  module.exports = router;