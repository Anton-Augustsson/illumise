import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = 
{

    /**
     * Store a string in local storage
     * @param {String} key - The key to get the data back
     * @param {String} value - The value to store
     */
    storeDataString: async (key,value) => {
        try {
            await AsyncStorage.setItem(key, value)
        } catch (e) {
            // saving error
            console.log(e);
        }
    },

    
    /**
     * Store a object in local storage
     * @param {String} key - The key to get the data back
     * @param {json} value - The object to store
     */
    storeDataObject: async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(key, jsonValue)
        } catch (e) {
            // saving error
            console.log(e);
        }
    },

    
    /**
     * Get string from local storage 
     * @param {String} key - The key to get the data 
     * @returns {Promise<?String>} The data that is stored 
     */
    getDataString: async (key) => {
        try {
            const value = await AsyncStorage.getItem(key)
            return value;
        } catch(e) {
            // error reading value
            console.log("GET FUCKING DATA STRING");
            console.log(e);
        }
    },
  
    /**
     * Get object from local storage 
     * @param {String} key - The key to get the data 
     * @returns {Promise<?json>} The data that is stored 
     */
    getDataObject: async (key) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key)
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
            // error reading value
            console.log(e);
        }
    },
  
    /**
     * Remove data from local storage 
     * @param {String} key - The key to remove the data 
     */
    removeValue: async (key) => {
        try {
            await AsyncStorage.removeItem(key)
        } catch(e) {
            // remove error
            console.log(e);
        }
    }
}

export default storage;