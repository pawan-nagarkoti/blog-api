const Blog = require("../modal/blog");

// get all blogs
const getAllBlog = async (req, res) => {
  try {
    // const { categoryId } = req.query;
    // console.log(categoryId.split(","));

    const allBlogs = await Blog.find({}).populate("category");
    if (allBlogs.length > 0) {
      res.status(200).json({
        data: allBlogs,
        message: "Blog fetched successfully",
      });
    } else {
      res.status(400).json({
        data: [],
        message: "no blog found",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "something wrong",
    });
  }
};

// Get single blog
const getSingleBlog = async (req, res) => {
  const getCurrentBlogId = req.params.id;

  try {
    const blogDetailsByID = await Blog.findById(getCurrentBlogId).populate("category");

    if (!blogDetailsByID) {
      return res.status(404).json({
        success: false,
        message: "Blog with the current ID is not found! Please try with a different ID",
      });
    }

    res.status(200).json({
      data: blogDetailsByID,
      message: "Single Blog fetched",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "something is wrong",
    });
  }
};

// Post blogs
const postBlogs = async (req, res) => {
  const newBlogFormData = req.body;

  if (!newBlogFormData.title && !newBlogFormData.shortDescription && !newBlogFormData.longDescription) {
    console.error("Required fields are missing!");
    return res.status(400).json({
      message: "blog data not found or may be some fields are missing",
    });
  }

  try {
    const newlyCreatedBlog = await Blog.create(newBlogFormData);

    res.status(200).json({
      data: newlyCreatedBlog,
      message: "Blog Added Successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Something is wrong",
    });
  }
};

// delete blogs
const deleteBlogs = async (req, res) => {
  try {
    const deletedBlogId = req.params.id;
    const deleteBlog = await Blog.findByIdAndDelete(deletedBlogId);
    if (!deleteBlog) {
      res.status(404).json({
        success: false,
        message: "Blog is not found with this ID",
      });
    }

    res.status(200).json({
      status: true,
      data: deleteBlog,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json(500).json({
      message: "something is wrong ! please try again",
    });
  }
};

// update blog
const updateBlog = async (req, res) => {
  try {
    const updateBlogId = req.params.id;
    const updatedBlogFormData = req.body;
    const updateBlog = await Blog.findByIdAndUpdate(updateBlogId, updatedBlogFormData, {
      new: true,
    }).populate("category");

    if (!updateBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog is not found this ID",
      });
    }

    res.status(200).json({
      success: true,
      data: updateBlog,
      message: "Blog updated successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "something went wrong! please try again",
    });
  }
};

const filteredCategory = async (req, res) => {
  try {
    // Extract the category ID from the query parameters
    const { categoryId } = req.query;

    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
      });
    }

    // Query the Blog model for blogs with the specific category ID
    const blogs = await Blog.find({ category: categoryId }).populate("category");

    if (blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No blogs found for the specified category ID",
      });
    }

    res.status(200).json({
      success: true,
      data: blogs,
      message: "Blogs fetched successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

const searchBlog = async (req, res) => {
  try {
    const { title } = req.query;

    // Validate query
    if (!title) {
      return res.status(400).json({
        message: "Title query parameter is required.",
      });
    }

    // Search for blogs with partial matching and case-insensitivity
    const blogs = await Blog.find({ title: { $regex: title, $options: "i" } }).populate("category");

    // Respond with the found blogs
    res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    console.error("Error while searching blogs:", error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
};

module.exports = {
  getAllBlog,
  getSingleBlog,
  postBlogs,
  deleteBlogs,
  updateBlog,
  filteredCategory,
  searchBlog,
};
