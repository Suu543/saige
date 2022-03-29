import { Container, Form } from "react-bootstrap";

const LocalSearch = ({ keyword, setKeyword }) => {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <Form.Control
      className="mt-4 mb-4"
      type="search"
      placeholder="filter"
      value={keyword}
      onChange={handleSearchChange}
    />
  );
};

export default LocalSearch;
