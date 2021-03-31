/**
 * Initialize server connection
 */
const server =
{
    url: "local/2020",
    protocal: "local/2020",
   /** url and other data about server */
};

/**
 * Interface for communicating wiht the server
 */
export const serviceRequest =
{
    /** TODO create a request? */

    /**
     * TODO
     */
    finnishRequest: function()
    {

    },

    provider:
    {
        /**
         * TODO
         */
        getNearRequests: function()
        {

        },

        /**
         * TODO
         */
        selectRequest: function()
        {

        }
    },

    requester:
    {
        /**
         * Create a new request
         * @param {string} user - The user id for the user who want to create the request
         * @param {string} type - The type of requst. ex: "food", "package"
         * @param {json} data - A object of the request. Needs to match the structure of database request
         */
        newRequest: function(user, type, data)
        {
            console.log(user + type + data);
            fetch(server.url, {
                method: 'POST',
                body: {
                    name: 'User 1' // TODO: write spesific date for the request to be interpeded by server
                }
            }).then(res => {
                return res.json(); // TODO: do somthing with response
            })
              .then(data => console.log(data)) // TODO: handle the data
              .catch(error => console.log('ERROR')); // TODO: handle error
        },

        /**
         * Get the users request
         * @param {string} user - The user id of the users requests
         * @param {int} num - The number of how many requests to return starting from most reasont
         */
        getMyRequest: function(user, num)
        {
            console.log(user + num);
            fetch(server.url, {
                method: 'GET',
                body: {
                    name: 'User 1' // TODO: write spesific date for the request to be interpeded by server
                }
            }).then(res => {
                return res.json(); // TODO: do somthing with response
            })
              .then(data => console.log(data)) // TODO: handle the data
              .catch(error => console.log('ERROR')); // TODO: handle error
        },

        /**
         * TODO
         */
        removeRequest: function()
        {

        },

        /**
         * TODO
         */
        reviewProvider: function()
        {

        },

        /**
         * TODO
         */
        acceptProvider: function()
        {

        }
    }
};

/**
 * Managing messaging between service provider and service requester
 */
export const chat =
{
    /**
     * TODO
     */
    sendMessage: function()
    {

    },

    /**
     * TODO
     */
    getAllMessages: function()
    {

    },

    /**
     * TODO
     */
    newChat: function()
    {

    },

    /**
     * TODO
     */
    removeChat: function()
    {

    }
};

/**
 * Managing user account both for service provider and service requester
 *
 */
export const account =
{
     /**
     * TODO
     */
    createAccount: function()
    {

    },   

     /**
     * TODO
     */
    removeAccount: function()
    {

    }, 

    /**
     * TODO
     */
    changeCredentials: function()
    {

    } 
};
