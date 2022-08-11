import { Link } from "react-router-dom"

function PostItem(props) {
    return (
        <div>
            <div>{props.number}. {props.post.title}</div>
            <div>{props.post.image ? <img style={{ width: "350px", height: "250px" }} src={`${props.post.image}`} /> : ''}</div>
            <div>
                <button onClick={() => props.removePost(props.post.postId)}>Delete</button>
            </div>
            <div>
                <Link to="/editpost">
                    <button onClick={() => props.editPost(props.post)}>Edit</button>
                </Link>
            </div>
        </div>
        )
}

export default PostItem