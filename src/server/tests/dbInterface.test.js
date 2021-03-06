/**
 * This file contains Jest Tests for the database interfaces
 */

const { DBInterface } = require("../db/dbInterface");
const { ReviewType }  = require("../db/dbReviewsInterface");

describe("Testing dbInterface", () =>
{
    let url = "mongodb+srv://admin:123@cluster0.j0bss.mongodb.net/main?retryWrites=true&w=majority";
    let db = new DBInterface(undefined, undefined, url, true);
    let connected = false;

    beforeAll(async () =>
    {
        connected = await db.connect();
        await db.clear();
    });

    it("Connect to server", async () => 
    {
        expect(connected).toBe(true);
    });

    it("Create & Remove Account", async () => 
    {
        if (!connected) fail();

        // Add
        let mail = "test@mail.test";
        let password = "*";
        let user1ID = await db.accounts.add("Test1", "Test1", mail, "+46123456789", password);
        let user2ID = await db.accounts.add("Test2", "Test2", mail, "+46123456789", password);
        expect(user1ID).not.toBe(null);
        expect(user2ID).toBe(null);

        let requestedUser = await db.accounts.get(mail, password);
        expect(requestedUser._id).toStrictEqual(user1ID);

        // Remove
        let result1 = await db.accounts.remove(user1ID);
        let result2 = await db.accounts.remove(user2ID);
        expect(result1).toBe(true);
        expect(result2).toBe(false);
    });

    it("Modify Account", async () => 
    {
        if (!connected) fail();

        let userID = await db.accounts.add("A1", "A1", "A1@mail.test", "+46123456789", "*");
        let result = await db.accounts.update(userID, lastName = "Testing");
        expect(result).toBe(true);
    });

    it("Create & Remove Request", async () => 
    {
        if (!connected) fail();

        // Add
        let userID    = await db.accounts.add("A2", "A2", "A2@mail.test", "+46123456789", "*");
        let requestID = await db.requests.add(userID, "T1", "this is a test");
        expect(requestID).not.toBe(null);
        // Remove
        let result = await db.requests.remove(requestID);
        expect(result).toBe(true);
    });
    
    it("Set Request Provider", async () => 
    {
        if (!connected) fail();

        let userID    = await db.accounts.add("A3", "A3", "A3@mail.test", "+46123456789", "*");
        let user2ID   = await db.accounts.add("A4", "A4", "A4@mail.test", "+46123456789", "*");
        let requestID = await db.requests.add(userID, "T2", "this is a test");
        let result    = await db.requests.setProvider(requestID, user2ID);
        expect(result).toBe(true);
    });

    it("Get User Requests", async () => 
    {
        if (!connected) fail();

        let userID1    = await db.accounts.add("A5", "A5", "A5@mail.test", "+46123456789", "*");
        let userID2    = await db.accounts.add("A6", "A6", "A6@mail.test", "+46123456789", "*");
        let requestID1 = await db.requests.add(userID1, "T3", "this is a test");
        let requestID2 = await db.requests.add(userID1, "T4", "this is a test");
        
        let requests = await db.requests.getUserRequests(userID2);
        expect(requests.length).toBe(0);
        requests = await db.requests.getUserRequests(userID1);
        expect(requests.length).toBe(2);
        if (requests.length == 2)
        {
            expect(requests[0]._id).toStrictEqual(requestID1);
            expect(requests[1]._id).toStrictEqual(requestID2);
        }

        // Test with given size
        requests = await db.requests.getUserRequests(userID1, 1);
        
        expect(requests.length).toBe(1);

        // Test with larger size
        requests  = await db.requests.getUserRequests(userID1, 5);
        expect(requests.length).toBe(5);
    });

    it("Get User Providing", async () => 
    {
        if (!connected) fail();

        let user1ID    = await db.accounts.add("A7", "A7", "A7@mail.test", "+46123456789", "*");
        let user2ID    = await db.accounts.add("A8", "A8", "A8@mail.test", "+46123456789", "*");
        let request1ID = await db.requests.add(user1ID, "T5", "this is a test");
        let request2ID = await db.requests.add(user1ID, "T6", "this is a test");

        let result1 = await db.requests.setProvider(request1ID, user2ID);
        let result2 = await db.requests.setProvider(request2ID, user2ID);
        expect(result1).toBe(true);
        expect(result2).toBe(true);

        let providing = await db.requests.getUserProviding(user1ID);
        expect(providing.length).toBe(0);
        providing = await db.requests.getUserProviding(user2ID);
        expect(providing.length).toBe(2);
        if (providing.length == 2)
        {
            expect(providing[0]._id).toStrictEqual(request1ID);
            expect(providing[1]._id).toStrictEqual(request2ID);
        }

        // Test with larger size
        providing = await db.requests.getUserProviding(user2ID, 5);
        expect(providing.length).toBe(5);
    });

    it("Set Request Completed", async () => 
    {
        if (!connected) fail();

        let userID    = await db.accounts.add("A9", "A9", "A9@mail.test", "+46123456789", "*");
        let requestID = await db.requests.add(userID, "T7", "this is a test");
        let result    = await db.requests.setCompleted(requestID);
        expect(result).toBe(true);
    });

    it("Create & Remove Chat", async () => 
    {
        if (!connected) fail();

        // Add
        let user1ID   = await db.accounts.add("A10", "A10", "A10@mail", "+46123456789", "*");
        let user2ID   = await db.accounts.add("A11", "A11", "A11@mail", "+46123456789", "*");
        let requestID = await db.requests.add(user1ID, "T8", "this is a test");
        let chatID    = await db.chat.add(requestID, user1ID, user2ID);
        expect(chatID).not.toBe(null);
        // Remove
        let result    = await db.chat.remove(chatID);
        expect(result).toBe(true);
    });

    it("Add & Get Messages", async () => 
    {
        if (!connected) fail();

        let user1ID   = await db.accounts.add("A12", "A12", "A12@mail", "+46123456789", "*");
        let user2ID   = await db.accounts.add("A13", "A13", "A13@mail", "+46123456789", "*");
        let requestID = await db.requests.add(user1ID, "T9", "this is a test");
        let chatID    = await db.chat.add(requestID, user1ID, user2ID);
        
        let message   = "msg1";
        let result    = await db.chat.addMessage(chatID, message, true);
        expect(result).toBe(true);

        let chat = await db.chat.getChat(requestID, user1ID, false);
        expect(chat._id).toStrictEqual(chatID);
        expect(chat.provider._id).toStrictEqual(user2ID);
        expect(chat.requester._id).toStrictEqual(user1ID);
        expect(chat.provider.messages.length).toBe(1);
        expect(chat.requester.messages.length).toBe(0);
    });

    it("Get nearby requests", async () => 
    {
        if (!connected) fail();

        // define points
        let pointStart = coordsToGeoJSON([17.638825          , 59.854004]);
        let point250m  = coordsToGeoJSON([17.63557416149649  , 59.85551799680195]);
        let point360m  = coordsToGeoJSON([17.634050666730886 , 59.856218407454094]);
        let point1200m = coordsToGeoJSON([17.6595067923536   , 59.856922145172355]);
        let point2000m = coordsToGeoJSON([17.67298542106755  , 59.85936848021486]);

        // Add user and requests
        let userID = await db.accounts.add("Sven", "test", "mail@mail.mail", "password123", "+46123456789");

        let requestID_pointStart = await db.requests.add(userID, "T5", "starting point", pointStart);
        let requestID_point250m  = await db.requests.add(userID, "T5", "250m", point250m);
        let requestID_point360m  = await db.requests.add(userID, "T5", "360m", point360m);
        let requestID_point1200m = await db.requests.add(userID, "T5", "1200m", point1200m);
        let requestID_point2000m = await db.requests.add(userID, "T5", "2000m", point2000m);

        expect(requestID_pointStart).not.toBe(null);
        expect(requestID_point250m ).not.toBe(null);
        expect(requestID_point360m ).not.toBe(null);
        expect(requestID_point1200m).not.toBe(null);
        expect(requestID_point2000m).not.toBe(null);

        // get the requests
        let requests = await db.requests.getUserRequests(userID);
        expect(requests).toHaveLength(5);

        // TESTS
        let maxDistance, maxRequests, result, shouldFind, shouldNotFind;

        /* TEST 1
            Get within 360m, maxRequests 5
        */
        maxDistance = 360;
        maxRequests = 5;
        shouldFind = ["starting point", "250m", "360m"];
        shouldNotFind = ["1200m", "2000m"];
        result = await db.requests.getNearby(pointStart, maxDistance, maxRequests);

        checkResultGetNearby(result, requests, maxRequests, shouldFind, shouldNotFind);

       /* TEST 2
            Get within 360m but maxRequests 2
            360m entry should not be returned due to maxRequests
        */
       maxRequests = 2;
       shouldFind = ["starting point", "250m"];
       shouldNotFind = ["360m", "1200m", "2000m"];
       result = await db.requests.getNearby(pointStart, maxDistance, maxRequests);

       checkResultGetNearby(result, requests, maxRequests, shouldFind, shouldNotFind);

       /* TEST 3
            Get within 1200m, no maxRequests set
        */
        maxDistance = 1200;
        maxRequests = undefined;
        shouldFind = ["starting point", "250m", "360m", "1200m"];
        shouldNotFind = ["2000m"];
        result = await db.requests.getNearby(pointStart, maxDistance, maxRequests);
    
        checkResultGetNearby(result, requests, maxRequests, shouldFind, shouldNotFind);

        /* TEST 4
            Get within 1180m, no maxRequests set
            Close to 1200m, but should be accurate enough to not include it
        */
        maxDistance = 1180;
        shouldFind = ["starting point", "250m", "360m"];
        shouldNotFind = ["1200m", "2000m"];
        result = await db.requests.getNearby(pointStart, maxDistance, maxRequests);

        checkResultGetNearby(result, requests, maxRequests, shouldFind, shouldNotFind);
    });

    it("Add reviews", async () =>
    {
        if (!connected) fail();

        let user1ID    = await db.accounts.add("A18", "A18", "A18@mail", "+46123456789", "*");
        let user2ID    = await db.accounts.add("A19", "A19", "A19@mail", "+46123456789", "*");
        let request1ID = await db.requests.add(user1ID, "T11", "this is a test");
        let request2ID = await db.requests.add(user1ID, "T12", "this is a test");
        let message1   = "It was OK";
        let message2   = "It was Good";

        let result = await db.reviews.add(user1ID, user2ID, request1ID, message1, 3, ReviewType.Requester);
        expect(result).toEqual(true);

        result = await db.reviews.add(user1ID, user2ID, request1ID, message2, 3, ReviewType.Requester);
        expect(result).toEqual(false); // Same request cant be added twice to the same collection

        result = await db.reviews.add(user1ID, user2ID, request1ID, message1, 1, ReviewType.Provider);
        expect(result).toEqual(true);

        result = await db.reviews.add(user1ID, user2ID, request1ID, message2, 2, ReviewType.Provider);
        expect(result).toEqual(false); // Same request cant be added twice to the same collection

        result = await db.reviews.add(user1ID, user2ID, request2ID, message2, 4, ReviewType.Requester);
        expect(result).toEqual(true);

        result = await db.reviews.add(user2ID, user1ID, request1ID, message1, 4, ReviewType.Provider);
        expect(result).toEqual(true);

        result = await db.reviews.add(user2ID, user1ID, request1ID, message2, 4, ReviewType.Provider);
        expect(result).toEqual(false);

        result = await db.reviews.add(user2ID, user1ID, request2ID, message2, 4, ReviewType.Provider);
        expect(result).toEqual(true);
    });

    it("Remove reviews", async () =>
    {
        if (!connected) fail();

        let user1ID   = await db.accounts.add("A40", "A40", "A40@mail", "+46123456789", "*");
        let user2ID   = await db.accounts.add("A41", "A41", "A41@mail", "+46123456789", "*");
        let requestID = await db.requests.add(user1ID, "T40", "this is a test");
        let message   = "It was OK";

        let result = await db.reviews.add(user1ID, user2ID, requestID, message, 3, ReviewType.Requester);
        result     = await db.reviews.add(user2ID, user1ID, requestID, message, 1, ReviewType.Requester);

        result = await db.reviews.removeTo(user2ID, requestID, ReviewType.Provider);
        expect(result).toEqual(false);

        result = await db.reviews.removeTo(user2ID, requestID, ReviewType.Requester);
        expect(result).toEqual(true);

        result = await db.reviews.removeTo(user2ID, requestID, ReviewType.Requester);
        expect(result).toEqual(false);

        result = await db.reviews.add(user2ID, user1ID, requestID, message, 4, ReviewType.Requester);
        expect(result).toEqual(true);

        result = await db.reviews.removeFrom(user1ID, requestID, ReviewType.Requester);
        expect(result).toEqual(true);

        result = await db.reviews.removeFrom(user1ID, requestID, ReviewType.Requester);
        expect(result).toEqual(false);
    });

    it("Get review to/from", async () => 
    {
        if (!connected) fail();

        let user1ID   = await db.accounts.add("A20", "A20", "A20@mail", "+46123456789", "*");
        let user2ID   = await db.accounts.add("A21", "A21", "A21@mail", "+46123456789", "*");
        let requestID = await db.requests.add(user1ID, "T13", "this is a test");
        let message   = "It was OK";
        let value     = 3;
        
        await db.reviews.add(user1ID, user2ID, requestID, message, value, ReviewType.Requester);
        await db.reviews.add(user2ID, user2ID, requestID, message, value, ReviewType.Requester);

        let result = await db.reviews.getSpecificToUser(user1ID, requestID, ReviewType.Requester);
        expect(result).not.toBe(null);
        expect(result.value).toBe(value);
        expect(result.message).toStrictEqual(message);
        expect(result.targetID).toStrictEqual(user1ID);

        result = await db.reviews.getAllToUser(user1ID, ReviewType.Requester);
        expect(result).not.toBe(null);
        expect(result.length).toBeGreaterThan(0);
        for (let i = 0; i < result.length; i++)
        {
            expect(result[i].targetID).toStrictEqual(user1ID);
            expect(result[i].requestID).toStrictEqual(requestID);
        }

        result = await db.reviews.getAllFromUser(user2ID, ReviewType.Requester);
        expect(result).not.toBe(null);
        expect(result.length).toBeGreaterThan(0);
    });

    it("Update a review", async () => 
    {
        if (!connected) fail();

        let user1ID   = await db.accounts.add("A22", "A22", "A22@mail", "+46123456789", "*");
        let user2ID   = await db.accounts.add("A23", "A23", "A23@mail", "+46123456789", "*");
        let requestID = await db.requests.add(user1ID, "T14", "this is a test");
        let message1  = "It OK";
        let message2  = "It was OK";

        await db.reviews.add(user1ID, user2ID, requestID, message1, 3, ReviewType.Requester);
        let result = await db.reviews.getSpecificToUser(user1ID, requestID, ReviewType.Requester);
        expect(result.message).toStrictEqual(message1);

        result = await db.reviews.update(user1ID, requestID, ReviewType.Requester, message2);
        expect(result).toBe(true);

        result = await db.reviews.getSpecificToUser(user1ID, requestID, ReviewType.Requester);
        expect(result.message).toStrictEqual(message2);
    });

    it("Get user rating", async () => 
    {
        if (!connected) fail();

        let user1ID   = await db.accounts.add("A24", "A24", "A24@mail", "+46123456789", "*");
        let user2ID   = await db.accounts.add("A25", "A25", "A25@mail", "+46123456789", "*");
        let requestID = await db.requests.add(user1ID, "T15", "this is a test");
        let message   = "It OK";
        let rating    = 3;

        await db.reviews.add(user1ID, user2ID, requestID, message, rating, ReviewType.Requester);
        let result = await db.reviews.getRating(user1ID, ReviewType.Requester);
        expect(result.averageRating).toBe(rating)
    });

    afterAll(async () => 
    {
        await db.close();
    });
});


