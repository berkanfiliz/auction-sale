const userModel = require("../models/user.model");

const createuser = (user) => {
  return userModel.create(user);
};

const getuserwithemail = (email) => {
  return userModel.findOne({ email });
};
const getuserwithid = (_id) => {
  return userModel.findOne({ _id });
};
module.exports = {
  createuser,
  getuserwithemail,
  getuserwithid,
};
