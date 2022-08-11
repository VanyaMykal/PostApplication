import { useState } from "react";
import { Link } from "react-router-dom"
function AddForm({ createPost, fetchApi }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    function submit(e) {
        e.preventDefault()
    }
    let baseURL;
    function getBase64(file) {
        return new Promise(resolve => {
            baseURL = "";
            let reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = () => {
                //console.log("Called", reader);
                baseURL = reader.result;
                //console.log("Base 64", reader.result);
                setImage(reader.result);
                //if (reader.result === '') {
                //    setImageError('Image required');
                //}
                //else {
                //    setImageError('');
                //}
                resolve(baseURL);
            }
        })
    }
    function handleFileInputChange(e) {
        //console.log(e.target.files[0]);
        let file = e.target.files[0];
        getBase64(file)
            .then(result => {
                file["base64"] = result;
                //console.log("File Is", file);
            })
            .catch(err => {
                console.log(err);
            });
    };

    async function addPost() {
        let newPost = {
            title: title,
            description: description,
            image: image
        }
        let response = await fetch(`https://localhost:44328/api/post/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPost)
        })
        let data = await response.json()
        console.log(data)
        createPost(newPost)
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
                    <input type="file" onChange={handleFileInputChange} />
                </div>
                <div>
                    <Link to="/">
                        <button onClick={addPost}>Save</button>
                    </Link>
                </div>
            </form>
        </div>
        )
}

export default AddForm