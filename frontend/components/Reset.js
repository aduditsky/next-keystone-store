import Form from './styles/Form'
import useForm from '../lib/useForm'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { CURRENT_USER_QUERY } from './User'
import Error from './ErrorMessage'

const RESET_MUTATION = gql`
mutation RESET_MUTATION($email: String!, $password: String!, $token: String!){
    redeemUserPasswordResetToken(email: $email, token: $token, password: $password){
        code
        message
    }
}

`

const Reset = ({token}) => {
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
        password: '',
        token,
    })
    const [reset, {data, loading, error}] = useMutation(RESET_MUTATION, {
        variables: inputs,
    })
    async function handleSubmit(e){
        e.preventDefault()
        // Send the email and password to the
        const res = await reset().catch(console.error) 
        console.log(res)
        console.log({data, loading, error});
        resetForm()
    }
    const successfulError = data?.redeemUserPasswordResetToken === null ? data?.redeemUserPasswordResetToken?.code : undefined
    return (
        <Form method='post' onSubmit={handleSubmit}>
            <h2>Создать новый</h2>
            <Error error={successfulError || error} />
            <fieldset>
                {data?.redeemUserPasswordResetToken === null && <p>Успешно! Можете войти сейчас под новым паролем</p>}
                <label htmlFor='email'>
                    Email
                    <input type='email' name='email' placeholder='Ваш E-mail' autoComplete='email' value={inputs.email} onChange={handleChange}/>
                </label>
                <label htmlFor='password'>
                    Пароль
                    <input type='password' name='password' placeholder='Пароль' autoComplete='password' value={inputs.password} onChange={handleChange} />
                </label>
                <button type='submit'>Восстановить пароль</button>
            </fieldset>
        </Form>
    )
}

export default Reset
