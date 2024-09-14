import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Alert, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UploadResume = () => {
  const [title, settitle] = useState('');  
  const [file, setFile] = useState(null);
  const [resume_base64, setresume_base64] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState('');


  const handleTitleChange = (e) => {
    settitle(e.target.value);
  };
  const handleResumeSelect = (resumeData) => {
    setSelectedResume(resumeData);
  };
  const handleDelete = async (resumeId) => {
    try {
      const baseURL = process.env.REACT_APP_baseURL || 'http://localhost:8000';
      await axios.post(`${baseURL}/user/resume/delete/${resumeId}`);
      const updatedResumes = resumes.filter((resume) => resume.resume_id !== resumeId);
      setResumes(updatedResumes);
      alert('Resume deleted successfully');
    } catch (error) {
      console.error('Error deleting resume:', error.message);
    }
  };

  // Assume you have a valid user ID in localStorage
  const userId = JSON.parse(localStorage.getItem('user')).id;

  useEffect(() => {
    // Fetch all resumes for the logged-in user
    const userId = JSON.parse(localStorage.getItem('user')).id;
    const fetchResumes = async () => {
      try {
        const baseURL = process.env.REACT_APP_baseURL || 'http://localhost:8000';
        const response = await axios.get(`${baseURL}/user/resume/${userId}/`);
        setResumes(response.data);
      } catch (error) {
        console.error('Error fetching resumes:', error.message);
      }
    };

    fetchResumes();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile.size <= 5 * 1024 * 1024) {
        setFile(selectedFile);
        setErrorMessage('');

        // Read the PDF file as base64
        const reader = new FileReader();
        reader.onloadend = () => {
          setresume_base64(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setErrorMessage('File size exceeds 5 MB limit');
      }
    }
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (title && file) {      
  
      try {
        // Send the data to the backend
        const baseURL = process.env.REACT_APP_baseURL || 'http://localhost:8000';
        const response = await axios.post(`${baseURL}/user/upload-resume/`, {
          userId,
          title,
          resume_base64,
        });
  
        // Handle the response (you may want to check response status or do further actions)
        console.log('Upload response:', response.data);        
        
        if(response.data.status === 200 ){
            alert('Resume Uploaded Successfully');
            // Refresh the list of resumes
            const response = await axios.get(`${baseURL}/user/resume/${userId}/`);
            setResumes(response.data);
            navigate('/user/upload-resume');
        }
      } catch (error) {
        // Handle errors
        console.error('Error uploading resume:', error.message);
      }
    } else {
      setErrorMessage('Please provide both Resume Title and a valid PDF file');
    }
  };

  return (
    <Container className="shadow pt-4 mt-4 justify-content-center ">
      <h2>Upload Resume</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title" className="mb-3">
          <Form.Label>Resume Title:</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="resumeFile" className="mb-3">
          <Form.Label>Upload PDF File (up to 5 MB):</Form.Label>
          <Form.Control
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            required
          />
        </Form.Group>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Button type="submit" variant="primary">Submit</Button>
      </Form>
      {selectedResume && (
        <div className="mt-4">
          <h3 onClick={ () => {setSelectedResume(false)}}>Resume Preview <span className='text-light bg-danger p-1 m-1' style={{cursor: 'pointer', borderRadius: "10%"}}>Close</span></h3>
          <iframe 
            title="Resume Preview"
            src={`${selectedResume}`}
            width="100%"
            height="500px"
          ></iframe>
        </div>
      )}
      
        {
            
            resumes[0] ? 
            <div className="mt-4">
                <h3>Your Resumes</h3>
                <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Title</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {resumes.map((resume) => (
                    <tr key={resume.resume_id}>
                        <td>{resume.title}</td>
                        <td>
                        <Button onClick={() => {handleResumeSelect(resume.resume_base64)}} variant="primary">View</Button>{' '}
                        <Button onClick={() => handleDelete(resume.resume_id)} variant="danger">
                          Delete
                        </Button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </Table>
            </div>
            :
            <div className='bg-danger m-5 p-2 text-center'>
                <h3 className='text-light'>Please Upload Resume</h3>
            </div>
        }
    </Container>
  );
};

export default UploadResume;
