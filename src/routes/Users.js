const {
    LoginGET,
    SignupGET,
    LoginPOST,
    SignupPOST,
} = require("../controllers/Users");

const router = require("express").Router();

// req listener
router.get("/login", LoginGET);
router.get("/signup", SignupGET);
router.post("/login", LoginPOST);
router.post("/signup", SignupPOST);

module.exports = {
    path: "/users",
    router,
};
