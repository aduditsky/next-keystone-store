import Form from './styles/Form'
import useForm from '../lib/useForm'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { CURRENT_USER_QUERY } from './User'
import Error from './ErrorMessage'

const SIGN_UP_MUTATION = gql`
mutation SIGN_UP_MUTATION($email: String!, $name: String!, $password: String!){
    createUser(data: {
        email: $email,
        name: $name,
        passowrd: $password
    }){
        id
        email
        name
    }
}

`

const SignUp = () => {
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
        name: '',
        password: '',

    })
    const [signup, {data, loading, error}] = useMutation(SIGN_UP_MUTATION, {
        variables: inputs,
        // refetchQueries: [{query: CURRENT_USER_QUERY}]
    })
    async function handleSubmit(e){
        e.preventDefault()
        // Send the email and password to the
        const res = await signup().catch(console.error) 
        console.log(res)
        console.log({data, loading, error});
        resetForm()
    }

    return (
        <Form method='post' onSubmit={handleSubmit}>
            <h2>Создать новый</h2>
            <Error error={error} />
            <fieldset>
                {data?.createUser && <p>Войдете пользователем {data.createUser.email}</p>}
                <label htmlFor='email'>
                    Имя
                    <input type='text' name='name' placeholder='Ваше Имя' autoComplete='name' value={inputs.name} onChange={handleChange}/>
                </label>
                <label htmlFor='email'>
                    Email
                    <input type='email' name='email' placeholder='Ваш E-mail' autoComplete='email' value={inputs.email} onChange={handleChange}/>
                </label>
                <label htmlFor='password'>
                    Пароль
                    <input type='password' name='password' placeholder='Пароль' autoComplete='password' value={inputs.password} onChange={handleChange} />
                </label>
                <button type='submit'>Войти</button>
            </fieldset>
        </Form>
    )
}

export default SignUp
