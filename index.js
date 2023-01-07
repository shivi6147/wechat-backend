const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const port = process.env.PORT;

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "https://63b99535932e1a2e6625ee0e--ubiquitous-bienenstitch-0c7c9a.netlify.app/",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

server.listen(port, () => {
    console.log(`Server is Working on ${port}`);
});

app.get("/", (req, res) => {
    res.send("HEY ITS WORKING");
})
