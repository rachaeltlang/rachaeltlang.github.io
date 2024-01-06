
import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom"

export default function BadgerLogout() {

    // Step 7: log out
    const navigate =  useNavigate()

    useEffect(() => {
        fetch('https://cs571.org/api/f23/hw6/logout', {
            method: 'POST',
            credentials: "include",
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            },
        }).then(json => {
            // Step 7: logout
            alert("You have been logged out!")
            navigate("/") // navigate to home page
            navigate(0) // refresh page
            sessionStorage.clear()
            // no need to catch error, only response is 200
        })
    }, []);

    return <>
        <h1>Logout</h1>
        <p>You have been successfully logged out.</p>
    </>
}
