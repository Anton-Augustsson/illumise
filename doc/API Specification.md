
# API Specification

## List of required functions for each interface 

### request
```js
/**
 * set payment to done and remove chat (will still be accessible in x time)
 * @param {string} requestID - The request id of the request to be changed status to done
 */
completeRequest(requestID)
```

#### provider
```js
/**
 * get available request in x radius from location.
 * @param {string} geoLocation - The current location of the provider
 */
getNearRequests(geoLocation)

/**
 * select an available request
 * @param {string} providorID - The id of the provider with select a request to performed
 * @param {string} requestID - The id of the request to be selected
 */
set(providorID, requestID)

/**
 * Get requests that the provider has set
 * @param {string} providorID - The id of the providers set requests 
 * @param {int} num - The number of how many requests to return starting from most reasont
 */
getUserProviding(providorID, num)
```


#### requester
```js
/**
 * Create a new request
 * @param {string} requestID - The user id for the user who want to create the request
 * @param {json} data - A object of the request. Needs to match the structure of database request
 */
newRequest(requestID, data);

/**
 * Get the users request
 * @param {string} requestID - The user id of the users requests
 * @param {int} num - The number of how many requests to return starting from most reasont
 */
getUserRequest(requestID, num)  // num is the number of my requests starting from most recent

/**
 * remove a request that the user has created
 * @param {string} requestID - The requester id of the users requests to be deleted
 */
removeRequest(requestID);

/**
 * give rating on service provider
 * @param {string} requestID - The requester id of the users who review the provider
 * @param {string} providorID - The id of the providers to be reviewed
 * @param {int} rating - A number between 0 and 5, where 5 is best rating.
 */
reviewProvider(requestID, providerID, rating);

/**
 * accept the provider 
 * @param {string} requestID - The id of the request that accepts the provider
 * @param {string} providorID - The id of the providers witch has set the request 
 */
acceptProvider(requestID, providerID)  
```

#### chat

```js
/**
 * sends a message to a person 
 * @param {string} userID - The id of the user that sends a message
 * @param {string} chatID - The id of the chat witch is between the provider and requester
 */
sendMessage(userID, chatID);

/**
 * get all messages from a specific chat
 * @param {string} userID - The id of the user that sends a message
 * @param {string} chatID - The id of the chat witch is between the provider and requester
 */
getAllMessages(userID, chatID);

/**
 * setup a new chat for a new service provider
 * @param {string} requestID - The id of the request that is the chat should be created for
 */
newChat(requestID);

/**
 * remove chat if no longer interested in chat
 * @param {string} chatID - The id of the chat witch is between the provider and requester
 */
removeChat(chatID)  
```

#### account
```js
/**
 * create new account
 * @param {json} credentials - A object of the users credentials.
 */
createAccount(credentials);

/**
 * remove specified account
 * @param {string} userID - The user id of the account that should be deleted
 */
removeAccount(userID);

/**
 * enter key word and the value to be changed. Enter multiple keys and-values will be verified if they are correct keys. Or send an object that a class defines with values.
 * @param {string} userID - The user id of the account that should be changed
 * @param {json} credentials - A object of the users credentials.
 */
changeCredentials(userID, credentials);
```

### Client Communication API
```
serviceRequest.<function>
serviceRequset.provider.<function>
serviceRequset.requester.<function>
communication.chat.<function>
communication.account.<function>
```

### Rest API
```
<url>/serviceRequset/<request>
```

### Server API
We will use the same functions as the Client Communcation API

## Credentials
```js
firstName: <string>,
lastName: <string>,
email: <string>,
token: <string>,
phone: <string>
```
