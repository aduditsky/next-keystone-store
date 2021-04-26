import Form from './styles/Form'
import useForm from '../lib/useForm'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { CURRENT_USER_QUERY } from './User'
import Error from './ErrorMessage'

const REQUEST_RESET_MUTATION = gql`
mutation REQUEST_RESET_MUTATION($email: String!){
    sendUserPasswordResetLink(email: $email){
        code
        message
    }
}

`

const RequestReset = () => {
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
    })
    const [signup, {data, loading, error}] = useMutation(REQUEST_RESET_MUTATION, {
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
                {data?.sendUserPasswordResetLink === null && <p>Успешно! Проверьте вашу почту.</p>}
                <label htmlFor='email'>
                    Email
                    <input type='email' name='email' placeholder='Ваш E-mail' autoComplete='email' value={inputs.email} onChange={handleChange}/>
                </label>
                <button type='submit'>Восстановить пароль</button>
            </fieldset>
        </Form>
    )
}

export default RequestReset
