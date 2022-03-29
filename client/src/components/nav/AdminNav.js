import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const AdminNav = () => {
  return (
    <Navbar>
      <Nav className="flex-column">
        <LinkContainer to="/admin/dashboard">
          <Nav.Link>History</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/products">
          <Nav.Link>Password</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/category">
          <Nav.Link>Category</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/sub">
          <Nav.Link>Sub-Category</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/coupon">
          <Nav.Link>Coupon</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/user/password">
          <Nav.Link>Password</Nav.Link>
        </LinkContainer>
      </Nav>
    </Navbar>
  );
};

export default AdminNav;
