const express = require("express");
const router = express.Router();
const { getCategory, addCategory, updateCategory, deleteCategory } = require("../controllers/category-controller");

router.get("/get-category", getCategory);
router.post("/post-category", addCategory);
router.delete("/delete-category/:id", deleteCategory);
router.put("/update-category/:id", updateCategory);

module.exports = router;
