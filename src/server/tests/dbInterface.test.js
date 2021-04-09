
const { DBInterface } = require("../db/dbInterface");

describe("Testing dbInterface", () =>
{
    let url = "mongodb+srv://admin:123@cluster0.j0bss.mongodb.net/main?retryWrites=true&w=majority";
    let db = new DBInterface(undefined, undefined, url);
    let connected;

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
        // Add
        const mail = "test@mail.test";
        let user1ID = await db.accounts.add("Test1", "Test1", mail, "*");
        let user2ID = await db.accounts.add("Test2", "Test2", mail, "*");
        expect(user1ID).not.toBe(null);
        expect(user2ID).toBe(null);
        // Remove
        let result1 = await db.accounts.remove(user1ID);
        let result2 = await db.accounts.remove(user2ID);
        expect(result1).toBe(true);
        expect(result2).toBe(false);
    });

    it("Modify Account", async () => 
    {
        let userID = await db.accounts.add("A1", "A1", "A1@mail.test", "*");
        let result = await db.accounts.update(userID, lastName = "Testing");
        expect(result).toBe(true);
    });

    it("Create & Remove Request", async () => 
    {
        // Add
        let userID    = await db.accounts.add("A2", "A2", "A2@mail.test", "*");
        let requestID = await db.requests.add(userID, "T1", "this is a test");
        expect(requestID).not.toBe(null);
        // Remove
        let result = await db.requests.remove(requestID);
        expect(result).toBe(true);
    });
    
    it("Set Request Provider", async () => 
    {
        let userID    = await db.accounts.add("A3", "A3", "A3@mail.test", "*");
        let user2ID   = await db.accounts.add("A4", "A4", "A4@mail.test", "*");
        let requestID = await db.requests.add(userID, "T2", "this is a test");
        let result    = await db.requests.setProvider(requestID, user2ID);
        expect(result).toBe(true);
    });

    it("Get User Requests", async () => 
    {
        let userID    = await db.accounts.add("A5", "A5", "A5@mail.test", "*");
        let requestID = await db.requests.add(userID, "T3", "this is a test");
        await db.requests.add(userID, "T4", "this is a test");

        let requests = await db.requests.getUserRequests(userID);
        expect(requests.length).toBe(2);
        if (requests.length > 0)
        {
            expect(requests[0]["_id"]).toStrictEqual(requestID);
        }

        // Test with given size
        requests = await db.requests.getUserRequests(userID, 1);
        expect(requests.length).toBe(1);

        // Test with larger size
        requests = await db.requests.getUserRequests(userID, 5);
        expect(requests.length).toBe(5);
    });

    it("Set Request Completed", async () => 
    {
        let userID    = await db.accounts.add("A6", "A6", "A6@mail.test", "*");
        let requestID = await db.requests.add(userID, "T4", "this is a test");
        let result    = await db.requests.setCompleted(requestID);
        expect(result).toBe(true);
    });


    //Requests.getNearby() test
    it("Get nearby requests - getNearby()", async () => 
    {
        // define points
        let pointStart = coordsToGeoJSON([17.638825          , 59.854004]);
        let point250m  = coordsToGeoJSON([17.63557416149649  , 59.85551799680195]);
        let point360m  = coordsToGeoJSON([17.634050666730886 , 59.856218407454094]);
        let point1200m = coordsToGeoJSON([17.6595067923536   , 59.856922145172355]);
        let point2000m = coordsToGeoJSON([17.67298542106755  , 59.85936848021486]);

        // Add user and requests
        let userID = await db.accounts.add("Sven", "Svensson", "mail@mail.mail", "password123");

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
            360m entry should not be returned due to maxRequests
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



    afterAll(async () => 
    {
        db.clear();
        await db.close();
    });
});


/**
 * Help function for getNearby tests.
 * Checks the length of the result, and what it contains
 * //TODO arg types? 
 * @async
 * @param result the db-query result
 * @param requests array of the requests you are working with in the test
 * @param {number} maxRequests the maxRequests arg used in the db-query
 * @param {[string]} shouldFind array of the body field of the requests that the query should have found
 * @param {[string]} shouldNotFind array of the body field of the requests that the query should not have found
 */
function checkResultGetNearby(result, requests, maxRequests, shouldFind, shouldNotFind) 
{
    if (maxRequests === undefined) {
        expect(result).toHaveLength(shouldFind.length);
    } else {
        expect(result).toHaveLength(maxRequests);
    }
    
    expected = requests.filter(elem => shouldFind.includes(elem.body));
    notExpected = requests.filter(elem => shouldNotFind.includes(elem.body));
    
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
 * @param {[number]} coordinates [longitude, latitude] coordinates of a point
 * @returns geoJSON representation of a point with coordinates
 */
function coordsToGeoJSON(coordinates)
{
    return { "type": "Point", "coordinates": coordinates };
}