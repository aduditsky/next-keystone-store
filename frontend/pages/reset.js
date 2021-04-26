import RequestReset from "../components/RequestReset";
import Reset from "../components/Reset";

export default function ResetPage({ query }){
    if(!query.token ) {
        return <div>
            <p>Вы не восставливаете пароль, к счастью :'(</p>
            <span>Но вот форма, если это вам надо.....</span>
            <RequestReset />
        </div>
    }
    return <div>
        <p>Восстановить пароль {query.token}: </p>
        <Reset token={query.token} />
    </div>
}