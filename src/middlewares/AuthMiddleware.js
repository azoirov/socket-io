const { checkToken } = require("../modules/jwt");

module.exports = async function (req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            res.redirect("/login");
            return;
        }

        const data = checkToken(token);

        if (!data) {
            res.redirect("/login");
            return;
        }

        req.user = data;
        next();
    } catch (e) {}
};
