// LandingPage.js

import React, { useState } from 'react';
import { Container, Row, Col, Button, Card, Accordion } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../static/css/LandingPage.css';
import ContactForm from './ContactForm';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  document.title = "Resume Ranker | Home";
  const faqData = [
    {
      question: 'How does Resume Ranker work?',
      answer: 'Resume Ranker uses advanced algorithms to analyze resumes based on relevancy and skills. It ranks resumes to help you find the most suitable candidates for your job openings.',
    },
    {
      question: 'Is Resume Ranker mobile-friendly?',
      answer: 'Yes, Resume Ranker is designed to be responsive and mobile-friendly. You can access your ranked resumes on the go with ease.',
    },
    // Add more FAQ items as needed
  ];

  const [activeQuestion, setActiveQuestion] = useState(null);

  const handleAccordionChange = (questionIndex) => {
    setActiveQuestion((prev) => (prev === questionIndex ? null : questionIndex));
  };

  return (
    <div className="landing-page">      
      <header id='home' className="header">
        <Container>
          <Row>
            <Col>
              <h1>Resume Ranker</h1>
              <p>Connecting Top Talent with Exceptional Opportunities to Unlock Careers</p>
              <Button variant="primary" as={Link} to="/user-login">Job Seeker</Button>
              <span className="cta-spacer"></span> {/* Add a spacer */}
              <Button variant="secondary" as={Link} to="/recruiter-login">Recruiter</Button>
            </Col>
          </Row>
        </Container>
      </header>

      <Container id='about' className="about">
        <Row>
          <Col>
            <h2>About Resume Ranker</h2>
            <p>
              Welcome to Resume Ranker, a cutting-edge platform designed to streamline the hiring process. At Resume Ranker, our primary goal is to simplify and enhance the recruitment journey by leveraging advanced algorithms to connect employers with the most suitable candidates for their job openings.
            </p>
          </Col>
        </Row>
      </Container>

      <Container id='features' className="features">
        <h2>Key Features</h2>
        <Row>
          <Col xs={12} sm={6} md={4}>
            <Card className={`animated-card ${activeQuestion === null ? 'active' : ''}`}>
              <Card.Body>
                <Card.Title>Advanced Ranking Algorithm</Card.Title>
                <Card.Text>
                  Our powerful algorithm ranks resumes based on relevancy and skills.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Card className={`animated-card ${activeQuestion === null ? 'active' : ''}`}>
              <Card.Body>
                <Card.Title>User-Friendly Interface</Card.Title>
                <Card.Text>
                  Intuitive design to make the ranking process easy and efficient.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Card className={`animated-card ${activeQuestion === null ? 'active' : ''}`}>
              <Card.Body>
                <Card.Title>Responsive and Mobile-Friendly</Card.Title>
                <Card.Text>
                  Access your ranked resumes on the go with our mobile-friendly interface.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container id='services' className="services">
        <h2>Our Services</h2>
        <Row>
          <Col xs={12} sm={6} md={4}>
            <Card className={`animated-card ${activeQuestion === null ? 'active' : ''}`}>
              <Card.Body>
                <Card.Title>Resume Ranking</Card.Title>
                <Card.Text>
                  Utilize our advanced resume ranking services to find the most suitable candidates for your job openings.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Card className={`animated-card ${activeQuestion === null ? 'active' : ''}`}>
              <Card.Body>
                <Card.Title>Consultation</Card.Title>
                <Card.Text>
                  Our experts offer consultation services to optimize your hiring process and make informed decisions.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Card className={`animated-card ${activeQuestion === null ? 'active' : ''}`}>
              <Card.Body>
                <Card.Title>Custom Solutions</Card.Title>
                <Card.Text>
                  Need a tailored solution? Contact us, and we'll customize our services to meet your specific requirements.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container id="faq" className="faq">
        <h2>Frequently Asked Questions</h2>
        <Accordion>
          {faqData.map((faq, index) => (
            <Accordion.Item eventKey={index.toString()} key={index} onClick={() => handleAccordionChange(index)}>
              <Accordion.Header>
                <span>{faq.question}</span>
              </Accordion.Header>
              <Accordion.Body>
                {activeQuestion === index && <p>{faq.answer}</p>}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>

      <Container className="cta">
        <h2>Ready to rank resumes?</h2>
        <p>Sign up now and get started!</p>
        <Button variant="primary" as={Link} to="/user-login">Job Seeker</Button>
        <span className="cta-spacer"></span> {/* Add a spacer */}
        <Button variant="secondary" as={Link} to="/recruiter-login">Recruiter</Button>
      </Container>
      
      <Container id='contact' className="contact">
      <h2>Contact</h2>
        <Row>
          <Col md={6}>
            <ContactForm />
          </Col>
          <Col md={6} className="contact-info">
            <p>If you have any questions or inquiries, feel free to reach out to us:</p>
            <p>Email: info@resumeranker.com</p>
            <p>Phone: (123) 456-7890</p>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default LandingPage;
