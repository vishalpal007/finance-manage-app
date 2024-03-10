const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")
const { protectedRoute } = require("./middleware/protected")
require("dotenv").config({ path: "./.env" })


const app = express()

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(cookieParser())


app.use("/api/user", require("./routes/userRoute"))
app.use("/api/transaction", protectedRoute, require("./routes/transactionRoute"))

app.use("*", (req, res) => {
    res.status(404).json("resource not found")
})

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message || "something went wrong" })
})


mongoose.connect(process.env.MONGO_URL)

mongoose.connection.once("open", () => {
    console.log("mongo connected")
    app.listen(process.env.PORT, console.log("Server running"))
})

