import { useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { auth } from "../../firebase";
import { updatePassword } from "firebase/auth";
import { toast } from "react-toastify";
import { Form, Button } from "react-bootstrap";

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const user = auth.currentUser;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updatePassword(user, password);
      setLoading(false);
      setPassword("");
      toast.success("비밀번호 업데이트");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };
  const passwordUpdateForm = () => (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>비밀번호</Form.Label>
        <Form.Control
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter New Password"
          value={password}
          disabled={loading}
        />

        <Button
          className="bg-danger"
          onClick={handleSubmit}
          disabled={!password || password.length < 6 || loading}
        >
          비밀번호 변경
        </Button>
      </Form.Group>
    </Form>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col md-2">
          <UserNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>User Password Update Page</h4>
          )}
          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  );
};

export default Password;
