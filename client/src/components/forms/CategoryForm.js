import { Form, Button } from "react-bootstrap";

const CategoryForm = ({ handleSubmit, name, setName }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Label>Name</Form.Label>
    <Form.Control
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Category Name"
      autoFocus
      required
    />
    <Button type="submit">Save</Button>
  </Form>
);

export default CategoryForm;
