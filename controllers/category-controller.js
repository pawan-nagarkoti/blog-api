const Category = require("../modal/category");

// get api
const getCategory = async (req, res) => {
  try {
    const allCategory = await Category.find({});
    if (allCategory.length > 0) {
      res.status(200).json({
        data: allCategory,
        message: "category fetched successfully",
      });
    } else {
      res.status(400).json({
        data: [],
        message: "no category found",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "something is wrong! please try again",
    });
  }
};

// post api
const addCategory = async (req, res) => {
  try {
    const newCategory = req.body;
    if (!newCategory.name) {
      console.error("Required fields are missing!");
      return res.status(400).json({
        message: "category data not found or may be some fields are missing",
      });
    }

    const newlyCreatedCategory = await Category.create(newCategory);
    res.status(200).json({
      data: newlyCreatedCategory,
      message: "Category Added Successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "something is wrong! please try again",
    });
  }
};
// update api
const updateCategory = async (req, res) => {
  try {
    const updateCategoryFormData = req.body;
    const updatedCategoryId = req.params.id;
    const updatedCategory = await Category.findByIdAndUpdate(updatedCategoryId, updateCategoryFormData, {
      new: true,
    });

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "category is not found this ID",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedCategory,
      message: "category updated successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "something is wrong! please try again",
    });
  }
};

// delete api
const deleteCategory = async (req, res) => {
  try {
    const deletedCategoryId = req.params.id;
    const deleteCategory = await Category.findByIdAndDelete(deletedCategoryId);

    if (!deleteCategory) {
      res.status(404).json({
        success: false,
        message: "Category is not found with this ID",
      });
    }

    res.status(200).json({
      status: true,
      data: deleteCategory,
      message: "category deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "something is wrong! please try again",
    });
  }
};

module.exports = {
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};
