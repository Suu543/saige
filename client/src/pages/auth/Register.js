import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row } from "react-bootstrap";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { toast } from "react-toastify";

import { auth } from "../../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  let navigate = useNavigate();

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      navigate("/", { replace: true });
    }
  }, [user]);

  const handleValidation = (e) => {
    let formIsValid = true;

    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false;
      setEmailError("유효하지 않은 이메일 형식입니다.");
      return false;
    } else {
      setEmailError("");
      formIsValid = true;
    }

    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    if (handleValidation()) {
      try {
        await sendSignInLinkToEmail(auth, email, config);
        toast.success(`${email}로 회원가입 이메일이 전달되었습니다!`);

        // save user email in local storage
        window.localStorage.setItem("emailForSignIn", email);

        // clear state
        setEmail("");
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      }
    }
  };

  const registerForm = () => {
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(event) => setEmail(event.target.value)}
          />
          {emailError && (
            <>
              <small id="emailHelp" className="text-danger form-text">
                {emailError}
              </small>
              <br />
            </>
          )}
          We'll never share your email with anyone else.
          <Form.Text className="text-muted"></Form.Text>
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
        <Row>{registerForm()}</Row>
      </Container>
    </>
  );
};

export default Register;
