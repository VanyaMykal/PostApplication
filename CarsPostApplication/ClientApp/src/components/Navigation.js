import {Link} from 'react-router-dom'
function Navigation(props) {
    let menu;
    console.log(props.userName)
    async function logout() {
        let response = await fetch("https://localhost:44328/api/account/Logout", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            credentials:'include'
        })
        let data = await response.json()
        console.log(data)
        props.setName(undefined)
    }
    if (props.userName === undefined) {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li>
                    <Link to="/login">
                        <button type="button" className="btn btn-outline-light me-2">Login</button>
                    </Link>
                </li>
                <li>
                    <Link to="/register">
                        <button type="button" className="btn btn-warning">Sign up</button>
                    </Link>
                </li>
            </ul>
        )
    }
    else {
        menu = (
            <div>
                <ul className="navbar-nav me-auto mb-2 mb-md-0">
                    {/*<li className="text-success">*/}
                    {/*    {props.userName}*/}
                    {/*    <Dropdown>*/}
                    {/*        <Dropdown.Toggle variant="success" id="dropdown-basic">*/}
                    {/*            {props.userName}*/}
                    {/*        </Dropdown.Toggle>*/}
                    {/*        <Dropdown.Menu>*/}
                    {/*            <Dropdown.Item href="/profile">Profile</Dropdown.Item>*/}
                    {/*        </Dropdown.Menu>*/}
                    {/*    </Dropdown>*/}
                    {/*</li>*/}
                    <li>
                        <div style={{ border: "solid 1px white", borderRadius: "5px", color: "#88e64e", marginTop: "6px", marginRight: "10px", padding: "3px" }}>{props.userName}</div>
                    </li>
                    <li className="nav-item">
                        <Link to="/" className="nav-link active" onClick={logout}>Logout</Link>
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="container-fluid">
                    <div className="d-flex">
                        <Link to="/" className="navbar-brand" style={{ fontFamily: "cursive" }}>Medium</Link>
                        {props.userName === undefined
                            ?
                             <div><Link to="/register" style={{ fontFamily: "cursive",  display: 'block' }} className="navbar-brand">Add new article</Link></div>
                            :
                            <Link to="/addpost" className="navbar-brand" style={{ fontFamily: "cursive" }}>Add new article</Link>
                        }
                    </div>
                    <div>
                        {menu}
                    </div>
                </div>
            </nav>
        </div>
    );

}

export default Navigation;