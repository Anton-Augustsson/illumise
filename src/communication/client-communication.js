/** Initialize server connection */

const server =
{
    server: "local/2020",
    protocal: "local/2020",
   /** url and other data about server */
};

const serviceRequest =
{
    provider: {},
    requester: {
        post: function(user, type, data){
            console.log(user + type + data);
        },
        get: function(user, num){
            console.log(user + num);
        }
    }
};
