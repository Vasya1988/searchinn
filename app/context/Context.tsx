'use client'
import { ReactNode, createContext, useState } from "react";

interface ContextType {
    name: string,
    setName: React.Dispatch<React.SetStateAction<string>>,
    info: {
        data: {
            management: {
                name: string,
                post: string
            },
            address: {
                value: string
            }
        }, 
        value: string
    },
    setInfo: React.Dispatch<React.SetStateAction<object>>

}
const MyContext = createContext<ContextType>({
    name: '',
    setName: () => {},
    info: {
        data: {
            management: {
                name: '',
                post: ''
            },
            address: {
                value: ''
            }
        }, 
        value: ''
    },
    setInfo: () => {}
})

const MyContextProvider = ({children}: {children: ReactNode}) => {

    const [name, setName] = useState('');
    const [info, setInfo] = useState(Object)

    return (
        <MyContext.Provider
            value={{name, setName, info, setInfo}}
        >
            {children}
        </MyContext.Provider>
    )
}

export {MyContext, MyContextProvider}