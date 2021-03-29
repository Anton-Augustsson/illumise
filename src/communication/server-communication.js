/** Initialize Communication */
var app = require('express')();

/** Initialize WebSocket */
/** https://www.tutorialspoint.com/socket.io/socket.io_hello_world.htm */

var http = require('http').Server(app);
var io = require('socket.io')(http);


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

/** Initialize Rest API  */
app.get('/', (req, res) => {
  return res.send('Received a GET HTTP method');
});
 
app.post('/', (req, res) => {
  return res.send('Received a POST HTTP method');
});
 
app.put('/', (req, res) => {
  return res.send('Received a PUT HTTP method');
});
 
app.delete('/', (req, res) => {
  return res.send('Received a DELETE HTTP method');
});

/** Listen on port */
http.listen(3000, function() {
   console.log('listening on *:3000');
});

/* 
app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
*/
