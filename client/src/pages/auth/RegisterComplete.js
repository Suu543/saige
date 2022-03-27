import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { signInWithEmailLink, updatePassword } from "firebase/auth";

import { auth } from "../../firebase";

import { createOrUpdateUser } from "../../functions/auth";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForSignIn"));
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("이메일과 비밀번호를 입력해주세요...");
      return;
    }

    if (password.length < 6) {
      toast.error("비밀번호는 적어도 6글자 길이 이상이어야 합니다.");
    }

    try {
      const result = await signInWithEmailLink(
        auth,
        email,
        window.location.href
      );
      // console.log("RESULT", result);

      if (result.user.emailVerified) {
        // 1. remove user email from localStorage
        window.localStorage.removeItem("emailForSignIn");
        // 2. get user ID Token
        const user = auth.currentUser;
        await updatePassword(user, password);
        const idTokenResult = await user.getIdTokenResult();
        // 3. Redux Store
        console.log("user", user, "idTokenResult", idTokenResult);

        const loggedUser = await createOrUpdateUser(idTokenResult.token);
        console.log("getUser", loggedUser);

        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            name: loggedUser.data.name,
            email: loggedUser.data.email,
            token: idTokenResult.token,
            role: loggedUser.data.role,
            _id: loggedUser.data._id,
          },
        });
        // 4. Redirect
        // history.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => {
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>이메일</Form.Label>
          <Form.Control type="email" value={email} disabled />
          We'll never share your email with anyone else.
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          제출
        </Button>
      </Form>
    );
  };

  return (
    <>
      <Container>
        <Row>
          <h1>회원가입</h1>
        </Row>
        <Row>{completeRegistrationForm()}</Row>
      </Container>
    </>
  );
};

export default RegisterComplete;
