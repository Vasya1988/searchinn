'use client'
import { ReactNode, createContext, useState } from "react";

interface ContextType {
    name: string,
    setName: React.Dispatch<React.SetStateAction<string>>,
    info: {},
    setInfo: React.Dispatch<React.SetStateAction<string>>

}
const MyContext = createContext<ContextType>({
    name: '',
    setName: () => {},
    info: {},
    setInfo: () => {}
})

const MyContextProvider = ({children}: {children: ReactNode}) => {

    const [name, setName] = useState('');
    const [info, setInfo] = useState({})

    return (
        <MyContext.Provider
            value={{name, setName, info, setInfo}}
        >
            {children}
        </MyContext.Provider>
    )
}

export {MyContext, MyContextProvider}