const mongoose = require("mongoose");

const User = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    login: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    socket_id: {
        type: String,
    },
});

const users = mongoose.model("users", User);
module.exports = users;
