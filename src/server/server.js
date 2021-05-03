/** Initialize Communication */

const { DBInterface } = require("./db/dbInterface");
const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }
});

/**
 * Initialze server interface
 */
let db;
let connected;

async function initDB()
{
    let url = "mongodb+srv://admin:123@cluster0.j0bss.mongodb.net/main?retryWrites=true&w=majority";
    db = new DBInterface(undefined, undefined, url, true);
    connected = await db.connect();
    db.clear();
}

initDB();

/**
 * Initialize Rest API
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors()); // enable cors for http-requests

// export db
module.exports = db;
const request = require('./routes/request');
app.use('/request', request);

const chat = require('./routes/chat');
app.use('/chat', chat);

const account = require('./routes/account');
app.use('/account', account);

/**
 * Initialize WebSocket
 * https://www.tutorialspoint.com/socket.io/socket.io_hello_world.htm
 */
io.on('connection', function(socket) {
    console.log("New connection");

    socket.on('join', ({ name, room }, callback) => {
        console.log(name, room);

        socket.join(room); // sends all new messages to this socket

        //callback();
    });

    socket.on('sendMsg', ({ name, room }, msg, callback) => {
        const user = "user";
        io.to(room).emit('msg', { user: user, text: msg});
        // save new msg
        callback();
    });

    socket.on('disconnect', () => {
        console.log("Lost connection");
    });
});


/**
 * Listen on port
 */
server.listen(process.env.PORT || 3000, () => console.log(`Server has started.`));
