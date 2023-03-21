const router = require("express").Router();
const { createCategory, fetchAllCategory, deleteCategory, updateCategory } = require("../controllers/category.controllers");

router.get("/", fetchAllCategory);

//router.get("/:id",categoryFilter)

router.post("/", createCategory);

router.patch("/:id", updateCategory);

router.delete("/:id", deleteCategory);

module.exports = router;
