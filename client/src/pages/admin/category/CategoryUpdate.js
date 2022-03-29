import { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategory, updateCategory } from "../../../functions/category";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";

const CategoryUpdate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();

  const loadCategory = async () => {
    try {
      const category = await getCategory(slug);
      setName(category.data.name);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("match", slug);
    loadCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await updateCategory(slug, { name }, user.token);
      setLoading(false);
      setName("");
      toast.success(`${res.data.name} is updated`);
      navigate("/admin/category", { replace: true });
    } catch (err) {
      setLoading(false);
      if (err.response.status === 400) {
        toast.error(err.response.data);
      }
    }
  };

  return (
    <Container fluid>
      <Row sm={4}>
        <Col>
          <AdminNav />
        </Col>
        <Col sm={8}>
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Update Category</h4>
          )}
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CategoryUpdate;
