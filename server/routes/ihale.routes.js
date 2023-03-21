const router = require("express").Router();

const { fetchAll, fetch, createIhale, updateIhale, deleteIhale, fetchWithCategoryFilter, joinIhale } = require("../controllers/ihale.controllers");

router.get("/", fetchAll);

router.get("/kategori/:id", fetchWithCategoryFilter);

router.get("/:id", fetch);

router.post("/", createIhale);

//router.post("/", joinIhale);

router.patch("/:id", updateIhale);

router.delete("/:id", deleteIhale);

module.exports = router;
