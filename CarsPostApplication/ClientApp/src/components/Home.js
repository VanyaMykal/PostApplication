import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import PostList from "./PostList";
import Loader from "./UI/loader/Loader";

function Home(props) {
    const [posts, setPosts] = useState([])
    const [value, setValue] = useState('')
    async function fetchApi() {
        let response = await fetch(`https://localhost:44328/api/post/posts`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        let data = await response.json();
        console.log(data);
        setPosts(data)
    }

    useEffect(() => {
        fetchApi()
    }, [])

    const filteredPosts = posts.filter(post => {
        return post.title.toLowerCase().includes(value.toLowerCase())
    })
    let auth;
    //if (props.userName === undefined) {
    //    auth = (
    //        <div>
    //            <nav className="navbar navbar-light bg-light">
    //                <form className="container-fluid">
    //                    <div style={{ textAlign: "center" }}>Sorry, but you not authenticated.</div>
    //                    <input onChange={(event) => setValue(event.target.value)} className="form-control w-25 me-2" type="search" placeholder="Search" aria-label="Search" />
    //                </form>
    //            </nav>
    //            {!posts.length
    //                ? <div className="d-flex justify-content-center"><Loader /></div>
    //                : <div>
    //                    {!filteredPosts.length
    //                        ? <h1 className="text-center">Not found</h1>
    //                        : <PostList posts={filteredPosts} />
    //                    }</div>
    //            }
    //        </div>
    //    )
    //}
    //else {
    //    auth = (
    //        <div>
    //            <nav className="navbar navbar-light bg-light">
    //                <form className="container-fluid">
    //                    {/*<Link to="/myarticles">*/}
    //                        <button className="btn btn-outline-primary me-2">My posts</button>
    //                   {/* </Link>*/}
    //                    <input onChange={(event) => setValue(event.target.value)} className="form-control w-25 me-2" type="search" placeholder="Search" aria-label="Search" />
    //                </form>
    //            </nav>
    //            {!posts.length
    //                ? <div className="d-flex justify-content-center"><Loader /></div>
    //                : <div>
    //                    {!filteredPosts.length
    //                        ? <h1 className="text-center">Not found</h1>
    //                        : <PostList posts={filteredPosts} />
    //                    }</div>
    //            }
    //        </div>
    //    )
    //}
    return (
        <div>
            <nav className="navbar navbar-light bg-light">
                <form className="container-fluid">
                    {props.userName === undefined
                        ?
                            <div style={{ textAlign: "center" }}>Sorry, but you not authenticated.</div>
                        :
                        <Link to="/myposts">
                            <button className="btn btn-outline-primary me-2">My posts</button>
                        </Link>
                    }
                    <input onChange={(event) => setValue(event.target.value)} className="form-control w-25 me-2" type="search" placeholder="Search" aria-label="Search" />
                </form>
            </nav>
            {!posts.length
                ?
                <div className="d-flex justify-content-center"><Loader /></div>
                :
                <div>
                        {!filteredPosts.length
                            ? <h1 className="text-center">Not found</h1>
                            : <PostList posts={filteredPosts} />
                        }</div>
            }
        </div>
        )
}

export default Home