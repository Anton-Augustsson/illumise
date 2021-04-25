/**
 * helper functions for communication
 */
const communication =
{
    url: 'http://localhost:3000',
    returnResponse: async function(response)
    {
        if (response.ok) {
            return await response.json();
        }
        else {
            return null;
        }
    },

};

export default communication;
