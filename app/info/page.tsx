'use client'
import { ReactNode } from "react"

interface PageProps {
    children: ReactNode
}
const InnName = ({children}: PageProps) => {
    return (
        <>
            {children}
        </>
    )
}
export default InnName;