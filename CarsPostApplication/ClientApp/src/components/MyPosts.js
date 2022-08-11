import { useEffect, useState } from "react"
import PostList from "./PostList"

function MyPosts() {
    const [myPosts, setMyPosts] = useState([])
    async function getMyPosts() {
        let response = await fetch("https://localhost:44328/api/post/myposts")
        let data = await response.json()
        console.log(data)
        setMyPosts(data)
    }
    useEffect(() => {
        getMyPosts()
    },[])
    return (
        <PostList posts={myPosts} />
        )
}

export default MyPosts