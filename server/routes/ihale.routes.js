const router = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");
const { upload } = require("../middlewares/multer.middleware");

const { fetchAll, fetch, createIhale, updateIhale, deleteIhale, fetchWithCategoryFilter, fetchIhaleWithCreatorId, searchIhale, fetchmyihale, fetchFavoriteIhaleler, fetchYorumlar } = require("../controllers/ihale.controllers");

router.get("/", fetchAll);

router.get("/search", searchIhale);

router.get("/kategori/:id", fetchWithCategoryFilter);

router.get("/:id", fetch);

router.get("/user/:id", fetchIhaleWithCreatorId);

router.get("/myihale/:id", fetchmyihale);

router.get("/favorites/:id", fetchFavoriteIhaleler);

router.get("/yorumlar/:id", fetchYorumlar);

router.post("/", upload.array("images"), createIhale);

// router.post("/", authMiddleware, createIhale);

router.patch("/:id", updateIhale);

router.delete("/:id", deleteIhale);

module.exports = router;
