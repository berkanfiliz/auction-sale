const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { endControl } = require("./services/endControl.services");

// const socketio = require("socket.io");

require("dotenv").config();
require("./config/all");

app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static("public"));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Connection is running in ${PORT} PORT`);
});

app.use("/api", require("./routes/user.routes"));
app.use("/api/ihale", require("./routes/ihale.routes"));
app.use("/api/category", require("./routes/category.routes"));
app.use("/api/mail", require("./routes/mail.routes"));
app.use("/api/chat", require("./routes/chat.routes"));

endControl();

app.use((req, res) => {
  res.json({ success: "false", message: "Gecersiz endpoint" });
});
