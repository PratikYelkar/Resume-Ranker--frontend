// FAQ.js

import React, { useState } from 'react';
import { Container, Accordion, Card, Button } from 'react-bootstrap';

const FAQ = () => {
  const faqData = [
    {
      question: 'What is Resume Ranker?',
      answer: 'Resume Ranker is a platform designed to help recruiters and employers efficiently rank and find the best resumes for job openings using advanced algorithms.',
    },
    {
      question: 'How does the ranking algorithm work?',
      answer: 'Our powerful algorithm ranks resumes based on relevancy and skills. It analyzes the skills and qualifications in the job description and matches them with the information on resumes to provide a percentage match.',
    },
    // Add more questions and answers as needed
  ];

  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggle = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <Container id="faq" className="faq">
      <h2>Frequently Asked Questions</h2>
      <Accordion>
        {faqData.map((item, index) => (
          <Card key={index}>
            <Card.Header>
              <Accordion.Toggle
                as={Button}
                variant="link"
                eventKey={index.toString()}
                onClick={() => handleToggle(index)}
              >
                {item.question} {expandedIndex === index ? ' -' : ' +'}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={index.toString()}>
              <Card.Body>{item.answer}</Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
    </Container>
  );
};

export default FAQ;
