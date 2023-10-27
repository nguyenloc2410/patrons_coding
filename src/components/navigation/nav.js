import "../navigation/nav.scss";
import { Link, NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../../context/userProvider";
import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { logOutAccount } from "../../services/userService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const NavHeader = () => {
  let navigates = useNavigate();
  const { user } = useContext(UserContext);
  const { logoutContext } = useContext(UserContext);
  const handleLogOut = async () => {
    let data = await logOutAccount();
    localStorage.removeItem("jwt");
    logoutContext();
    if (data.EC === 0) {
      toast.success(data.EM);
      navigates("/login");
    }
  };
  if (user && user.isAuthentic === true) {
    return (
      <div className="navheader">
        <Navbar expand="lg" bg="bg-header">
          <Container>
            <NavLink to="/" className="navbar-brand">
              Coding Patrons
            </NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavLink to="/main" className="nav-link">
                  Main
                </NavLink>
                <NavLink to="/project" className="nav-link">
                  Project
                </NavLink>
                <NavLink to="/about" className="nav-link">
                  About
                </NavLink>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Navbar.Text className="welcome_des">
                Welcome: {user.account.username}
              </Navbar.Text>
              <button className="btn logout_btn" onClick={() => handleLogOut()}>
                Log Out
              </button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  } else if (window.location.pathname !== "/login") {
    return (
      <>
        <div className="navheader">
          <Navbar expand="lg" bg="bg-header">
            <Container>
              <NavLink to="/" className="navbar-brand">
                Coding Patrons
              </NavLink>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <NavLink to="/main" className="nav-link">
                    Main
                  </NavLink>
                  <NavLink to="/project" className="nav-link">
                    Project
                  </NavLink>
                  <NavLink to="/about" className="nav-link">
                    About
                  </NavLink>
                  <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      Action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      Something
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Separated link
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Link className="btn logout_btn" to="/login">
                  Log In
                </Link>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </>
    );
  }
};
export default NavHeader;
