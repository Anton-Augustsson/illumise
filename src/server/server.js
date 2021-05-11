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
 * Initialize server interface
 * @type {DBInterface}
 */
let db;
let connected = false;

async function initDB()
{
    let url = "mongodb+srv://admin:123@cluster0.j0bss.mongodb.net/main?retryWrites=true&w=majority";
    db = new DBInterface(undefined, undefined, url, true);
    connected = await db.connect();
    //db.clear();
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

const review = require('./routes/review');
app.use('/review', review);

/**
 * Initialize WebSocket
 * https://www.tutorialspoint.com/socket.io/socket.io_hello_world.htm
 */
io.on('connection', function(socket) 
{
    console.log("New connection");

    socket.on('join', ({ senderId, name , chatID }) => 
    {
        console.log('join', senderId, name, chatID);
        socket.join(chatID);
    });

    socket.on('sendMsg', ({ chatID, msg, time, isProvider }, callback) => 
    {
        console.log('sendMsg', chatID, msg, time, isProvider );
        io.to(chatID).emit('msg', { chatID: chatID, msg: msg, time: time, isProvider: isProvider });
        db.chat.addMessage(chatID, msg, isProvider);
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
