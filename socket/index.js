const io = require("socket.io")(8900, {
  cors: {
    pingTimeout: 60000,
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
    credentials: true,
  },
  // allowEIO3: true,
});
io.on("connection", (socket) => {
  //console.log(socket.id);
  socket.on("room", (data) => {
    socket.join(data);
    console.log("Kullanici odaya bağlandi = " + data);
  });
  socket.on("teklif", (data) => {
    console.log("Datam = " + data);
    console.log("Odanin id'si = ", data.id);
    socket.to(data.id).emit("messageReturn", data);
  });
  socket.on("message", (data) => {
    socket.to(data.id).emit("messageGonder", data);
  });
});
