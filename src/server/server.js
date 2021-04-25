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
app.use(cors()); // Maby is enufe for rest api
/*
var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // allow requests from any other server
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); // allow these verbs
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");
};
app.use(allowCrossDomain); // plumbing it in as middleware
*/
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

//Whenever someone connects this gets executed
io.on('connection', function(socket) {
    // chat id whill be uses when connecting to listen to incoming msg from that chat group

    /** TODO: create connection */
   console.log('A user connected');

    /** TODO: Disconect */
   //Whenever someone disconnects this piece of code executed
   socket.on('disconnect', function () {
      console.log('A user disconnected');

   });

    /** TODO: Handle message */
   // new message from client
   socket.on('msg', function(data) {
      //Send message to everyone
      io.sockets.emit('newmsg', data);

       // TODO: who sent it
       //   A Databse Table for messages and the service provider and service requester
       // TODO: message only from (service provider -> service requester) (serice requester -> service provider)
       // TODO: save massage in database (call server function)
       //
   });

});


/**
 * Listen on port
 */
server.listen(process.env.PORT || 3000, () => console.log(`Server has started.`));
