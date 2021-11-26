const users = require("../models/Users");
const { compareHash, generateHash } = require("../modules/bcrypt");
const { generateToken } = require("../modules/jwt");
const { v4 } = require("uuid");

module.exports = class User {
    static async LoginGET(req, res) {
        try {
            res.render("login");
        } catch (e) {
            res.render("login", {
                error: e + "",
            });
        }
    }

    static async SignupGET(req, res) {
        try {
            res.render("signup");
        } catch (e) {
            res.render("signup", {
                error: e + "",
            });
        }
    }

    static async LoginPOST(req, res) {
        try {
            const { login, password } = req.body;

            let user = await users.findOne({
                login: login,
            });

            if (!user) throw new Error("Foydalanuvchi topilmadi");

            let isPasswordTrue = await compareHash(password, user.password);

            if (!isPasswordTrue) throw new Error("Parol noto'g'ri terilgan");

            let token = generateToken({
                login,
            });

            res.cookie("token", token).redirect("/");
        } catch (e) {
            res.render("login", {
                error: e + "",
            });
        }
    }

    static async SignupPOST(req, res) {
        try {
            const { login, password } = req.body;

            let user = await users.findOne({
                login: login,
            });

            if (user) throw new Error("Login band");

            let pass = await generateHash(password);

            await users.create({
                id: v4(),
                login,
                password: pass,
            });

            let token = generateToken({
                login,
            });

            res.cookie("token", token).redirect("/");
        } catch (e) {
            res.render("login", {
                error: e + "",
            });
        }
    }
};
