import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default class PageNotFound extends Component {
  render() {
    return (
      <Container className="mt-5">
        <Row>
          <Col className="text-center">
            <h1 className="display-4">404</h1>
            <p className="lead">Page Not Found</p>
            <p className="text-muted">The page you are looking for might be under construction or does not exist.</p>
          </Col>
        </Row>
      </Container>
    );
  }
}
