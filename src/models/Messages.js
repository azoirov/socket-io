const mongoose = require("mongoose");

const Message = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    from_id: {
        type: String,
        required: true,
    },
    to_id: {
        type: String,
        required: true,
    },
});

const messages = mongoose.model("messages", Message);
module.exports = messages;
