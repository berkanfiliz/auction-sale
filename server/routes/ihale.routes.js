const router = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");
const multer = require("multer");
const { upload } = require("../middlewares/multer.middleware");

const { fetchAll, fetch, createIhale, updateIhale, deleteIhale, fetchWithCategoryFilter, fetchIhaleWithCreatorId } = require("../controllers/ihale.controllers");

router.get("/", fetchAll);

router.get("/kategori/:id", fetchWithCategoryFilter);

router.get("/:id", fetch);

router.get("/user/:id", fetchIhaleWithCreatorId);

router.post("/", upload.array("images"), createIhale);

// router.post("/", authMiddleware, createIhale);

router.patch("/:id", updateIhale);

router.delete("/:id", deleteIhale);

module.exports = router;
