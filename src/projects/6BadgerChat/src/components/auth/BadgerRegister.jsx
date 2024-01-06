import { useState, useRef } from 'react'
import { Button, Form } from "react-bootstrap"

// Step 4: allow registration
export default function BadgerRegister() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const usernameRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()

    // adapted from week07 in-class example
    const createUser = () => {
        // check both username and password fields are not empty
        if (usernameRef.current.value.trim() === "" || passwordRef.current.value.trim() === "") {
            alert("You must provide both a username and password!")
        }
        // check passwords match
        else if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            alert("Your passwords do not match!")
        }
        // make API call
        else {
            fetch("https://cs571.org/api/f23/hw6/register", {
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
                    alert("Registration successful!")
                }
                // response 409: username taken
                else if (res.status === 409) {
                    alert("That username has already been taken!")
                } else {
                    throw new Error()
                }
            }).catch(e => { // check error
                alert("An error occured while making the request")
            })
        }
    }

    return <>
        <h1>Register</h1>
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

            {/* confirm password field */}
            <Form.Label
                htmlFor="confirm-password"
                style={{ marginTop: "1rem" }} // padding
            >Confirm Password</Form.Label>
            <Form.Control
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password" // mask password
                id="confirm-password"
                ref={confirmPasswordRef}
            />
        </Form>

        {/* register button */}
        <Button
            onClick={createUser}
            style={{ marginTop: "1rem" }}
        >Register</Button>
    </>
}
