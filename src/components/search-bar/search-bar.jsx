import React from "react";
import { Form, Row } from "react-bootstrap";
import PropTypes from "prop-types";

export const SearchBar = ({ searchTerm, handleSearch }) => {
  return (
    <Row>
      <Form.Control
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => handleSearch(e)}
        className="mr-sm-2"
      />
    </Row>
  );
};

SearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
};
