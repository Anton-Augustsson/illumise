
const { DBInterface } = require("../db/dbInterface");

describe("Testing dbInterface", () =>
{
    let db = new DBInterface();
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

    afterAll(async () => 
    {
        await db.close();
    });
});