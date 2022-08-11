import { useEffect, useState } from "react"
import PostList from "./components/PostList";
import { Route } from "react-router";
import { BrowserRouter, Link } from 'react-router-dom';
import AddForm from "./components/AddForm";
import EditForm from "./components/EditForm";
import Navigation from "./components/Navigation";
import LoginForm from "./components/Authentication/LoginForm";
import RegisterForm from "./components/Authentication/RegisterForm";

function App() {
    const [posts, setPosts] = useState([])
    const [userName, setName] = useState(undefined)
    const [currentEditPost, setCurrentEditPost] = useState('')
    const [value, setValue] = useState('')

    useEffect(() => {
        async function fetchUser() {
            await fetch("https://localhost:44328/api/account/GetUser")
                .then(results => results.json())
                .then(data => {
                    console.log(data)
                    setName(data.userName)
                })
        }
        fetchUser();
    }, []);

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

    function createPost(post) {
        setPosts([...posts, post])
    }
    async function removePost(postId) {
        console.log(postId)
        setPosts(posts.filter(c => c.postId !== postId))
        await fetch(`https://localhost:44328/api/post/delete/` + postId, {
            method: "DELETE",
            headers: {"Content-Type":"application/json"}
        })

    }

    function editPost(post) {
        console.log(post)
        setCurrentEditPost(post)
    }

    const filteredPosts = posts.filter(post => {
        return post.title.toLowerCase().includes(value.toLowerCase())
    })
    return (
        <div>
            <BrowserRouter>
                <Navigation userName={userName} setName={setName} />
                <div>
                    <input type="text" placeholder="Search..." value={value} onChange={event => setValue(event.target.value)} />
                </div>
                <Link to="/addpost">
                    <button>Add post</button>
                </Link>

                <Route path="/" exact component={() => <PostList posts={filteredPosts} removePost={removePost} editPost={editPost} />} />
                <Route path="/login" component={() => <LoginForm setName={setName} />} />
                <Route path="/register" component={() => <RegisterForm setName={setName} />} />
                <Route path="/addpost" component={() => <AddForm createPost={createPost} fetchApi={fetchApi} />} />
                <Route path="/editpost" component={() => <EditForm currentEditPost={currentEditPost} fetchApi={fetchApi} />} />
            </BrowserRouter>
        </div>
        )
}

export default App
