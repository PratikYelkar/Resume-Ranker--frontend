import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateJob = () => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    skills: '',
    experience: '',
    noOfOpenings: 5,
    deadline: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recruiterDetails = JSON.parse(localStorage.getItem('recruiter'));

    // Prepare the data to be sent to the server
    const postData = {
      recruiterId: recruiterDetails.id,
      ...formData,
    };

    // Fetch the API URL from the environment variable
    const baseURL = process.env.REACT_APP_baseURL || 'http://localhost:8000'; 

    try {
      const response = await axios.post(`${baseURL}/recruiter/create-job/`, postData);

      if (response.data.status === 200) {
        alert('Job Created Successfully');
        setFormData({
          id: '',
          title: '',
          description: '',
          skills: '',
          experience: '',
          noOfOpenings: 5,
          deadline: '',
        });

      } else {
        alert('Something Went Wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing your request.');
    }
    navigate('/recruiter/dashboard');
  };

  return (
    <Container className='shadow pt-4 mt-4 justify-content-center '>
      <h1 className='mb-4'>Create Job Vacancy</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle" className='mb-4'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDescription" className='mb-4'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter description"
            name="description"
            rows={5}
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formSkills" className='mb-4'>
          <Form.Label>Skills</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formExperience" className='mb-4'>
          <Form.Label>Experience (in years)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter experience"
            name="experience"
            max={70}
            value={formData.experience}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formNoOfOpenings" className='mb-4'>
          <Form.Label>Number of Openings</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter number of openings"
            name="noOfOpenings"
            value={formData.noOfOpenings}
            onChange={handleChange}
            min={1}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDeadline">
          <Form.Label>Deadline</Form.Label>
          <Form.Control
            type="datetime-local"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className='mt-4 mb-5'>
          Open Vacancy
        </Button>
      </Form>
    </Container>
  );
};

export default CreateJob;
