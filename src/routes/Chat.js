const router = require("express").Router();
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const { ChatGET, Chat, ChatPOST } = require("../controllers/Chat");

router.get("/", AuthMiddleware, Chat);
router.get("/:login", AuthMiddleware, ChatGET);
router.post("/:login", AuthMiddleware, ChatPOST);

module.exports = {
    path: "/",
    router,
};
