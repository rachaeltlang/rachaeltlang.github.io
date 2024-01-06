import { useState, useRef } from 'react'
import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

// Step 5: allow login
export default function BadgerLogin() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const usernameRef = useRef()
    const passwordRef = useRef()

    // Step 6: login
    const navigate = useNavigate()

    // adapted from API call in BadgerRegister.jsx
    const authenticateUser = () => {
        // check both username and password fields are not empty
        if (usernameRef.current.value.trim() === "" || passwordRef.current.value.trim() === "") {
            alert("You must provide both a username and password!");
        }
        // make API call
        else {
            fetch("https://cs571.org/api/f23/hw6/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "X-CS571-ID": CS571.getBadgerId(),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: usernameRef.current.value,
                    password: passwordRef.current.value
                })
            }).then(res => {
                // response 200: success
                if (res.status === 200) {
                    alert("Login successful!")
                    // Step 6: manage logged in state
                    sessionStorage.setItem("login", usernameRef.current.value)
                    navigate("/") // navigate to home page
                    navigate(0) // refresh page
                }
                // response 401: unauthorized access
                else if (res.status === 401) {
                    alert("Incorrect username or password!")
                } else { // 400 error
                    alert("An error occured while making the request")
                }
            })
        }
    }

    return <>
        <h1>Login</h1>
        <Form>
            {/* username field */}
            <Form.Label
                htmlFor="username"
            >Username</Form.Label>
            <Form.Control
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                ref={usernameRef}
            />

            {/* password field */}
            <Form.Label
                htmlFor="password"
                style={{ marginTop: "1rem" }} // padding
            >Password</Form.Label>
            <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password" // mask password
                id="password"
                ref={passwordRef}
            />
        </Form>

        {/* login button */}
        <Button
            onClick={authenticateUser}
            style={{ marginTop: "1rem" }}
        >Login</Button>
    </>
}