import React, { createContext, useReducer} from 'react';

export const AppContext = createContext();

/*
const GlobalContext = (props) => {
    const [state, dispatch] = useReducer(
        (prevState, action) => {
        switch (action.type) {
                case "restoreUserId":
                return {
                    ...prevState,
                    userID: action.id,
                    loading: false,
                };
                case "signIn":
                return {
                    ...prevState,
                    signOut: false,
                    userID: action.id,
                };
                case "signOut":
                return {
                    ...prevState,
                    signOut: true,
                    userID: null,
                };
            }
        },
        {
            loading: true,
            signOut: false,
            userID: null,
        }
    );

    const authContext = React.useMemo(
        () => ({
            signIn: async (id) => {
                dispatch({ type: "signIn", id: id });
            },
            signOut: () => dispatch({ type: "signOut" }),
            loggedIn: () => state.userID !== null,
        }),[]
    );

    return (
        <AuthContext.Provider value={authContext}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default GlobalContext;
*/