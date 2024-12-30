const express = require("express")
const http = require("http")
const { Server } = require("socket.io")


const app = express()
const httpServer = http.createServer(app)

const io = new Server(httpServer, { cors: "*" })

io.emit()// ag deta bhejana hain to emit use karaych
module.exports = { io, app, httpServer }