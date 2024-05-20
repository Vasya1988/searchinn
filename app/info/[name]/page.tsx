'use client'
import { MyContext } from "@/app/context/Context";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/app/components/modal/Modal";

const Info = () => {

    const {info} = useContext(MyContext);
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Проверка, если info не корректное, вернемся на главную страницу
    useEffect(() => {
        if(info === undefined || Object.keys(info).length === 0) {
            router.push('/')
        }
    }, [info, router])

    // Открываем модальное окно
    const HandleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()
        setIsModalOpen(true)
    }

    // Функция для перехода на внешний сайт (яндекс карты)
    const handleConfirm = () => {
        window.location.href = `https://yandex.ru/maps/?text=${info.data.address.value}`;
    }

    // Отмена перехода
    const handleCancel = () => {
        setIsModalOpen(false)
    }

    // Проверк на корректное Info, если не корректное останавливаем рендер
    if (info === undefined || Object.keys(info).length === 0) {
        return null
    }

    return (
        <div
            
        >
            <h1>{info.value}</h1>
            <p>{`Основатель: ${info.data.management.name}`}</p>
            <p>{`Должность: ${info.data.management.post}`}</p>
            <a 
                onClick={HandleClick}
                target='_blank' 
                href={`https://yandex.ru/maps/?text=${info.data.address.value}`}
            >
                {`Адрес: ${info.data.address.value}`}
            </a>

            {
                isModalOpen && <Modal confirm={handleConfirm} cancel={handleCancel} />
            }

        </div>
    )
}
export default Info;