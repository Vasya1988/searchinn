'use client'
import Styles from './Search.module.sass';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { MyContext } from '../../context/Context'
import { useRouter } from 'next/navigation';
import Errorpage from '@/app/errorpage/page';

const Search = () => {

    // Получаем хуки из контекста
    const { name, setName, setInfo, info } = useContext(MyContext);

    const [checkError, setCheckError] = useState(false)

    // useRouter для выбора направлениястраницы, если ошибка в запросе api
    // тогда переходим на страницу ошибки
    const router = useRouter();

    // функция запроса к api
    const getApiInfo = async (props?: string) => {

        const url = 'http://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party';
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

    // Функция для события клик, для перехода на страницу с результатом или страницу ошибки
    const HandleClick = async (event?: React.MouseEvent<HTMLAnchorElement>) => {

        event?.preventDefault();

        const response = await getApiInfo(name);

        // Делаем выбор страницы, с результатом или с ошибкой
        if (response.suggestions.length !== 0) {
            checkError && setCheckError(false)
            router.push(`/info/${name}`);
        } else {
            setCheckError(true)
        }
    };

    const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.code === 'Enter' && (event.preventDefault(), HandleClick())
        
    }

    return (
        <>
            <form
                className={Styles.Form}
            >
                <input
                    onChange={(event) => { setName(event.target.value) }}
                    data-search='search'
                    type='text'
                    onKeyDown={handleKeyDown}
                />
                <Link href={`/`} onClick={HandleClick} type="button">Search</Link>
            </form>

            {
                checkError && <Errorpage />
            }
        </>
        
    )
};

export default Search;