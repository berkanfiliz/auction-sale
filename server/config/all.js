const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log("DB connection is succesful");
  })
  .catch((e) => {
    console.log(e);
  });

module.exports = mongoose;
