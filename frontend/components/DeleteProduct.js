import { useMutation } from '@apollo/client';
import gql from 'graphql-tag'
import React from 'react'

const DELETE_PRODUCT_MUTATION = gql`
    mutation DELETE_PRODUCT_MUTATION($id: ID!){
        deleteProduct(id: $id){
            id
            name
        }
    }
`;

function update(cache, payload) {
    //console.log(payload)
    // console.log('Функция обновления кэша после удаления товара')
    cache.evict(cache.identify(payload.data.deleteProduct))
}

const DeleteProduct = ({id, children}) => {
    const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
        variables: {
            id
        },
        update
    })

    return (
        <button type='button' disabled={loading} onClick={() => {
            if( confirm('Точно нужно удалить?')) {
                console.log(`${id} удален`)
                deleteProduct(id).catch(err => alert(err.message))
            }
        }}>
            {children}
        </button>
    )
}

export default DeleteProduct
