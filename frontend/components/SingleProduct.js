import { gql, useQuery } from "@apollo/client"
import DisplayError from "./ErrorMessage"
import Head from 'next/head'
import styled from "styled-components"

const SINGLE_ITEM_QUERY = gql`
query SINGLE_ITEM_QUERY($id: ID!){
  Product(where:{
    id: $id
  }) {
    name
    price
    description
    id
    photo {
        image {
            publicUrlTransformed
        }
    }
  }
}
`

const ProductStyles = styled.div`
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    max-width: var(--maxWidth);
    align-items:top;
    justify-content: center;
    grid-gap: 15px;
    img{
        width: 100%;
        object-fit: contain
    }
`

export default function SingleProduct({id}) {
    const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
        variables: {
            id
        }
    })
    if(loading) return <p>Загружаю...</p>
    if(error) return <DisplayError error={error} />

    const { Product: item } = data
    return (
    <ProductStyles>
        <Head>
            <title>Nargore Shop | {item.name}</title>
        </Head>
        <img src={item.photo.image.publicUrlTransformed} alt={item.name} />
        <div className='details'>
            <h2>{item.name}</h2>
            <p>{item.description}</p>    
        </div>    
    </ProductStyles>
    )
}

    