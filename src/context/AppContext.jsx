/* eslint-disable react/prop-types */
import { createContext } from "react";
import { vet } from "../assets/assets";
export const AppContext = createContext()

const AppContextProvider = (props) => {

    const value = {
        vet
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider