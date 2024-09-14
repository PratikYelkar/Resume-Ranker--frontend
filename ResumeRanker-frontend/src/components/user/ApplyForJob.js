import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button, Spinner, Alert, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ApplyForJob = () => {
  const [jobDetails, setJobDetails] = useState(null);
  const [applied, setApplied] = useState(false);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedResume, setSelectedResume] = useState(null);
  const [selectedResumeBase64, setSelectedResumeBase64] = useState(null);
  const [applicationSuccess, setApplicationSuccess] = useState(false);

  const jobId = window.location.pathname.split('/').pop();
  const userString = localStorage.getItem('user');

  useEffect(() => {
    const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';
    const userId = JSON.parse(userString)?.id;
    
    const isAppliedFunction = async () => {
      
      try {
        const isApplied = await axios.post(`${baseURL}/user/apply/${jobId}/`, { userId });
        setApplied(isApplied.data.success);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching job details:', error);
        setLoading(false);
      }
    };
    const fetchJobDetails = async () => {
      axios.get(`${baseURL}/recruiter/job/${jobId}/`)
        .then(response => {
          
          setJobDetails(response.data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }  
    fetchJobDetails();
    if (userString) {
      isAppliedFunction();
       
      axios.get(`${baseURL}/user/resume/${userId}/`)
        .then(response => {
          setResumes(response.data);
        })
        .catch(err => {
          console.error('Error fetching resumes:', err.message);
        });
    }

  }, [jobId, userString]);
  const navigate = useNavigate();

  const handleApply = async () => {
    if (selectedResume && selectedResumeBase64) {
      const userId = JSON.parse(localStorage.getItem('user')).id;
      const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';
      setLoading(true);
      setApplicationSuccess(false);

      try {
        // Step 1: Get matching rate
        const matchingRateResponse = await axios.post(`${baseURL}/ats/matchingrate/`, {
          resume: selectedResumeBase64,
          job_title: jobDetails.title,
          job_description: jobDetails.description,
          job_skills: jobDetails.skills,
          job_experience: jobDetails.experience
        });

        const rateWithPercent = matchingRateResponse.data.rate;
        const rate = rateWithPercent.replace('%', ''); // Remove the '%' symbol
       
        // Step 2: Submit the application
        const response = await axios.post(`${baseURL}/user/application/`, {
          userId,
          resumeId: selectedResume,
          jobId,
          rate,
        });

        console.log('Application submitted successfully:', response.data);
        setApplicationSuccess(true);
        setApplied(true);
      } catch (err) {
        console.error('Error submitting application:', err.message);
      } finally {
        setLoading(false);
      }
    } else {
      console.log('Please select a resume before applying');
    }
  };

  const getLocalTime = (utcTime) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    const localTime = new Date(utcTime).toLocaleString('en-US', options);
    return localTime;
  };

  const handleResumeSelection = (resumeId, resumeBase64) => {
    setSelectedResume(resumeId);
    setSelectedResumeBase64(resumeBase64);
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">Error: {error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      {jobDetails && (
      <>
        <h2>{jobDetails.title}</h2>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>Description</td>
              <td>{jobDetails.description}</td>
            </tr>
            <tr>
              <td>Skills</td>
              <td>{jobDetails.skills}</td>
            </tr>
            <tr>
              <td>Experience</td>
              <td>{jobDetails.experience} Year</td>
            </tr>
            <tr>
              <td>Openings</td>
              <td>{jobDetails.no_of_openings}</td>
            </tr>
            <tr>
              <td>Deadline</td>
              <td>{getLocalTime(jobDetails.deadline)}</td>
            </tr>
          </tbody>
        </Table>
      </>
      )}

      {userString ? (
        applied ? (<p className="text-info fw-bold">Already Applied, You will receive email once you selected/rejected.</p>) :
        (   
          resumes.length > 0 ? (
            <>
              <Form className='m-3'>
                {resumes.map(resume => (
                  <Form.Check
                    key={resume.resume_id}
                    type="radio"
                    label={`Resume: ${resume.title}`}
                    name="resumeSelection"
                    id={resume.resume_id}
                    onChange={() => handleResumeSelection(resume.resume_id, resume.resume_base64)}
                  />
                ))}
              </Form>
              {
                selectedResume ? (
                    <Button variant="primary" onClick={handleApply} disabled={loading}>
                      {loading ? 'Applying...' : 'Apply'}
                    </Button>
                  ) : (
                    <p className='text-danger fw-bold fs-2'>Please Select Resume</p>
                  )
              }
            </>
          ) : (
            <Button variant="primary" onClick={() => { navigate('/user/upload-resume') }}>Upload Resume</Button>
          )
        )
      ) : (
        <Button variant="primary" onClick={() => { navigate('/user-login') }}>Login</Button>
      )}

      {applicationSuccess && (
        <Alert variant="success" className="mt-3">
          Application submitted successfully!
        </Alert>
      )}
    </Container>
  );
};

export default ApplyForJob;
