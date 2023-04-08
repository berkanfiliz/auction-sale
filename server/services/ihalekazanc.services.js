const ihaleKazancModel = require("../models//ihalekazanc.model");

const createihale = (data) => {
  return ihaleKazancModel.create({ data });
};
const getAllihale = () => {
  return ihaleKazancModel.find({});
};
const getihale = (_id) => {
  return ihaleKazancModel.findById({ _id });
};
const updateihale = (_id, data) => {
  return ihaleKazancModel.findByIdAndUpdate({ _id }, data, { new: true });
};
const deleteihale = (_id) => {
  return ihaleKazancModel.findByIdAndDelete({ _id });
};

module.exports = {
  createihale,
  getAllihale,
  getihale,
  deleteihale,
  updateihale,
};
