const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string(),
  password: Joi.string().email().required(),
  isAdmin: Joi.bool(),
  phoneNumber: Joi.string(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  repeat_password: Joi.ref("password"),

  access_token: [Joi.string(), Joi.number()],

  birth_year: Joi.number().integer().min(1900).max(2013),

  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
})
  .with("username", "birth_year")
  .xor("password", "access_token")
  .with("password", "repeat_password");

module.exports = {
  userSchema,
};

/*
name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    favorites: {
      type: Array,
    },

  */
