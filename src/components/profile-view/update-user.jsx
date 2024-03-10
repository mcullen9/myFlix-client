import React, { useState } from "react";
import { Form, Button, Row } from "react-bootstrap";

export const UpdateUser = ({ formData, handleUpdate, handleSubmit }) => {
  return (
    <Row>
      <Form onSubmit={handleSubmit}>
        <br />
        <h3>Do you need to update your profile information?</h3>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={formData.Username}
            onChange={(e) => handleUpdate(e)}
            required
          />
        </Form.Group>
        <br />
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={formData.Password}
            onChange={(e) => handleUpdate(e)}
            required
            minLength={8}
          />
        </Form.Group>
        <br />
        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            value={formData.Birthday}
            onChange={(e) => handleUpdate(e)}
            required
          />
        </Form.Group>
        <br />
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={formData.Email}
            onChange={(e) => handleUpdate(e)}
            required
          />
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">
          Submit changes
        </Button>
      </Form>
    </Row>
  );
};
