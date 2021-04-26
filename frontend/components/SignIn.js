import Form from './styles/Form'
import useForm from '../lib/useForm'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { CURRENT_USER_QUERY } from './User'
import Error from './ErrorMessage'

const SIGNIN_MUTATION = gql`
mutation SIGNIN_MUTATION($email: String!, $password: String!){
    authenticateUserWithPassword(email: $email, password: $password){
        ... on UserAuthenticationWithPasswordSuccess{
            item{
                id
                email
                name
            }
        }
        ... on UserAuthenticationWithPasswordFailure{
            code
            message
        }
    }
}
`

const SignIn = () => {
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
        password: '',    
    })
    const [signin, {data, loading}] = useMutation(SIGNIN_MUTATION, {
        variables: inputs,
        refetchQueries: [{query: CURRENT_USER_QUERY}]
    })
    async function handleSubmit(e){
        e.preventDefault()
        // Send the email and password to the
        const res = await signin() 
        // console.log(res)
        resetForm()
    }
    const error = data?.authenticateUserWithPassword?.__typename === 'UserAuthenticationWithPasswordFailure' ? data?.authenticateUserWithPassword : undefined
    return (
        <Form method='post' onSubmit={handleSubmit}>
            <h2>Войдите в ваш аккаунт</h2>
            <Error error={error} />
            <fieldset>
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

export default SignIn
