const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")



exports.protectedRoute = asyncHandler(async (req, res, next) => {
    const token = req.cookies.finance

    if (!token) {
        return res.status(401).json({ message: "No Cookie Found" })
    }

    jwt.verify(token, process.env.JWT_KEY, async (err, decode) => {
        if (err) {
            return res.status(401).json({ message: err.message || "Unauthorized access" })
        }

        req.body.userId = decode.userId

        next()

    })

})