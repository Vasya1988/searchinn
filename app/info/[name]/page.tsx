'use client'
import { MyContext } from "../../context/Context";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "../../components/modal/modal";


const Info = () => {

    const {info, setInfo} = useContext(MyContext);
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const currentHash = window.location.href.split('/')
    const splitHash = currentHash[currentHash.length - 1]

    console.log(splitHash)
    // функция запроса к api
    const getApiInfo = async (props?: string) => {

        const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party';
        const token = '945042a7822c0a45fe52fe8ee1cbc191cfca281f';
        let query = props || '7721705169'; // 7721705169, 7707083893

        const options: RequestInit = {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + token
            },
            body: JSON.stringify({ query: query })
        }

        const response = await fetch(url, options);

        const result = await response.json()

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        
        // Обновляем состояние Info
        setInfo(result.suggestions[0]);

        return result
    };
    // Проверка, если info не корректное, вернемся на главную страницу
    useEffect(() => {
        if(info === undefined || Object.keys(info).length === 0) {
            // router.push('/')
            getApiInfo(splitHash)
        }
    }, [info])

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