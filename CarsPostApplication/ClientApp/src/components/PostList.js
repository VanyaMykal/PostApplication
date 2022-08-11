import PostItem from "./PostItem"

function PostList({ posts, removePost, editPost}) {
    return (
        <div>
            {posts?.map((post, index) =>
                <div key={index}>
                    <PostItem post={post} removePost={removePost} editPost={editPost} number={index+1}/>
                </div>
                )}
        </div>
        )
}

export default PostList