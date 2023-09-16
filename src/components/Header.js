import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../assets/images/logo192.png';
import {useLocation, NavLink} from 'react-router-dom';
const Header = (props) => {
    const location = useLocation();
    return (
    <>
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand href="/">
                <img src={logo} width="30" height="30" className="d-inline-block align-top me-2"/>
                Users Management
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavLink className="nav-link" to="/" active>Home</NavLink>
                    <NavLink className="nav-link" to="/users">Manage Users</NavLink>
                </Nav>
                <Nav>
                    <NavDropdown title="Setting" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                        <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    </>
    );
}
export default Header;