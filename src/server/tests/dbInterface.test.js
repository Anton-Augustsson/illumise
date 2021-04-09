
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
        let userID1    = await db.accounts.add("A5", "A5", "A5@mail.test", "*");
        let userID2    = await db.accounts.add("A6", "A6", "A6@mail.test", "*");
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
        let userID1    = await db.accounts.add("A7", "A7", "A7@mail.test", "*");
        let userID2    = await db.accounts.add("A8", "A8", "A8@mail.test", "*");
        let requestID1 = await db.requests.add(userID1, "T5", "this is a test");
        let requestID2 = await db.requests.add(userID1, "T6", "this is a test");

        let result1    = await db.requests.setProvider(requestID1, userID2);
        let result2    = await db.requests.setProvider(requestID2, userID2);
        expect(result1).toBe(true);
        expect(result2).toBe(true);

        let providing = await db.requests.getUserProviding(userID1);
        expect(providing.length).toBe(0);
        providing = await db.requests.getUserProviding(userID2);
        expect(providing.length).toBe(2);
        if (providing.length == 2)
        {
            expect(providing[0]._id).toStrictEqual(requestID1);
            expect(providing[1]._id).toStrictEqual(requestID2);
        }

        // Test with larger size
        providing = await db.requests.getUserProviding(userID2, 5);
        expect(providing.length).toBe(5);
    });

    it("Set Request Completed", async () => 
    {
        let userID    = await db.accounts.add("A9", "A9", "A9@mail.test", "*");
        let requestID = await db.requests.add(userID, "T7", "this is a test");
        let result    = await db.requests.setCompleted(requestID);
        expect(result).toBe(true);
    });

    afterAll(async () => 
    {
        await db.close();
    });
});