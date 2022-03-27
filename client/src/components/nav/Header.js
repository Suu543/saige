import firebase from "firebase/compat/app";

import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  let dispatch = useDispatch();
  let { user } = useSelector((state) => ({ ...state }));
  let navigate = useNavigate();

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });

    navigate("/login", { replace: true });
  };

  return (
    <Navbar sticky="top" expand="lg">
      <Container fluid>
        <LinkContainer
          className="d-flex align-items-center justify-content-center"
          to="/"
          style={{ textDecoration: "none" }}
        >
          <Navbar.Brand id="navbarBrand" href="#">
            <img
              src="/logo.png"
              width="55"
              height="55"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
            <span style={{ fontSize: "25px" }}>Saige</span>
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 align-items-center"
            style={{ maxHeight: "500px" }}
            navbarScroll
          >
            <NavDropdown
              style={{ color: "#18113c" }}
              title="소개"
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item href="#action3">브랜드소개</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                전국대리점 및 AS 안내
              </NavDropdown.Item>
              <NavDropdown.Item href="#action4">제휴문의</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#action1">전기자전거</Nav.Link>
            <Nav.Link href="#action2">전동스쿠터</Nav.Link>
            <Nav.Link href="#action2">악세사리</Nav.Link>
            <Nav.Link href="#action2">공지사항</Nav.Link>
            <NavDropdown title="고객센터" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">F&Q</NavDropdown.Item>
              <NavDropdown.Item href="#action4">질문게시판</NavDropdown.Item>
              <NavDropdown.Item href="#action4">리뷰모아보기</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="align-items-center">
            {!user && (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>로그인</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>회원가입</Nav.Link>
                </LinkContainer>
              </>
            )}

            {user && (
              <>
                <LinkContainer to="/user">
                  <Nav.Link>{user.email && user.email.split("@")[0]}</Nav.Link>
                </LinkContainer>
                <Nav.Link>
                  <Button onClick={logout}>로그아웃</Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
