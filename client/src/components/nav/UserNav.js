import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const UserNav = () => {
  return (
    <Navbar>
      <Nav className="flex-column">
        <LinkContainer to="/user/history">
          <Nav.Link>History</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/user/password">
          <Nav.Link>Password</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/user/wishlist">
          <Nav.Link>Wishlist</Nav.Link>
        </LinkContainer>
      </Nav>
    </Navbar>
  );
};

export default UserNav;
