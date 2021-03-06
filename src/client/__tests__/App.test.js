/**
 * @format
 */

import 'react-native';
import request from '../modules/client-communication/request';
import chat from '../modules/client-communication/chat';
import account from '../modules/client-communication/account';

describe("Testing client communication", () =>
{
    // TODO: add more

    beforeAll(async () =>
    {
        //renderer.create(<App />);
    });

    /*
     * Tests account
     */
    it("test createAccount removeAccount", async () =>
    {
        // valid request
        let userID = await createDummyUser(); 
        let response = await account.removeAccount(userID);
        expect(response).not.toBeNull();

        // invalid request createAccount
        let invalidCredentials = {"firstsalsaName":"J", "lastName":"j", "email":"e", "token":"s" };
        let responseErrorC = await account.createAccount(invalidCredentials);
        expect(responseErrorC).toBeNull();

        // invalid request removeAccount
        let responseErrorR = await account.removeAccount("invalid");
        expect(responseErrorR).toBeNull();
    });

    it("test changeCredentials", async () =>
    {
        // valid request
        let newCredentials = {"firstName":"Ddsfa", "lastName":"sdddwrfa", "email":"jhgr", "token":"dsaf" };
        let userID = await createDummyUser(); 
        let response = await account.changeCredentials(userID, newCredentials);
        expect(response).not.toBeNull();
        let responseR = await account.removeAccount(userID);
        expect(responseR).not.toBeNull();

        // invalid request
        let responseError = await account.changeCredentials(userID, "invalid");
        expect(responseError).toBeNull();
    });


    it("test get", async () =>
    {
        // valid request
        let password = "dsaf";
        let email = "email@google.com";
        let newCredentials = {"firstName":"Ddsfa", "lastName":"sdddwrfa", "email":email, "token":password };
        let userID = await createDummyUser();
        let response = await account.changeCredentials(userID, newCredentials);
        expect(response).not.toBeNull();
        let responseG = await account.get(email, password);
        expect(responseG).not.toBeNull();
        let responseR = await account.removeAccount(userID);
        expect(responseR).not.toBeNull();

        // invalid request
        let responseError = await account.changeCredentials(userID, "invalid");
        expect(responseError).toBeNull();
    });

    /*
     * Tests request
     */

    it("test newRequest and removeRequest", async () =>
    {
        // valid request
        let userID = await createDummyUser();
        let requestID = await createDummyRequest(userID);
        let response = await request.requester.removeRequest(requestID);
        expect(response).not.toBeNull();
        let responseR = await account.removeAccount(userID);
        expect(responseR).not.toBeNull();

        // invalid request newRequest
        let responseErrorN = await request.requester.newRequest('not requestID', "T1", { "some": "thing" });
        expect(responseErrorN).toBeNull();

        // invalid request removeRequest
        let responseErrorR = await request.requester.removeRequest('not requestID');
        expect(responseErrorR).toBeNull();
    });

    it("test completeRequest", async () =>
    {
        // valid request
        let userID = await createDummyUser();
        let requestID = await createDummyRequest(userID);
        let response = await request.completeRequest(requestID);
        expect(response).not.toBeNull();
        let responseD = await request.requester.removeRequest(requestID);
        expect(responseD).not.toBeNull();
        let responseR = await account.removeAccount(userID);
        expect(responseR).not.toBeNull();

        // invalid request
        let responseError = await request.completeRequest('antonabcdefg');
        expect(responseError).toBeNull();
    });

    it("test getNearRequests", async () =>
    {
        // valid request
        let userID = await createDummyUser();
        let pointStart = coordsToGeoJSON([17.638825          , 59.854004]);
        let requestID = await request.requester.newRequest(userID, "T1", { "header": "thing", "body": "things",  "geoLocation": pointStart, "cost": "allot"});
        expect(requestID).not.toBeNull();
        let response = await request.provider.getNearRequests(pointStart, 360, 1);
        expect(response[0]).not.toBeNull();
        let responseD = await request.requester.removeRequest(requestID);
        expect(responseD).not.toBeNull();
        let responseR = await account.removeAccount(userID);
        expect(responseR).not.toBeNull();

        // invalid request
        let responseError = await request.provider.getNearRequests('not a geolocation', 231, 1);
        expect(responseError).toBeNull();
    });

    it("test set", async () =>
    {
        // valid request
        let userID = await createDummyUser();
        let userID2 = await createDummyUser2();
        let requestID = await createDummyRequest(userID);
        let response = await request.provider.set(requestID, userID2);
        expect(response).not.toBeNull();
        let responseD = await request.requester.removeRequest(requestID);
        expect(responseD).not.toBeNull();
        let responseRA1 = await account.removeAccount(userID);
        expect(responseRA1).not.toBeNull();
        let responseRA2 = await account.removeAccount(userID2);
        expect(responseRA2).not.toBeNull();

        // invalid request
        let responseError = await request.provider.set('not providerID', 'not requestID');
        expect(responseError).toBeNull();
    });

    it("test acceptProvider", async () =>
    {
        // valid request
        // TODO: not implemented in dbInterface
        let userID = await createDummyUser();
        let userID2 = await createDummyUser2();
        let requestID = await createDummyRequest(userID);
        let response = await request.requester.acceptProvider(requestID, userID2);
        expect(response).not.toBeNull();
        let responseD = await request.requester.removeRequest(requestID);
        expect(responseD).not.toBeNull();
        let responseRA1 = await account.removeAccount(userID);
        expect(responseRA1).not.toBeNull();
        let responseRA2 = await account.removeAccount(userID2);
        expect(responseRA2).not.toBeNull();

        // invalid request
        let responseError = await request.requester.acceptProvider('not requestID', 'not providerID');
        expect(responseError).toBeNull();
    });

    it("test getUserProviding", async () =>
    {
        // valid request
        let userID = await createDummyUser();
        let userID2 = await createDummyUser2();
        let requestID = await createDummyRequest(userID);
        let responseA = await request.requester.acceptProvider(requestID, userID2);
        expect(responseA).not.toBeNull();
        let response = await request.provider.getUserProviding(userID2, 1);
        expect(response[0]).not.toBeNull(); //FIXME
        let responseD = await request.requester.removeRequest(requestID);
        expect(responseD).not.toBeNull();
        let responseRA1 = await account.removeAccount(userID);
        expect(responseRA1).not.toBeNull();
        let responseRA2 = await account.removeAccount(userID2);
        expect(responseRA2).not.toBeNull();

        // invalid request
        let responseError = await request.provider.getUserProviding('not sdafadsfiderID', 1);
        expect(responseError).toBeNull();
    });

    it("test getUserRequest", async () =>
    {
        // valid request
        let userID = await createDummyUser();
        let pointStart = coordsToGeoJSON([17.638825          , 59.854004]);
        let requestID = await request.requester.newRequest(userID, "T1", { "header": "thing", "body": "things",  "geoLocation": pointStart, "cost": "allot"});
        let response = await request.requester.getUserRequest(userID, 1);
        expect(response[0]).not.toBeNull();
        let responseD = await request.requester.removeRequest(requestID);
        expect(responseD).not.toBeNull();
        let responseRA1 = await account.removeAccount(userID);
        expect(responseRA1).not.toBeNull();

        // invalid request
        let responseError = await request.requester.getUserRequest('not requestID', 1);
        expect(responseError).toBeNull();
    });


    it("test reviewProvider", async () =>
    {
        // valid request
        // TODO: review not implemented
        let user1ID = await createDummyUser();
        let user2ID = await createDummyUser2();
        let requestID = await createDummyRequest(user1ID);
        let message = "very good";
        let reviewType;
        let response = await request.requester.reviewProvider(requestID, user1ID, user2ID, message, 3, reviewType);
        expect(response).not.toBeNull();
        let responseD = await request.requester.removeRequest(requestID);
        expect(responseD).not.toBeNull();
        let responseRA1 = await account.removeAccount(user1ID);
        expect(responseRA1).not.toBeNull();
        let responseRA2 = await account.removeAccount(user2ID);
        expect(responseRA2).not.toBeNull();

        // invalid request
        let responseError = await request.requester.reviewProvider('not requestID', 'not providerID', 21);
        expect(responseError).toBeNull();
    });

    /*
     * Tests Chat
     */

    it("test newChat and removeChat", async () =>
    {
        // invalid request
        let userID = await createDummyUser();
        let userID2 = await createDummyUser2();
        let requestID = await createDummyRequest(userID);
        let chatID = await chat.newChat(requestID, userID, userID2);
        expect(chatID).not.toBeNull();
        let responseR = await chat.removeChat(chatID);
        expect(responseR).not.toBeNull();

        let responseD = await request.requester.removeRequest(requestID);
        expect(responseD).not.toBeNull();
        let responseRA1 = await account.removeAccount(userID);
        expect(responseRA1).not.toBeNull();
        let responseRA2 = await account.removeAccount(userID2);
        expect(responseRA2).not.toBeNull();

        // invalid request newChat
        let responseErrorN = await chat.newChat('not a requestID', null);
        expect(responseErrorN).toBeNull();

        // invalid request removeChat
        let responseErrorR = await chat.removeChat('not a chatID');
        expect(responseErrorR).toBeNull();
    });

   it("test sendMessage", async () =>
    {
        // valid request
        let userID = await createDummyUser();
        let userID2 = await createDummyUser2();
        let requestID = await createDummyRequest(userID);
        let chatID = await chat.newChat(requestID, userID, userID2);
        expect(chatID).not.toBeNull();
        let response = await chat.sendMessage(chatID, "hello im here", true);
        expect(response).not.toBeNull();
        let responseR = await chat.removeChat(chatID);
        expect(responseR).not.toBeNull();

        let responseD = await request.requester.removeRequest(requestID);
        expect(responseD).not.toBeNull();
        let responseRA1 = await account.removeAccount(userID);
        expect(responseRA1).not.toBeNull();
        let responseRA2 = await account.removeAccount(userID2);
        expect(responseRA2).not.toBeNull();
        
        let responseError = await chat.sendMessage('antonabcdefg', 'chat123');
        expect(responseError).toBeNull();
    });

    it("test getAllMessages", async () =>
    {
        let userID = await createDummyUser();
        let userID2 = await createDummyUser2();
        let requestID = await createDummyRequest(userID);
        let chatID = await chat.newChat(requestID, userID, userID2);
        expect(chatID).not.toBeNull();
        let responseS = await chat.sendMessage(chatID, "hello im here", true);
        expect(responseR).not.toBeNull();
        let response = await chat.getChatFromID(chatID);
        expect(response).not.toBeNull();
        let responseR = await chat.removeChat(chatID);
        expect(responseS).not.toBeNull();

        let responseD = await request.requester.removeRequest(requestID);
        expect(responseD).not.toBeNull();
        let responseRA1 = await account.removeAccount(userID);
        expect(responseRA1).not.toBeNull();
        let responseRA2 = await account.removeAccount(userID2);
        expect(responseRA2).not.toBeNull();

        // invalid request
        let responseError = await chat.getChat('userid is notvalid', 'not a chat id');
        expect(responseError).toBeNull();
    });

    /*
     * Finnish tests
     */
    afterAll(async () =>
    {
        // if needed
    });
});

let num = 1;

async function createDummyUser(){
    let credentials = {"firstName":"F", "lastName":"D", "email":"TestA" + num + "@mail.test", "token":"L" };
    num += 1;
    let userID      = await account.createAccount(credentials);
    expect(userID).not.toBeNull();
    return userID;
}

async function createDummyUser2(){
    let credentials = {"firstName":"SDA", "lastName":"BLDID", "email":"TestB" + num + "@mail.test", "token":"Token" };
    num += 1;
    let userID      = await account.createAccount(credentials);
    expect(userID).not.toBeNull();
    return userID;
}

async function createDummyRequest(userID){
    let requestID = await request.requester.newRequest(userID, "T1", { "header": "thing", "body": "things", "cost": 100});
    expect(requestID).not.toBeNull();
    return requestID;
}

function coordsToGeoJSON(coordinates)
{
    return { "type": "Point", "coordinates": coordinates };
}
