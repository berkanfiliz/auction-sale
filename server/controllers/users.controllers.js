const bcrypt = require("bcryptjs");
const userServices = require("../services/user.services");
const jwtServices = require("../services/jwt.services");
const userModel = require("../models/user.model");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userServices.getuserwithemail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwtServices.createToken(user._id);
      if (user.isActive === false) throw Error("Hesabiniz aktif degil");
      return res.status(200).json({ success: true, data: user, accessToken: token });
    }
    throw Error("Giris bilgileriniz hatali");
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const signup = async (req, res, next) => {
  try {
    const { files } = req;

    // Map uploaded images to image_url array
    const user = req.body;
    const image_url = files.map((file) => file.path.replace("public/", ""));
    if (await userServices.getuserwithemail(user.email)) {
      throw Error("Email sistemde mevcut");
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    const userInformation = await userModel.create({ ...user, image_urls: image_url });
    console.log(userInformation);
    const createToken = jwtServices.createToken(user._id);
    return res.status(201).json({ success: true, accessToken: createToken });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const fetchUser = async (req, res, next) => {
  try {
    const user = await userServices.getuserwithid(req.params.id);
    if (!user) {
      throw Error("Kullanici bulunamadi");
    }
    res.status(200).json({ success: true, message: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const fetchAllUser = async (req, res, next) => {
  try {
    const users = await userServices.getalluser();
    res.status(200).json({ success: true, message: users });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
const updateUser = async (req, res, next) => {
  try {
    const user = await userServices.updateuser(req.params.id, req.body);
    if (!user) throw Error("Kullanici bulunamadi");
    res.status(200).json({ success: true, message: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
const updateUserImage = async (req, res, next) => {
  try {
    const { files } = req;
    const image_url = files.map((file) => file.path.replace("public/", ""));
    req.body.image_urls = image_url;
    const user = await userServices.updateuser(req.params.id, req.body);
    if (!user) throw Error("Kullanici bulunamadi");
    res.status(200).json({ success: true, message: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
module.exports = {
  login,
  signup,
  fetchUser,
  fetchAllUser,
  updateUser,
  updateUserImage,
};