/**
 * Help function for getNearby tests.
 * Checks the length of the result, and what it contains
 * @async
 * @param {[Request]} result the db-query result
 * @param {[Request]} requests array of the requests you are working with in the test
 * @param {Number} maxRequests the maxRequests arg used in the db-query
 * @param {[String]} shouldFind array of the body field of the requests that the query should have found
 * @param {[String]} shouldNotFind array of the body field of the requests that the query should not have found
 */
function checkResultGetNearby(result, requests, maxRequests, shouldFind, shouldNotFind) 
{
    if (maxRequests === undefined)
    {
        expect(result).toHaveLength(shouldFind.length);
    } else 
    {
        expect(result).toHaveLength(maxRequests);
    }
    
    let expected    = requests.filter(elem => shouldFind.includes(elem.body));
    let notExpected = requests.filter(elem => shouldNotFind.includes(elem.body));
    
    //ensure function was called with proper "shouldFind" and "shouldNotFind" args
    expect(expected.length + notExpected.length).toBe(requests.length); 


    for (let i = 0; i < expected.length; i++)
    {
        expect(result).toContainEqual(expected[i]);
    }

    for (let i = 0; i < notExpected.length; i++)
    {
        expect(result).not.toContainEqual(notExpected[i]);
    }
}

/** 
 * Get a geoJSON representation of a point
 * @param {[Number]} coordinates [longitude, latitude] coordinates of a point
 * @returns {{*}} representation of a point with coordinates
 */
function coordsToGeoJSON(coordinates)
{
    return { "type": "Point", "coordinates": coordinates };
}
