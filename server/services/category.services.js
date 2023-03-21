const categoryModel = require("../models/category.model");

const createCategory = (data) => {
  return categoryModel.create(data);
};

const getCategory = () => {
  return categoryModel.find({});
};

const deleteCategory = (_id) => {
  return categoryModel.findByIdAndRemove({ _id });
};
const updateCategory = (_id, data) => {
  return categoryModel.findByIdAndUpdate({ _id }, data, { new: true });
};

module.exports = {
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
};
