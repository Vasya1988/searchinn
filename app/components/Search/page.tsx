'use client'
import Styles from './Search.module.sass';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { MyContextProvider, MyContext } from '../../context/Context'

const Search = () => {

    const { name, setName, setInfo } = useContext(MyContext)

    const getApiInfo = async (props?: string) => {

        const url = 'http://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party';
        const token = '945042a7822c0a45fe52fe8ee1cbc191cfca281f';
        let query = props || '7721705169'; // 7721705169, 7707083893

        const options = {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + token
            },
            body: JSON.stringify({ query: query })
        }

        fetch(url, options)
            .then(response => response.json())
            .then(result => { setInfo(result.suggestions[0]), console.log(result.suggestions[0]) })
            .catch(error => console.log('error --> ', error))
    };

    return (
        <form
            className={Styles.Form}
        >
            <input onChange={(event) => { setName(event.target.value) }} data-search='search' type='text' />
            <Link href={`/info/${name}`} onClick={(event) => { console.log(name), getApiInfo(name) }} type="button">Search</Link>
        </form>
    )
};

export default Search;