#!/usr/bin/env bash
set -euo pipefail


curl -X PUT -d "requestID=anton" http://localhost:3000/request/completeRequest
curl -X PUT -d "requestID=anton&njet=get" http://localhost:3000/request/completeRequest
curl http://localhost:3000/request/provider/getNearRequests?geoLocation=gdfsg
curl http://localhost:3000/request/provider/set?providorID=gdfsg&requestID=sdaf
curl http://localhost:3000/request/provider/getUserProviding?providorID=gdfsg&num=1
curl http://localhost:3000/request/requester/getMyRequest?requestID=gdfsg&num=1
curl -X POST -d "requestID=anton&data=some data" http://localhost:3000/request/requester/newRequest
curl -X DELETE -d "requestID=anton" http://localhost:3000/request/requester/removeRequest
curl -X PUT -d "requestID=anton&providorID=notAnton&rating=2" http://localhost:3000/request/requester/reviewProvider
curl -X PUT -d "requestID=anton&providorID=notAnton" http://localhost:3000/request/requester/acceptProvider

curl -X PUT -d "credentials=some data" http://localhost:3000/account/createAccount
curl -X PUT -d "userID=some data" http://localhost:3000/account/createAccount
curl -X DELETE -d "userID=anton" http://localhost:3000/account/removeAccount
curl -X POST -d "credentials=some data" http://localhost:3000/account/changeCredentials
curl -X POST -d "userID=anton&credentials=some data" http://localhost:3000/account/changeCredentials

curl -X PUT -d "userID=anton&chatID=21savage" http://localhost:3000/chat/sendMessage
curl http://localhost:3000/chat/getAllMessages?userID=sadf&chatID=gdfsg
curl -X PUT -d "userID=anton" http://localhost:3000/chat/newChat
curl -X DELETE -d "userID=anton" http://localhost:3000/chat/removeChat
curl -X DELETE -d "usersID=anton" http://localhost:3000/chat/removeChat