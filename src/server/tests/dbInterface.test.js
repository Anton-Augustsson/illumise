
const { DBInterface } = require("../db/dbInterface");

describe("Testing dbInterface", () =>
{
    let url = "mongodb+srv://admin:123@cluster0.j0bss.mongodb.net/main?retryWrites=true&w=majority";
    let db = new DBInterface(undefined, undefined, url, true);
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
        let user1ID    = await db.accounts.add("A7", "A7", "A7@mail.test", "*");
        let user2ID    = await db.accounts.add("A8", "A8", "A8@mail.test", "*");
        let request1ID = await db.requests.add(user1ID, "T5", "this is a test");
        let request2ID = await db.requests.add(user1ID, "T6", "this is a test");

        let result1    = await db.requests.setProvider(request1ID, user2ID);
        let result2    = await db.requests.setProvider(request2ID, user2ID);
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
        let userID    = await db.accounts.add("A9", "A9", "A9@mail.test", "*");
        let requestID = await db.requests.add(userID, "T7", "this is a test");
        let result    = await db.requests.setCompleted(requestID);
        expect(result).toBe(true);
    });

    it("Create & Remove Chat", async () => 
    {
        // Add
        let user1ID   = await db.accounts.add("A10", "A10", "A10@mail", "*");
        let user2ID   = await db.accounts.add("A11", "A11", "A11@mail", "*");
        let requestID = await db.requests.add(user1ID, "T8", "this is a test");
        let chatID    = await db.chat.add(requestID, [user1ID, user2ID]);
        expect(chatID).not.toBe(null);
        // Remove
        let result    = await db.chat.remove(chatID);
        expect(result).toBe(true);
    });

    it("Add & Get Messages", async () => 
    {
        // Add
        let user1ID   = await db.accounts.add("A12", "A12", "A12@mail", "*");
        let user2ID   = await db.accounts.add("A13", "A13", "A13@mail", "*");
        let requestID = await db.requests.add(user1ID, "T9", "this is a test");
        let chatID    = await db.chat.add(requestID, [user1ID, user2ID]);
        
        let message   = "msg1";
        let result    = await db.chat.addMessage(chatID, user1ID, message);
        expect(result).toBe(true);

        let messages  = await db.chat.getMessages(chatID);
        expect(messages[user1ID].length).toBe(1);
        expect(messages[user2ID].length).toBe(0);
        expect(messages[user1ID][0].message).toBe(message);
    });

    it("Get messages After", async () => 
    {
        let user1ID   = await db.accounts.add("A14", "A14", "A14@mail", "*");
        let user2ID   = await db.accounts.add("A15", "A15", "A15@mail", "*");
        let requestID = await db.requests.add(user1ID, "T10", "this is a test");
        let chatID    = await db.chat.add(requestID, [user1ID, user2ID]);
        
        let time1 = Date.now();
        let message = "msg2";
        await db.chat.addMessage(chatID, user1ID, message);
        
        let result1 = await db.chat.getMessagesAfter(chatID, time1);
        expect(result1[user1ID].length).toBe(1);
        expect(result1[user2ID].length).toBe(0);
        expect(result1[user1ID][0].message).toBe(message);

        let result2 = await db.chat.getMessagesAfter(chatID, Date.now());
        console.log(result2);
        expect(result2[user1ID].length).toBe(0);
    });

    afterAll(async () => 
    {
        await db.close();
    });
});