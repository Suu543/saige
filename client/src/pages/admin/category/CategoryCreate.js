import { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const CategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // step 1
  const [keyword, setKeyword] = useState("");

  const loadCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    try {
      const res = await createCategory({ name }, user.token);
      setLoading(false);
      setName("");
      toast.success(`${res.data.name} is created`);
      loadCategories();
    } catch (err) {
      setLoading(false);
      if (err.response.status === 400) {
        toast.error(err.response.data);
      }
    }
  };

  const handleRemove = async (slug) => {
    try {
      let answer = window.confirm(`${slug} 카테고리를 삭제하시겠습니까?`);

      if (answer) {
        setLoading(true);
        const res = await removeCategory(slug, user.token);

        if (res) {
          setLoading(false);
          toast.success(`${res.data.name} 카테고리가 삭제되었습니다!`);
          loadCategories();
        }
      }
    } catch (err) {
      if (err.response.status === 400) {
        toast.error(err.response.data);
      }
    }
  };

  // step 4
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

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
            <h4>Create Category</h4>
          )}
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />

          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          <hr />
          {/* Step 5 */}
          {categories.filter(searched(keyword)).map((c) => (
            <div className="alert alert-secondary" key={c._id}>
              {c.name}
              <Button
                onClick={() => handleRemove(c.slug)}
                className="float-end"
              >
                삭제
              </Button>
              <LinkContainer to={`/admin/category/${c.slug}`}>
                <Button className="float-end">수정</Button>
              </LinkContainer>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default CategoryCreate;
