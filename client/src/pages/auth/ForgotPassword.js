import { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Container, Row, Form, Button } from "react-bootstrap";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const config = {
        url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
        handleCodeInApp: true,
      };
      await sendPasswordResetEmail(auth, email, config);

      setEmail("");
      setLoading(false);
      toast.success("Check your emial for password reset link...");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
      console.log("ERROR MSG IN FORGOT PASSWORD", error);
    }
  };

  return (
    <>
      <Container>
        <Row>
          {loading ? (
            <h4 className="text-danger">Loading</h4>
          ) : (
            <h4>Reset Password</h4>
          )}
        </Row>
        <Row>
          <Form onSubmit={handleSubmit}>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력해주세요..."
              autoFocus
            />
            <Button
              className="bg-danger mt-3"
              variant="danger"
              disabled={!email}
              type="submit"
            >
              비밀번호 찾기
            </Button>
          </Form>
        </Row>
      </Container>
    </>
  );
};

export default ForgotPassword;
