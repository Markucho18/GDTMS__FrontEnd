import { createContext} from "react";

export const ModalContext = createContext();

export function ModalContextProvider({children}){

    return (
        <ModalContext.Provider value={"Hola"}>
            {children}
        </ModalContext.Provider>
    )
}