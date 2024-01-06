import React from "react"
import { Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

// child component of BadgerChatroom
function BadgerMessage(props) {
    const dt = new Date(props.created)
    const navigate = useNavigate()

    // Step 9: delete post
    const handleDelete = () => {
        fetch(`https://cs571.org/api/f23/hw6/messages?id=${props.id}`, {
            method: 'DELETE',
            credentials: "include",
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => {
            // response 200: success
            if (res.status === 200) {
                alert("Successfully deleted the post!")
                navigate(0) // refresh page
            }
            // responses 400, 401, 404
            else {
                alert("An error occured while making the request")
            }
        })
    }

    return <Card style={{ margin: "0.5rem", padding: "0.5rem" }}>
        <h2>{props.title}</h2>
        <small>Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()} by {props.poster}</small>
        <br />
        <p>{props.content}</p>
        {/* Step 9: delete post, display button for logged-in user's post */}
        {props.poster === sessionStorage.getItem("login") ? <button type="button" onClick={handleDelete} className="btn btn-danger">Delete Post</button> : null}
    </Card>
}

export default BadgerMessage;