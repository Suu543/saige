import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row } from "react-bootstrap";
import { toast } from "react-toastify";

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";

import { auth, googleAuthProvider } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  let dispatch = useDispatch();
  let navigate = useNavigate();

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      navigate("/", { replace: true });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      // console.log("result", result);

      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });

      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });

      navigate("/", { replace: true });
    } catch (error) {
      console.log("error", error);
      toast.error(error.message);
    }
  };

  const completeLoginForm = () => {
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          We'll never share your email with anyone else.
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="true"
          />
        </Form.Group>
      </Form>
    );
  };

  return (
    <>
      <Container>
        <Row>
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Login</h4>
          )}
        </Row>
        <Row>{completeLoginForm()}</Row>
        <div className="d-grid gap-2">
          <Button
            onClick={handleSubmit}
            variant="primary"
            type="submit"
            disabled={!email || password.length < 6}
            size="lg"
          >
            로그인
          </Button>
          <Button
            className="bg-danger"
            onClick={googleLogin}
            variant="danger"
            type="submit"
            size="lg"
          >
            구글 로그인
          </Button>

          <Link to="/forgot/password" className="float-right text-danger">
            비밀번호를 잊어버리셨나요?
          </Link>
        </div>
      </Container>
    </>
  );
};

export default Login;
