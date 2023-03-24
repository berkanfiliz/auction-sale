const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const socketio = require("socket.io");

require("dotenv").config();
require("./config/all");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Connection is running in ${PORT} PORT`);
});

app.use("/api", require("./routes/user.routes"));
app.use("/api/ihale", require("./routes/ihale.routes"));
app.use("/api/category", require("./routes/category.routes"));

app.use((req, res) => {
  res.json({ success: "false", message: "Gecersiz endpoint" });
});
