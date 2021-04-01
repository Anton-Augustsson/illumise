const express = require('express');
const router = express.Router();

/**
 * sends a message to a person
 */
router.put('/sendMessage', (req, res) => {
    console.log(req.data);
  return res.send('Received a PUT HTTP method');
});

/**
 * get all messages from a specific chat
 */
router.get('/getAllMessages', (req, res) => {
  return res.send('Received a GET HTTP method');
});

/**
 * setup a new chat for a new service provider
 */
router.put('/newChat', (req, res) => {
  return res.send('Received a PUT HTTP method');
});

/**
 * remove chat if no longer interested in chat
 */
router.delete('/removeChat', (req, res) => {
  return res.send('Received a GET /removeChat HTTP method');
});


module.exports = router;
