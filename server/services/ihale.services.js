const ihaleModel = require("../models/ihale.model");

const createihale = (data) => {
  return ihaleModel.create(data);
};
const getAllihale = () => {
  return ihaleModel.find({});
};
const getihale = (_id) => {
  return ihaleModel.findById({ _id });
};
const updateihale = (_id, data) => {
  return ihaleModel.findByIdAndUpdate({ _id }, data, { new: true });
};
const deleteihale = (_id) => {
  return ihaleModel.findByIdAndDelete({ _id });
};
const getwithcategoryfilter = (kategori) => {
  return ihaleModel.find({ kategori });
};
module.exports = {
  createihale,
  getAllihale,
  getihale,
  deleteihale,
  updateihale,
  getwithcategoryfilter,
};
