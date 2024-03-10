const asyncHandler = require("express-async-handler")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../modals/User")



exports.registerUser = asyncHandler(async (req, res) => {

    const { userName, email, password } = req.body

    if (validator.isEmpty(userName) && validator.isEmpty(email) && validator.isEmpty(password)) {
        return res.status(400).json({ message: "All Fields Are Required" })
    }

    if (validator.isEmpty(userName)) {
        return res.status(400).json({ message: "username is required" })
    }

    if (validator.isEmpty(email)) {
        return res.status(400).json({ message: "email is required" })
    }

    if (validator.isEmpty(password)) {
        return res.status(400).json({ message: "password is required" })
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "please provide valid email" })
    }


    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ message: "please provide strong password" })
    }



    const Username = await User.findOne({ userName })

    if (Username) {
        return res.status(400).json({ message: "Username is alredady in use" })
    }

    const Email = await User.findOne({ email })

    if (Email) {
        return res.status(400).json({ message: "Email Already register with us" })
    }



    const hashPass = await bcrypt.hash(password, 10)


    await User.create({ userName, email, password: hashPass })

    res.json({ message: "User Register Success" })
})




exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (validator.isEmpty(email) && validator.isEmpty(password)) {
        return res.status(400).json({ message: "All Fields Are Required" })
    }


    if (validator.isEmpty(email)) {
        return res.status(400).json({ message: "email is required" })
    }


    if (validator.isEmpty(password)) {
        return res.status(400).json({ message: "password is required" })
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "please provide valid email" })
    }


    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ message: "please provide strong password" })
    }


    const result = await User.findOne({ email })

    if (!result) {
        return res.status(400).json({ message: "User Not Found" })
    }

    //Compare Password

    const pass = await bcrypt.compare(password, result.password)

    if (!pass) {
        return res.status(500).json({ message: "Password do not match" })
    }

    //send token

    const token = jwt.sign({ userId: result._id }, process.env.JWT_KEY)

    //send cookie

    res.cookie("finance", token, { maxAge: 1000 * 60 * 60, httpOnly: true })

    res.json({
        message: "User login Success",
        result: {
            username: result.userName,
            email: result.email,
        }
    })
})




exports.logoutUser = asyncHandler(async (req, res) => {

    res.clearCookie("finance")

    res.json({ message: "User logout Success" })
})