import { useMutation, useQuery } from "@apollo/client"
import gql from "graphql-tag"
import useForm from "../lib/useForm"
import DisplayError from "./ErrorMessage"
import Form from "./styles/Form"

// GET
const SINGLE_PRODUCT_QUERY = gql`
    query SINGLE_PRODUCT_QUERY($id: ID!){
        Product(where: {id: $id}){
            id
            name
            description
            price
        }
    }
`
// PUT
const UPDATE_PRODUCT_MUTATION = gql`
    mutation UPDATE_PRODUCT_MUTATION(
        $id: ID!
        $name: String
        $description: String
        $price: Int
    ){
        updateProduct(
            id: $id,
            data: {
                name: $name,
                description: $description,
                price: $price,
            }
        ){
            id
            name
            description
            price
        }
    }
`

export default function UpdateProduct({id}) {
    // 1. Получить сущевствующий товар
    const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
        variables: {id},
    })

    // 2. Получить зависимость для обновления товара
    const [updateProduct, {data: updateData, error: updateError, loading: updateLoading}] = useMutation(UPDATE_PRODUCT_MUTATION)
    // 2.5 Создать импорт useForm
    const { inputs, handleChange, clearForm, resetForm } = useForm(data?.Product)
    // 3. Нужно форму, что отслеживает обновления товара
    if (loading) return <p>Загружаю...</p>
    return (
        <Form onSubmit={ async (e) => {
            e.preventDefault()
            const res = await updateProduct({
                variables: {
                    id,
                    name: inputs.name,
                    description: inputs.description,
                    price: inputs.price,
                }
            }).catch(error)
            console.log(res);
            // TODO: Handle Submit


            // const res = await createProduct()
            // clearForm()
            // //Go to that product's page
            // Router.push({
            //     pathname: `/product/${res.data.createProduct.id}`,
            // })

        }}>
            <DisplayError error={error || updateError} />
            <fieldset disabled={updateLoading} aria-busy={updateLoading}>
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

                {/* <button type='button' onClick={clearForm}>Очистить</button>
                <button type='button' onClick={resetForm}>Вернуть</button> */}

                <button type='submit'>Изменить товар</button>
            </fieldset>
        </Form>
    )
}