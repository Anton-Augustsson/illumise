# API Specification
## List of required functions for each interface 
## serviceRequest
```js
/**
 * set payment to done and remove chat (will still be accessible in x time)
 */
finishRequest();
```
### provider
```js
/**
 * get available request in x radius from location.
 */
getNearRequests(); 

/**
 * select an available request
 */
selectRequest(); 
```


### requester
```js
/**
 * Create a new request
 * @param {string} user - The user id for the user who want to create the request
 * @param {string} type - The type of requst. ex: "food", "package"
 * @param {json} data - A object of the request. Needs to match the structure of database request
 */
newRequest(user, type, data);

/**
 * Get the users request
 * @param {string} user - The user id of the users requests
 * @param {int} num - The number of how many requests to return starting from most reasont
 */
getMyRequest(user, num)  // num is the number of my requests starting from most recent

/**
 * remove a request that the user has created
 */
removeRequest();

/**
 * give rating on service provider
 */
reviewProvider();

/**
 * accept the provider 
 */
acceptProvider()  
```

## chat

```js
/**
 * sends a message to a person 
 */
sendMessage();

/**
 * get all messages from a specific chat
 */
getAllMessages();

/**
 * setup a new chat for a new service provider
 */
newChat();

/**
 * remove chat if no longer interested in chat
 */
removeChat()  
```

## account
```js
/**
 * create new account
 */
createAccount();

/**
 * remove specified account
 */
removeAccount();

/**
 * enter key word and the value to be changed. Enter multiple keys and-values will be verified if they are correct keys. Or send an object that a class defines with values.
 */
changeCredentials();
```

## Client Communication API
```
serviceRequest.<function>
serviceRequset.provider.<function>
serviceRequset.requester.<function>
communication.chat.<function>
communication.account.<function>
```

## Rest API
```
<url>/serviceRequset/<request>
```

## Server API
We will use the same functions as the Client Communcation API