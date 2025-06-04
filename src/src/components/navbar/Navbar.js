import React from "react";
import { Navbar as BSNavbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Navbar({ appName }) {
  return (
    <BSNavbar bg="dark" variant="dark">
      <Container>
        <Link className="navbar-brand d-flex align-items-center" to="/bulletin-generator">
          {appName}
        </Link>
        <Link className="nav-link" to="/b">
          Version B
        </Link>
      </Container>
    </BSNavbar>
  );
}

export default Navbar;
