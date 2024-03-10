const { registerUser, loginUser, logoutUser } = require("../controller/userController")

const router = require("express").Router()


router
    .post("/register", registerUser)
    .post("/login", loginUser)
    .post("/logout", logoutUser)


module.exports = router