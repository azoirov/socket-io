const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const { PORT } = require("../config");
const path = require("path");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const mongoose = require("./modules/mongoose");
const users = require("./models/Users");
const { checkToken } = require("./modules/jwt");

const app = express();
const server = http.createServer(app);

const io = new Server(server);

// socket start ---

io.on("connect", async (socket) => {
    console.log(socket.id, "kirdi");
    let cookies = socket.handshake.headers.cookie.split("; ");
    let token;
    cookies.forEach((cookie) => {
        if (cookie.split("=")[0] == "token") {
            token = cookie.split("=")[1];
        }
    });

    token = checkToken(token);
    await users.findOneAndUpdate(
        {
            login: token.login,
        },
        {
            socket_id: socket.id,
        }
    );

    socket.on("newMessage", (data) => {
        socket.to(data.user.socket_id).emit("newMessage", data);
    });

    socket.on("disconnect", (data) => {
        console.log(socket.id, "chiqdi");
    });
});

// socket end ---

server.listen(PORT, () => {
    console.log("SERVER READY");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    "/socket",
    express.static(
        path.join(__dirname, "..", "node_modules", "socket.io", "client-dist")
    )
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

fs.readdir(path.join(__dirname, "routes"), (err, files) => {
    if (!err) {
        files.forEach((file) => {
            const routePath = path.join(__dirname, "routes", file);

            const Route = require(routePath);

            if (Route.path && Route.router) app.use(Route.path, Route.router);
        });
    }
});

mongoose();
