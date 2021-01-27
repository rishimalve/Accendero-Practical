import React from "react";
import "./primitive.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from '@reach/router'

const Nvgbar = props => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Link to='/moodCheck' state={props.userState}>Check Your Mood!</Link>&nbsp;&nbsp;&nbsp;
          <Link to='/history' state={props.userState}>Your History</Link>
        </Nav>
        {
          props.userState['isLoggedIn'] ?
            <Nav>
              <Link to='/' state={props.userState}>Log Out</Link>
            </Nav> :
            <Nav>
              <Link to='/login' state={props.userState}>Login</Link>
            </Nav>
        }
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Nvgbar;
