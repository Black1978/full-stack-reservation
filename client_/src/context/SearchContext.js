import { createContext, useReducer } from 'react'

const INITIAL_STATE = {
    city: undefined,
    dates: [],
    options: { children: undefined, adult: undefined, room: undefined },
}

export const SearchContext = createContext(INITIAL_STATE)

const contextReducer = (state, action) => {
    switch (action.type) {
        case 'NEW_SEARCH':
            return action.payload
        case 'RESET_SEARCH':
            return INITIAL_STATE
        default:
            return state
    }
}

export const SearchContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(contextReducer, INITIAL_STATE)
    return (
        <SearchContext.Provider
            value={{ city: state.city, dates: state.dates, options: state.options, dispatch }}
        >
            {children}
        </SearchContext.Provider>
    )
}
