import { createContext, useReducer, useContext, useEffect } from "react";

// Step 4: set preferences

// create context
const PreferencesContext = createContext();

// create reducer function
const preferencesReducer = (state, action) => {
    switch (action.type) {
        // toggling preference
        case "TOGGLE_PREFERENCE":
            return {
                ...state,
                [action.tag]: !state[action.tag],
            }
        // initializing preferences to default
        case "SET_PREFERENCES":
            return {
                ...state,
                ...action.preferences,
            }
        // default case
        default:
            return state;
    }
};

export const PreferencesProvider = ({ children }) => {
    // initialize state using useReducer
    const [preferences, dispatch] = useReducer(preferencesReducer, {});

    // fetch data from API
    useEffect(() => {
        fetch("https://cs571.org/api/f23/hw8/articles", {
            headers: {
                "X-CS571-ID": "bid_c6d49d6dc0151ad7874971c6ccdddad3913bad5b559fbc6a649bed932a5d0d5a"
            }
        })
            .then(res => res.json())
            .then(data => {
                // extract unique tags from fetched data
                const uniqueTags = new Set()
                data.forEach((item) => {
                    item.tags.forEach((tag) => {
                        uniqueTags.add(tag)
                    })
                })
                const uniqueTagsArray = Array.from(uniqueTags)

                // set all tags to true initially
                const initialPreferences = uniqueTagsArray.reduce(
                    (acc, tag) => ({ ...acc, [tag]: true }),
                    {}
                )
                dispatch({ type: "SET_PREFERENCES", preferences: initialPreferences })
            })
            .catch(error => {
                console.error("Error fetching data:", error)
            })
    }, []);

    // toggle preference function
    const togglePreference = (tag) => {
        dispatch({ type: "TOGGLE_PREFERENCE", tag })
    };

    // context value for children components
    const contextValue = {
        preferences,
        togglePreference,
    };

    return (
        <PreferencesContext.Provider value={contextValue}>
            {children}
        </PreferencesContext.Provider>
    )
};

// custom hook to access the context
export const usePreferences = () => {
    return useContext(PreferencesContext)
};

// export so BadgerNewsScreen can access
export default PreferencesContext;