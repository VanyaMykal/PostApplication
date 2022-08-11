import { useState } from "react"
import { Link } from "react-router-dom"
function EditForm({ currentEditPost, fetchApi }) {
    console.log(currentEditPost)
    const [id, setId] = useState(currentEditPost.postId)
    const [title, setTitle] = useState(currentEditPost.title)
    const [description, setDescription] = useState(currentEditPost.description)
    function submit(e) {
        e.preventDefault()
    }
    async function editPost() {
        let newPost = {
            postId:id,
            title: title,
            description: description
        }
        await fetch(`https://localhost:44328/api/post/edit`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPost)
        })
        fetchApi()
    }
    return (
        <div>
            <Link to="/">Back</Link>
            <form onSubmit={submit}>
                <div>
                    <input type="text" placeholder="Title..." value={title} onChange={(event) => setTitle(event.target.value)} />
                </div>
                <div>
                    <input type="text" placeholder="Description..." value={description} onChange={(event) => setDescription(event.target.value)} />
                </div>
                <div>
                    <Link to="/">
                        <button onClick={editPost}>Edit</button>
                    </Link>
                </div>
            </form>
        </div>
        )
}

export default EditForm