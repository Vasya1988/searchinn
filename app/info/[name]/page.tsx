'use client'
import { MyContext } from "@/app/context/Context";
import { useContext } from "react";

const InnName = () => {
    const {info} = useContext(MyContext)
    console.log(info)
    return (
        <div
            
        >
            <h1>{info.value}</h1>
            <p>{`Основатель: ${info.data.management.name}`}</p>
            <p>{`Должность: ${info.data.management.post}`}</p>
            <a 
                target='_blank' 
                href={`https://yandex.ru/maps/?text=${info.data.address.value}`}
            >
                {`Адрес: ${info.data.address.value}`}</a>
        </div>
    )
}
export default InnName;