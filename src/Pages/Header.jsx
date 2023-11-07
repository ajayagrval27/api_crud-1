import React from "react"
import { Container, Nav, Navbar } from "react-bootstrap"
import { Link, NavLink } from "react-router-dom"

export const Header = () => {
    // const location = useLocation()
    // let arr = [
    //     {
    //         display: "Home",
    //         path: "/home",
    //     },
    //     {
    //         display: "Card",
    //         path: "/card",
    //     },
    //     {
    //         display: "About",
    //         path: "/about",
    //     },
    // ]

    return (
        <>
            <Navbar bg="dark p-2" data-bs-theme="dark">
                <Container>
                    <Link to="/">
                        <Navbar.Brand>HomePage</Navbar.Brand>
                    </Link>
                    <Nav className="me-auto">
                        {/* {arr.map((item, index) => (
                            <Link
                                key={index}
                                className={`m-2 px-3 py-1 rounded menu text-white ${
                                    location.pathname === item.path
                                        ? "activeClass"
                                        : ""
                                }`}
                                to={item.path}>
                                {item.display}
                            </Link>
                        ))} */}
                        {/* <Link
                            className={`m-2 px-3 py-1 rounded menu text-white ${
                                location.pathname === "/home"
                                    ? "activeClass"
                                    : ""
                            }`}
                            to="/">
                            Home
                        </Link>
                        <Link
                            className={`m-2 px-3 py-1 rounded menu text-white ${
                                location.pathname === "/card"
                                    ? "activeClass"
                                    : ""
                            }`}
                            to="/card">
                            Card
                        </Link>
                        <Link
                            className={`m-2 px-3 py-1 rounded menu text-white ${
                                location.pathname === "/about"
                                    ? "activeClass"
                                    : ""
                            }`}
                            to="/about">
                            About
                        </Link> */}
                        <NavLink
                            to="/home"
                            className="m-2 px-3 py-1 rounded menu text-white">
                            Home
                        </NavLink>
                        <NavLink
                            to="/card"
                            className="m-2 px-3 py-1 rounded menu text-white">
                            Card
                        </NavLink>
                        <NavLink
                            to="/about"
                            className="m-2 px-3 py-1 rounded menu text-white">
                            About
                        </NavLink>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}
