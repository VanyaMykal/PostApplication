import { useState } from "react"
import { Link, Redirect } from "react-router-dom"
function RegisterForm(props) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConformPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const submit = async (event) => {
        event.preventDefault()
    }
    async function registerUser() {
        let newUser = {
            userName: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }
        let response = await fetch(`https://localhost:44328/api/account/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser)
        })
        let data = await response.json()
        console.log(data)
        if (response.ok === true) {
            console.log(data)
            setRedirect(true)
            props.setName(data.user.userName)
        }
        else {
            console.log(response.status, response.errorText)
        }
    }
    if (redirect) {
        return <Redirect to="/"/>
    }
    return (
        <main className="form-signin">
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal" style={{ fontFamily: "sans-serif", textAlign: "center" }}>Join Medium</h1>
                <div>
                    <input type="text" className="form-control mb-2" placeholder="Name..." value={name} onChange={(event) => setName(event.target.value)} />
                </div>
                <div>
                    <input type="text" className="form-control mb-2" placeholder="Email..." value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div>
                    <input type="text" className="form-control mb-2" placeholder="Password..." value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>
                <div>
                    <input type="text" className="form-control mb-2" placeholder="Confirm password..." value={confirmPassword} onChange={(event) => setConformPassword(event.target.value)} />
                </div>
                <div>
                    <button className="w-100 btn btn-lg btn-primary" onClick={registerUser}>Sign up</button>
                </div>
            </form>
            <hr></hr>
            <div className="mt-3 text-center">Already have an account?
                <div>
                    <Link to="/login">
                        <button type="button" className="btn btn-success mt-2">Sign in</button>
                    </Link>
                </div>
            </div>
        </main>
        )
}

export default RegisterForm