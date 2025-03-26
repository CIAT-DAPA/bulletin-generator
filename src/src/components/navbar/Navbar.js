import React from "react";
import { Navbar as BSNavbar, Container } from "react-bootstrap";

function Navbar({ appName }) {
  return (
    <BSNavbar bg="dark" variant="dark">
      <Container>
        <BSNavbar.Brand href="#home">{appName}</BSNavbar.Brand>
      </Container>
    </BSNavbar>
  );
}

export default Navbar;
