#!/usr/bin/env bash
set -euo pipefail


curl -X PUT -d "requestID=anton" http://localhost:3000/request/completeRequest
#curl -X GET -d "requestID=anton" http://localhost:3000/serviceRequests/completeRequest
curl -X POST -d "requestID=anton&data=some data" http://localhost:3000/request/requester/newRequest
curl -X PUT -d "credentials=some data" http://localhost:3000/account/createAccount
#curl -X DELETE -d "userID=anton" http://localhost:3000/account/removeAccount
#curl -X POST -d "credentials=some data" http://localhost:3000/account/changeCredentials
#curl -X POST -d "userID=anton&credentials=some data" http://localhost:3000/account/changeCredentials
curl -X PUT -d "userID=anton&chatID=21savage" http://localhost:3000/chat/sendMessage
#curl -X PUT -d "userID=anton&chatID=21savage" http://localhost:3000/chat/newChat
curl -X DELETE -d "userID=anton" http://localhost:3000/chat/removeChat
