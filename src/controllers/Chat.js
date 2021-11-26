const users = require("../models/Users");
const messages = require("../models/Messages");
const { v4 } = require("uuid");

module.exports = class Chat {
    static async ChatGET(req, res) {
        try {
            let members = await users.find();

            let user = await users.findOne({
                login: req.params.login,
            });

            let me = await users.findOne({
                login: req.user.login,
            });

            let messageList = await messages.find({
                $or: [
                    {
                        from_id: user.id,
                        to_id: me.id,
                    },
                    {
                        to_id: user.id,
                        from_id: me.id,
                    },
                ],
            });

            res.render("index", {
                users: members,
                user,
                messages: messageList,
                me,
            });
        } catch (e) {
            console.log(e);
        }
    }

    static async Chat(req, res) {
        try {
            console.log(true);
        } catch (e) {
            console.log(e);
        }
    }

    static async ChatPOST(req, res) {
        try {
            const { login } = req.params;
            const { text } = req.body;

            let user = await users.findOne({
                login,
            });

            let me = await users.findOne({
                login: req.user.login,
            });

            let message = await messages.create({
                id: v4(),
                text,
                from_id: me.id,
                to_id: user.id,
            });

            res.status(200).json({
                ok: true,
                message,
                me,
                user,
            });
        } catch (e) {
            console.log(e);
        }
    }
};
