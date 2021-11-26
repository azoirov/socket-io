const { sign, verify } = require("jsonwebtoken");
const { SECRET_WORD } = require("../../config");

module.exports.generateToken = (data) => {
    return sign(data, SECRET_WORD);
};

module.exports.checkToken = (token) => {
    try {
        return verify(token, SECRET_WORD);
    } catch (e) {
        return false;
    }
};
