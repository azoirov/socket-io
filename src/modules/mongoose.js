const mongoose = require("mongoose");
const { MONGO_URL } = require("../../config");

require("../models/Users");
require("../models/Messages");

module.exports = async function mongo() {
    try {
        await mongoose.connect(MONGO_URL);
    } catch (e) {
        console.log("DATABASE CONNECTION FAILED");
    }
};
