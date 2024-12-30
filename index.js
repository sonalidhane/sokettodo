const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const { adminProtected, employeeProtected } = require("./middlewares/protected.middleware")
const { app, httpServer } = require("./socket/socket-server")
require("dotenv").config()

// const app = express()
app.use(express.json()) // req.body
app.use(cookieParser()) // req.cookies
app.use(express.static("dist")) // req.cookies
app.use(cors({
    origin: "https://sokettodo.onrender.com",
    credentials: true
}))

app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/admin", adminProtected, require("./routes/admin.routes"))
app.use("/api/employee", employeeProtected, require("./routes/employee.route"))
app.use("*", (req, res) => {
    res.sendFile(Path2D.join(__dirname, "dist", "index.html")).json({ message: "reource not found" })
})
// express error handler
app.use((err, req, res, next) => {
    if (err) {
        console.log(err)
        return res.status(500).json({ message: "something went wrong" })
    }
})

mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", () => {
    console.log("mongo connected")
    httpServer.listen(process.env.PORT, console.log("server running"))
})
