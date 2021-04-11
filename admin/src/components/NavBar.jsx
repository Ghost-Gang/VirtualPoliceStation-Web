import React, { useState } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import firebase from 'firebase/app'
import 'firebase/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

function NavBar() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [user, setUser] = useState('');
    // let link = '';

    firebase.auth().onAuthStateChanged(u => {
        if (u) {
            setUser(u);
        }
        u == null ? setIsSignedIn(false) : setIsSignedIn(true);
        // link = `/u/${user.uid}/home`;
    });
    const signOut = (e) => {
        e.preventDefault();
        firebase.auth().signOut();
        window.location.href = '/';
    }
    return (
        <Navbar expand="md">
            <Navbar.Brand>VPS Admin Console</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"><FontAwesomeIcon icon={faBars} /></Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto mr-5">
                    {isSignedIn && <Nav.Link href={`/u/${user.uid}/home`}>Home</Nav.Link>}
                    {!isSignedIn && <Nav.Link href='/sign-in'>Sign in</Nav.Link>}
                    {isSignedIn && <NavDropdown title="Profile" id="basic-nav-dropdown">
                        <NavDropdown.Item href={`/u/${user.uid}/my-profile`}>My Account</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={signOut}>Sign out</NavDropdown.Item>
                    </NavDropdown>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar