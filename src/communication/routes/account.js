const express = require('express');
const router = express.Router();

/**
 * create new account
 */
router.put('/createAccount', (req, res) => {
    console.log(req.data);
  return res.send('Received a PUT HTTP method');
});

/**
 * remove specified account
 */
router.delete('/removeAccount', (req, res) => {
  return res.send('Received a DELETE /removeAcount HTTP method');
});

/**
 * enter key word and the value to be changed.
 * Enter multiple keys and-values will be verified if they are correct keys.
 * Or send an object that a class defines with values.
 */
router.post('/changeCredentials', (req, res) => {
  return res.send('Received a PUT HTTP method');
});

module.exports = router;
