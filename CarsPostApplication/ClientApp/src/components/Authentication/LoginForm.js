import { useState } from "react"
import { Redirect } from 'react-router-dom';

function LoginForm(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false);

    const submit = async (event) => {
        event.preventDefault();
    };

    async function loginUser() {
        const credentials = {
            email: email,
            password: password
        }
        const response = await fetch(`https://localhost:44328/api/account/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials)
        })
        const data = await response.json();
        if (response.ok === true) {
            console.log(data)
            setRedirect(true)
            props.setName(data.name)
        } else {
            console.log(response.status, response.errorText)
        }
    }
    if (redirect) {
        return <Redirect to="/" />
    }
    return (
        <main className="form-signin">
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal" style={{ fontFamily: "sans-serif", textAlign: "center" }}>Welcome back!</h1>
                <div>
                    <input type="text" className="form-control mb-2" placeholder="Email..." value={email} onChange={event => setEmail(event.target.value)} />
                </div>
                <div>
                    <input type="text" className="form-control mb-2" placeholder="Password..." value={password} onChange={event => setPassword(event.target.value)} />
                </div>
                <div>
                    <button className="w-100 btn btn-lg btn-primary" onClick={loginUser}>Sign in</button>
                </div>
            </form>
        </main>
        )
}

export default LoginForm