import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = 
{

    /**
     * create new account
     * @param {json} credentials - A object of the users credentials.
     * @param {json} credentials - A object of the users credentials.
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
     * create new account
     * @param {json} credentials - A object of the users credentials.
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
     * create new account
     * @param {json} credentials - A object of the users credentials.
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
     * create new account
     * @param {json} credentials - A object of the users credentials.
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
     * create new account
     * @param {json} credentials - A object of the users credentials.
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