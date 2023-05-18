const router = require("express").Router();
const { signup, login, fetchUser, fetchAllUser, updateUser } = require("../controllers/users.controllers");

router.get("/users", fetchAllUser);
router.get("/user/:id", fetchUser);
router.patch("/user/:id", updateUser);
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
