import React, { useEffect, useState, useRef } from "react"
import { Col, Row, Container, Pagination, Button, Form } from "react-bootstrap"
import BadgerMessage from "./BadgerMessage"
import { useNavigate } from "react-router-dom"

// parent component of BadgerMessage
export default function BadgerChatroom(props) {
    const [messages, setMessages] = useState([])

    // Step 3: pagination
    const [activePage, setActivePage] = useState(1)
    const messagesPerPage = 25
    const numPages = Math.ceil(messages.length / messagesPerPage)

    // Step 8
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const titleRef = useRef()
    const contentRef = useRef()
    const navigate = useNavigate()

    const loadMessages = () => {
        fetch(`https://cs571.org/api/f23/hw6/messages?chatroom=${props.name}&page=1`, {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
        })
    };

    // provided code
    useEffect(loadMessages, [props])

    // Step 3: pagination
    // code modified from hw4
    const buildPaginator = () => {
        // initialize pages array
        let pages = []
        // get number of pages needed
        // iterate through all pages
        for (let i = 1; i <= numPages; i++) {
            pages.push(
                <Pagination.Item
                    key={i}
                    active={activePage === i}
                    onClick={() => setActivePage(i)}
                >
                    {i}
                </Pagination.Item>
            )
        }
        return pages
    }

    // Step 8: create posts
    const handleCreate = () => {
        // check logged in
        if (sessionStorage.getItem("login") === null) {
            alert("You must be logged in to post!")
        }
        // check both post title and post content fields are not empty
        else if (titleRef.current.value.trim() === "" || contentRef.current.value.trim() === "") {
            alert("You must provide both a title and content!");
        }
        // make API call
        else {
            fetch(`https://cs571.org/api/f23/hw6/messages?chatroom=${props.name}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "X-CS571-ID": CS571.getBadgerId(),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: titleRef.current.value,
                    content: contentRef.current.value
                })
            }).then(res => {
                // response 200: success
                if (res.status === 200) {
                    alert("Successfully posted!")
                    navigate(0) // refresh page
                }
                // throw error for responses 400, 404, 413
                else {
                    alert("An error occured while making the request")
                }
            })
        }
    }

    return <>
        {/* Step 8: create posts */}
        <h1>{props.name} Chatroom</h1>
        <Form>
            {/* post title field */}
            <Form.Label
                htmlFor="title"
            >Post Title</Form.Label>
            <Form.Control
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="title"
                ref={titleRef}
            />

            {/* post content field */}
            <Form.Label
                htmlFor="content"
                style={{ marginTop: "1rem" }} // padding
            >Post Content</Form.Label>
            <Form.Control
                value={content}
                onChange={(e) => setContent(e.target.value)}
                id="content"
                ref={contentRef}
            />
        </Form>
        <Button
            onClick={handleCreate}
            style={{ marginTop: "1rem" }}
        >Create Post</Button>
        <hr />

        {/* Step 2: display messages */}
        {messages.length > 0 ?
            <> {
                <Container>                    <Row>
                        {messages.map((msg) => (
                            <Col xs={6} md={4} lg={3} xxl={2} key={msg.id}>
                                <BadgerMessage
                                    title={msg.title}
                                    poster={msg.poster}
                                    content={msg.content}
                                    created={msg.created}
                                    id={msg.id}
                                />
                            </Col>
                        ))}
                    </Row>
                </Container>
            } </> : <>
                <p>There are no messages on this page yet!</p>
            </>
        }
        <Pagination>
            {buildPaginator()}
        </Pagination>
    </>

}
