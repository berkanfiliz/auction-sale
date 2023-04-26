const bcrypt = require("bcryptjs");
const userServices = require("../services/user.services");
const jwtServices = require("../services/jwt.services");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userServices.getuserwithemail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwtServices.createToken(user._id);
      return res.status(200).json({ success: true, data: user, accessToken: token });
    }
    throw Error("Giris bilgileriniz hatali");
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const signup = async (req, res, next) => {
  try {
    const user = req.body;
    if (await userServices.getuserwithemail(user.email)) {
      throw Error("Email sistemde mevcut");
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    const createuser = await userServices.createuser(user);
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

module.exports = {
  login,
  signup,
  fetchUser,
};
