import React, { useContext } from "react";
import "./Header.css";
import logo from "../../../src/images/Logo.png";
import { Container, Form, FormControl, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { userContext } from "../../App";
import Avatar from '@material-ui/core/Avatar';


const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(userContext);

  return (
    <div className="Header">
      <Navbar bg="" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Form inline className="mr-auto">
              <FormControl
                className="search-input"
                type="text"
                placeholder="Search your Destination"
              />
            </Form>
            <nav>
              <Link to="/">Home</Link>
              <Link to="/destination">Destination</Link>
            </nav>
            {
              loggedInUser.email ? <Link to="/">
                <button onClick={() => setLoggedInUser({})} type="button" className="btn-signin">
                  Log Out
              </button>
              </Link> : <Link to="/login">
                  <button type="button" className="btn-signin">
                    Log in
                  </button>
                </Link>
            }
            {loggedInUser.email && <Avatar src="/broken-image.jpg" />}
            <p style={{ textAlign: "center", marginTop: "10px", marginLeft: "5px", fontWeight: '500', fontSize: '20px' }}>{loggedInUser.name}</p>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
