const express = require('express');
const router = express.Router();

/**
 * set payment to done and remove chat (will still be accessible in x time)
 */
router.put('/finishRequest', async (req, res) => {
  return res.send('Received a PUT HTTP method');
});

/**
 * get available request in x radius from location.
 */
router.get('/provider/getNearRequests', async (req, res) => {
  return res.send('Received a GET HTTP method');
});

/**
 * select an available request
 */
router.get('/provider/selectRequest', async (req, res) => {
  return res.send('Received a GET HTTP method');
});

/**
 * Create a new request
 * @param {string} user - The user id for the user who want to create the request
 * @param {string} type - The type of requst. ex: "food", "package"
 * @param {json} data - A object of the request. Needs to match the structure of database request
 */
router.post('/requester/newRequest', async (req, res) => {
  console.log(req.body.userID);
  console.log(req.params);
  return res.send('Received a POST HTTP method newRequest');
});

/**
 * Get the users request
 * @param {string} user - The user id of the users requests
 * @param {int} num - The number of how many requests to return starting from most reasont
 */
router.get('/requester/getMyRequest', async (req, res) => {
  return res.send('Received a GET /requester/getMyRequest HTTP method');
});

/**
 * remove a request that the user has created
 */
router.delete('/requester/removeRequest', async (req, res) => {
  return res.send('Received a GET /requester/removeRequest HTTP method');
});

/**
 * give rating on service provider
 */
router.put('/requester/reviewProvider', async (req, res) => {
  console.log(req.params);
  console.log(req.body);
  console.log(req.body.name);
  return res.send('Received a PUT HTTP method');
});

/**
 * accept the provider
 */
router.put('/requester/acceptProvider', async (req, res) => {
  return res.send('Received a PUT HTTP method');
});

module.exports = router;
