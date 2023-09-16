import express from "express";
import {config} from "dotenv";
import path from "path";
import {Server} from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
const __dirname = path.resolve();

config({
    path:"./data/config.env"
});

app.use(express.static(path.join(__dirname + "/public")));


app.get("/", (req, res)=>{
    res.sendFile("/index.html");
})

server.listen(process.env.PORT, ()=>{
    console.log("Runnig on port : "+process.env.PORT);
});

//socket
const io = new Server(server);

io.on("connection", (socket) => {
    console.log("Connected");
    socket.on("message", (message)=>{
        socket.broadcast.emit("send", message);
    })
})