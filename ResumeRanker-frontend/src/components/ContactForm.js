// ContactForm.js

import React from 'react';
import { Form, Button } from 'react-bootstrap';

const ContactForm = () => {
  return (
    <div className="contact-form">
      <Form>
        <Form.Group controlId="formName">
          <Form.Label>Your Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="Enter your email" />
        </Form.Group>

        <Form.Group controlId="formMessage">
          <Form.Label>Your Message</Form.Label>
          <Form.Control as="textarea" rows={4} placeholder="Enter your message" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Send Message
        </Button>
      </Form>
    </div>
  );
};

export default ContactForm;
