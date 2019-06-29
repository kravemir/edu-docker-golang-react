import React from "react";
import { Link, matchPath, withRouter } from "react-router-dom";
import { Nav, NavDropdown, Navbar } from "react-bootstrap";

function Navigation(props) {
  console.log(props);

  const NavLink = ({ children, path, exact }) => (
    <Nav.Link
      as={Link}
      to={path}
      active={matchPath(location.pathname, { path: path, exact: exact })}
    >
      {children}
    </Nav.Link>
  );
  return (
    <Navbar variant="site">
      <div className="container">
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink path="/" exact={true}>
              Home
            </NavLink>
            <NavLink path="/settings" exact={false}>
              Settings
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default withRouter(Navigation);
