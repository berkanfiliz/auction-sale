const router = require("express").Router();
const { signup, login, fetchUser, fetchAllUser } = require("../controllers/users.controllers");

router.get("/users", fetchAllUser);
router.get("/user/:id", fetchUser);
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
