const express = require("express");
const router = express.Router();
const { postBlogs, getAllBlog, getSingleBlog, deleteBlogs, updateBlog, filteredCategory, searchBlog } = require("../controllers/blog-controller");

router.get("/get-blog", getAllBlog);
router.get("/single-blog/:id", getSingleBlog);
router.post("/post-blog", postBlogs);
router.delete("/delete-blog/:id", deleteBlogs);
router.put("/update-blog/:id", updateBlog);
router.get("/filter-category", filteredCategory);
router.get("/search-blog", searchBlog);

module.exports = router;
