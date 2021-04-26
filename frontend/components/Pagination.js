import React from 'react'
import Head from 'next/head'
import PaginationStyles from './styles/PaginationStyles'
import Link from 'next/link'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import DisplayError from './ErrorMessage'
import {perPage} from '../config'

export const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY{
	    _allProductsMeta{
            count
        }
}
`

const Pagination = ({page}) => {  
    const {error, loading, data} = useQuery(PAGINATION_QUERY)
    if(loading) return null
    if(error) return <DisplayError error={error}/>
    const { count } = data._allProductsMeta
    const pageCount = Math.ceil(count / perPage)
    return (
        <PaginationStyles>
            <Head>
                <title>NargoreShop - Страница {page}</title>
            </Head>
            <Link href={`/products/${page - 1}`} >
                <a aria-disabled={page <= 1}>‹ Назад</a>
            </Link>
            <p>Страница {page} из {pageCount}</p>
            <p>Всего товаров {count}</p>
            <Link href={`/products/${page + 1}`}>
                <a aria-disabled={ page >= pageCount }>Вперед ›</a>
            </Link>
        </PaginationStyles>
    )
}

export default Pagination
