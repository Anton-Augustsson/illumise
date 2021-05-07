import React, { useEffect, useState } from "react";
import {AppContext} from "../AppContext";

const useUser = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const init = async () => {
            try {
                const userID = await storage.getDataString("userID"); 
                dispatch({type:"restoreID", id: userID});
            } catch(err) {
                console.log(err);
            }
        }
        init();
    });
    return user;
}

export default useUser;