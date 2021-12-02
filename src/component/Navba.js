import { Container, Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const Navba = (props) => {
  return (
    <div>
      {props.loged === false ? (
        <Navbar className="backgroundColor " expand="lg">
          <Container>
            <Navbar.Brand href="/">/et´s Practice</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href={`/logIn`}>Log in</Nav.Link>
                <Nav.Link href="signUp">Sign up</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : (
        <>
          <Navbar className="navba1 backgroundColor" expand="lg">
            <Container>
              <Navbar.Brand href="/">/et´s Exchange</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/home">Conversations</Nav.Link>
                  <Nav.Link href="/selfProfile">Profile</Nav.Link>
                  <Nav.Link href="/search">Search</Nav.Link>
                  <Nav.Link href="/">Log out</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </>
      )}
    </div>
  );
};
export default Navba;
