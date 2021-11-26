const bcrypt = require("bcrypt");

module.exports.generateHash = async (password) => {
    let salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

module.exports.compareHash = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};
