import useForm from '../lib/useForm'
import Form from './styles/Form'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import DisplayError from './ErrorMessage'
import { ALL_PRODUCTS_QUERY } from './Products'
import Router from 'next/router'

const CREATE_PRODUCT_MUTATION = gql`
    mutation CREATE_PRODUCT_MUTATION(
        # Какие переменные мы получаем и какой тип у них
        $name: String!
        $description: String!
        $price: Int!
        $image: Upload
    ){
        createProduct(
            data: {
                name: $name,
                description: $description,
                price: $price
                status: "DRAFT"
                photo: {
                    create: {
                        image: $image
                        altText: $name
                    }
                }
        }){
            id
            price
            description
            name
        }
    }
`

export default function CreateProduct() {
    const { inputs, handleChange, clearForm, resetForm } = useForm({
        image: '',
        name: 'Товар',
        price: 231,
        description: 'Описание'
    })

    const [createProduct, {data, error, loading}] = useMutation(CREATE_PRODUCT_MUTATION, 
        {
            variables: inputs,
            refetchQueries: [{query: ALL_PRODUCTS_QUERY}]
        }
    )

    return (
        <Form onSubmit={ async (e) => {
            e.preventDefault()
            const res = await createProduct()
            clearForm()
            //Go to that product's page
            Router.push({
                pathname: `/product/${res.data.createProduct.id}`,
            })

        }}>
            <DisplayError error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor='image'>
                    Изображение
                    <input type='file' id='image' name='image' onChange={handleChange}/>
                </label>
                <label htmlFor='name'>
                    Название
                    <input type='text' id='name' name='name' placeholder='Имя' value={inputs.name} onChange={handleChange}/>
                </label>
                <label htmlFor='price'>
                    Цена
                    <input type='number' id='price' name='price' placeholder='Цена' value={inputs.price} onChange={handleChange}/>
                </label>
                <label htmlFor='description'>
                    Описание
                    <textarea type='number' id='description' name='description' placeholder='Базовое описание' value={inputs.description} onChange={handleChange} />
                </label>

                <button type='button' onClick={clearForm}>Очистить</button>
                <button type='button' onClick={resetForm}>Вернуть</button>

                <button type='submit'> Добавить товар </button>
            </fieldset>
        </Form>
    )
}
