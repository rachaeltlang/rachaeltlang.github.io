import React, { useEffect, useState, useNavigate } from "react"
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { Link, Outlet } from "react-router-dom"
import crest from '../../assets/uw-crest.svg'
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext"

function BadgerLayout(props) {
    // Step 6: manage logged in state
    const [loginStatus, setLoginStatus] = useState(undefined)

    // useEffect runs after rendering
    // if setLoginStatus is not in useEffect, will result in infinite loop/rendering
    useEffect(() => {
        // if logged in
        if (sessionStorage.getItem("login") !== null) {
            setLoginStatus(true)
        } else {
            setLoginStatus(false)
        }
    }, [])

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            alt="BadgerChat Logo"
                            src={crest}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        BadgerChat
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        {/* display Login and Register tabs only when loginStatus === false */}
                        {loginStatus ? null : <Nav.Link as={Link} to="login">Login</Nav.Link>}
                        {loginStatus ? null : <Nav.Link as={Link} to="register">Register</Nav.Link>}
                        {/* display Logout tab when loginStatus === true */}
                        {loginStatus ? <Nav.Link as={Link} to="logout">Logout</Nav.Link> : null}
                        <NavDropdown title="Chatrooms">
                            {/* Step 1: display chatrooms */}
                            <NavDropdown.Item as={Link} to="chatrooms/Bascom Hill Chatters">Bascom Hill Chatters</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="chatrooms/Memorial Union Hangout">Memorial Union Hangout</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="chatrooms/Lake Mendota Viewpoint">Lake Mendota Viewpoint</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="chatrooms/State Street Strollers">State Street Strollers</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="chatrooms/Camp Randall Roar">Camp Randall Roar</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="chatrooms/Aldo Leopold Nature Talks">Aldo Leopold Nature Talks</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="chatrooms/Wisconsin State Capitol Debates">Wisconsin State Capitol Debates</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="chatrooms/Monona Terrace Meetups">Monona Terrace Meetups</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="chatrooms/Henry Vilas Zoo Enthusiasts">Henry Vilas Zoo Enthusiasts</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="chatrooms/Chazen Art Appreciation">Chazen Art Appreciation</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
            <div style={{ margin: "1rem" }}>
                <BadgerLoginStatusContext.Provider value={[loginStatus, setLoginStatus]}>
                    <Outlet />
                </BadgerLoginStatusContext.Provider>
            </div>
        </div>
    );
}

export default BadgerLayout;