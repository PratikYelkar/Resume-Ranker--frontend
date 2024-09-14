import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

const JobDetails = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [matchingRate, setMatchingRate] = useState(0);
  const [selectedApplicants, setSelectedApplicants] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [resumeData, setResumeData] = useState('');
  const [confirmingSelection, setConfirmingSelection] = useState(false);

  const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';
  
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';
        const jobResponse = await axios.get(`${baseURL}/recruiter/job/${jobId}/`);
        const applicantResponse = await axios.post(`${baseURL}/recruiter/job/getapplicantdetails/${jobResponse.data.recruiter}/${jobId}/`);
        setApplicants(applicantResponse.data);
        setFilteredApplicants(applicantResponse.data);
        
        // Fetch selected applicants from the server and initialize selectedApplicants state
        const selectedApplicantIds = await fetchSelectedApplicants();
        setSelectedApplicants(selectedApplicantIds.reduce((acc, id) => {
          acc[id] = true;
          return acc;
        }, {}));
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    const fetchSelectedApplicants = async () => {
    try {
        const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';
        const response = await axios.get(`${baseURL}/ats/selection/${jobId}/`);
        return response.data.application_ids || [];
    } catch (error) {
        console.error('Error fetching selected applicants:', error);
        return [];
    }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleMatchingRateChange = (event) => {
    const rate = event.target.value;
    setMatchingRate(rate);
    setFilteredApplicants(applicants.filter(applicant => applicant.matching_rate >= rate));
  };

  const handleUnselect = async (applicationId) => {
    try {      
      const isUnselected = await axios.post(`${baseURL}/ats/unselect/`, { application_id: applicationId });
      alert(isUnselected.data.message)

    } catch (error) {
      console.error('Error unselecting application:', error);
      // Handle error as needed
    }
  };
  
  const handleCheckboxChange = (applicationId) => {
    setSelectedApplicants((prevState) => {
      const newSelectedApplicants = { ...prevState };
      if (newSelectedApplicants[applicationId]) {
        // If already selected, remove from selected applicants
        delete newSelectedApplicants[applicationId];
        // Send request to unselect
        handleUnselect(applicationId);
      } else {
        // If not selected, add to selected applicants
        newSelectedApplicants[applicationId] = true;
      }
      return newSelectedApplicants;
    });
  };
  

  const handleConfirmSelection = async () => {
    setConfirmingSelection(true); // Set state to indicate confirming selection
    const selectedApplicationIds = Object.keys(selectedApplicants);
    try {
      const response = await axios.post(`${baseURL}/ats/selection/`, { application_ids: selectedApplicationIds });
      if (response.status === 200) {
        alert('Selection confirmed successfully');
      } else {
        alert('Failed to confirm selection');
      }
    } catch (error) {
      alert(`Error confirming selection: ${error.response ? error.response.data.error : error.message}`);
    } finally {
        setConfirmingSelection(false); // Reset state after confirming selection
    }
  };

  return (
    <div className='mt-5 text-center p-3'>
        <div className='mt-5 text-center p-3'>
            {/* Existing JSX content */}
            {confirmingSelection && <p>Confirming selection...</p>}
        </div>
        <div className="filter">
            <Form.Label>Filter by Matching Rate: {matchingRate}%</Form.Label>
            <Form.Control
            type="range"
            min="0"
            max="100"
            value={matchingRate}
            onChange={handleMatchingRateChange}
            />
        </div>
        <Modal show={showModal} onHide={() => setShowModal(false)} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Resume</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Display the resume data here */}
                <iframe src={resumeData} title='resume' style={{ width: '100%', height: '500px' }} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
            </Modal.Footer>
        </Modal>

        <div className='border-top text-center row mt-3'>
            <div className='col-sm-6'>
                <h2>Applicants</h2>
            </div>
            <div className='col-sm-6'>
                <p className='text-danger'>Selected Candidates : {Object.keys(selectedApplicants).length}</p>
            </div>
        </div>
        {filteredApplicants.length > 0 ? (
            <Table striped bordered hover responsive>
            <thead>
                <tr>
                <th>Applicant ID</th>
                <th>User ID</th>
                <th>Resume ID</th>
                <th>Matching Rate</th>
                <th>Apply Time</th>
                <th>Select</th>
                </tr>
            </thead>
            <tbody>
                {filteredApplicants.map(applicant => (
                <tr key={applicant.application_id}>
                    <td>{applicant.application_id}</td>
                    <td>{applicant.user}</td>
                    <td onClick={async () => {
                    try {
                        const response = await axios.get(`${baseURL}/user/getresume/${applicant.resume}/`);
                        setResumeData(response.data.resume_base64);
                        setShowModal(true);
                    } catch (error) {
                        console.error('Error fetching resume:', error);
                    }
                    }}>
                    {applicant.resume}
                    </td>
                    <td>{applicant.matching_rate}</td>
                    <td>{format(new Date(applicant.apply_time), 'dd MMM yyyy, HH:mm')}</td>
                    <td>
                    <Form.Check
                        type="checkbox"
                        onChange={() => handleCheckboxChange(applicant.application_id)}
                        checked={!!selectedApplicants[applicant.application_id]}
                    />
                    </td>
                </tr>
                ))}
            </tbody>
            </Table>
            
        ) : (
            <p>No applicants for this job yet.</p>
        )}
        <Button variant="secondary" onClick={() => window.history.back()}>
            Back
        </Button>
        <Button variant="primary" onClick={handleConfirmSelection}>
            Confirm Selection
        </Button>
    </div>
  );
};

export default JobDetails;