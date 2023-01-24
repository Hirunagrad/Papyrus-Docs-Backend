const express = require("express");
const bodyParser = require("body-parser");
const Route = require("./Routes/api");
const cors = require("cors");
const connectDB = require("./db/database");
const dotenv = require("dotenv");
const RoleTemplate = require("./Routes/roleTemplate");
const HrTemplate = require("./Routes/hrtemplate");
var socket = require("socket.io");

const PORT = 5000;

const app = express();
app.use(bodyParser.json());
app.use(express.json());
dotenv.config();
connectDB();

app.use(
  cors({
    origin: ["http://localhost:4200"], //it acsess frontend port 3000
    //   credentials: true, //it acsess tokens
  })
);

// app.get('/', (req,res)=>{
//     res.send("hello");
// })

var server = app.listen(PORT, () => {
  console.log(`Server is Running ${PORT}`);
});

var io = socket(server);

// Listen for new connection and print a message in console
io.on("connection", (socket) => {
  //console.log(`New connection ${socket.id}`);

  // Listening for chat event
  socket.on("chat", function (data) {
    // console.log('chat event trigged at server');
    // console.log('need to notify all the clients about this event');
    io.sockets.emit("chat", data);
  });

  // Listening for typing event
  socket.on("typing", function (data) {
    // console.log(`Server received ${data} is typing`);
    // console.log('need to inform all the clients about this');
    io.sockets.emit("typing", data);
    //socket.broadcast.emit('typing', data);
  });
});

app.get("/getdataid", (req, res) => {
  res.status(200).send("good");
});

app.use("/api", Route);
app.use("/template", RoleTemplate);
app.use("/hrtemplate", HrTemplate);

module.exports = app;