import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import styled from 'styled-components'
import RequestReset from "../components/RequestReset";

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 2rem;
    margin-bottom: 2rem;
`;

export default function LoginPage() {
    return(
        <>
            <p>Я страница входа и регистрации</p>
            <Grid>
                <SignIn />
                <SignUp />
            </Grid>
            <RequestReset />
        </>
    )
}