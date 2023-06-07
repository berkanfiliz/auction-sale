const router = require("express").Router();
const { upload } = require("../middlewares/multer.middleware");

const { createCategory, fetchAllCategory, deleteCategory, updateCategory } = require("../controllers/category.controllers");

router.get("/", fetchAllCategory);

//router.get("/:id",categoryFilter)

router.post("/", upload.array("images"), createCategory);

router.patch("/:id", updateCategory);

router.delete("/:id", deleteCategory);

module.exports = router;
