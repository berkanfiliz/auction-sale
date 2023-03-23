const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const socketio = require("socket.io");

require("dotenv").config();
require("./config/all");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Connection is running in ${PORT} PORT`);
});

app.use("/api", require("./routes/user.routes"));
app.use("/api/ihale", require("./routes/ihale.routes"));
app.use("/api/category", require("./routes/category.routes"));

const io = socketio(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  //console.log(socket.id);
  socket.on("sendData", (data) => {
    //console.log(data);
  });
  socket.on("room", (data) => {
    socket.join(data);
    console.log("Kullanici odaya bağlandi" + data);
  });
  socket.on("teklif", (data) => {
    console.log(data.id);
    socket.to(data.id).emit("messageReturn", data);
  });
});

app.use((req, res) => {
  res.json({ success: "false", message: "Gecersiz endpoint" });
});
