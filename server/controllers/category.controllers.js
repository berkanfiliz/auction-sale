const categoryModel = require("../models/category.model");
const categoryServices = require("../services/category.services");

const fetchAllCategory = async (req, res) => {
  try {
    const category = await categoryServices.getCategory();
    res.status(200).json({ success: true, category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const { body, files } = req;

    // Map uploaded images to image_url array
    const category_url = files.map((file) => file.path.replace("public/", ""));

    const category = await categoryModel.create({ ...body, image_urls: category_url });

    //const category = await categoryServices.createCategory(req.body);
    res.status(201).json({ success: true, message: "Successfully created", category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await categoryServices.updateCategory(req.params.id, req.body);
    if (!category) {
      throw Error("İd yanlış");
    }
    res.status(200).json({ success: true, message: "Successfully updated", category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await categoryServices.deleteCategory(req.params.id);
    res.status(201).json({ success: true, message: "Successfully deleted" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  fetchAllCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
