const router = require("express").Router();
const { signup, login, fetchUser, fetchAllUser, updateUser, updateUserImage } = require("../controllers/users.controllers");
const { upload } = require("../middlewares/multer.middleware");

router.get("/users", fetchAllUser);
router.get("/user/:id", fetchUser);
router.patch("/userImage/:id", upload.array("images"), updateUserImage);
router.patch("/user/:id", updateUser);
router.post("/signup", upload.array("images"), signup);
router.post("/login", login);

module.exports = router;
