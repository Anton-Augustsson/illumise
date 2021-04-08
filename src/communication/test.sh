#!/usr/bin/env bash
set -euo pipefail


curl -X PUT -d "requestID=anton" http://localhost:3000/serviceRequests/completeRequest
#curl -X GET -d "requestID=anton" http://localhost:3000/serviceRequests/completeRequest
curl -X POST -d "requestID=anton&data=some data" http://localhost:3000/serviceRequests/requester/newRequest
