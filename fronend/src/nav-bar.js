import React from "react";
import "./primitive.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const Nvgbar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">Mood2Day</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#features">Check Your Mood!</Nav.Link>
          <Nav.Link href="#pricing">History</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="#deets">Log Out</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Nvgbar;
