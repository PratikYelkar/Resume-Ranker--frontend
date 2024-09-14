import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal } from 'react-bootstrap';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ContentCopy } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MyVacancies = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state
  const recruiterDetails = JSON.parse(localStorage.getItem('recruiter'));
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch all jobs using Axios
    const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000'; 
    axios.get(`${baseURL}/recruiter/jobs/${recruiterDetails.id}/`)
      .then(response => {
        setJobs(response.data);
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
      });
  }, [recruiterDetails.id]);

  useEffect(() => {
    const fetchApplicationCount = async (jobId) => {
      try {
        const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';
        const response = await axios.post(`${baseURL}/recruiter/job/getapplicationcount/${recruiterDetails.id}/${jobId}/`);
        updateApplicationCount(jobId, response.data.applicant_count);
      } catch (error) {
        console.error('Error fetching applicant count:', error);
      }
    };

    // Fetch application count for each job
    if (jobs.length > 0) {
      jobs.forEach(job => {
        if (typeof job.applicant_count === 'undefined') {
          fetchApplicationCount(job.job_id);
        }
      });
    }
  }, [jobs, recruiterDetails.id]);

  const updateApplicationCount = (jobId, count) => {
    setJobs(prevJobs => prevJobs.map(job => job.job_id === jobId ? { ...job, applicant_count: count } : job));
  };

  const handleView = (jobId) => {
    // Find the selected job from the jobs array
    const job = jobs.find(job => job.job_id === jobId);
    setSelectedJob(job);
    setShowModal(true);
  };

  const ViewApplicants = (jobId) => {
    // Navigate to JobDetails page
    navigate(`/recruiter/job-details/${jobId}`);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEdit = (jobId) => {
    // Implement logic to edit job
    console.log('Edit Job:', jobId);
  };


  const handleDelete = async (jobId) => {
    try {
      setLoading(true); // Set loading to true before making the request
  
      const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000'; // Change this to your actual baseURL;
      const response = await axios.post(`${baseURL}/recruiter/job/delete/${recruiterDetails.id}/${jobId}/`);
  
      console.log(response);
  
      if (response.status === 204) {
        alert('Job deleted successfully');
        // Update the job list after successful deletion
        setJobs(jobs.filter(job => job.job_id !== jobId));
      } else {
        alert('Failed to delete job');
      }
    } catch (error) {
      // Handle error
      alert(`Error deleting job: ${error.response ? error.response.data.error : error.message}`);
    } finally {
      setLoading(false); // Set loading to false after request completion
    }
  };
  

  const applyURL = 'http://localhost:3000/apply';
  const copyUrlToClipboard = () => {
    const url = `${applyURL}/${selectedJob.job_id}`;

    // Use navigator.clipboard.writeText to copy the URL to the clipboard
    navigator.clipboard.writeText(url)
      .then(() => {
        console.log('URL copied to clipboard:', url);
        // Optionally, you can provide feedback to the user
        alert('URL copied to clipboard!');
      })
      .catch((error) => {
        console.error('Unable to copy URL to clipboard', error);
      });
  };

  return (
    <div>
      <h1>Vacancies</h1>
      {loading && <div className="loader">Loading...</div>}
      {jobs.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr className='bg-success'>
              <th>Sr.</th>
              <th>Job ID</th>
              <th>Job Title</th>
              <th>Action</th>
              <th>Applicants</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={job.job_id}>
                <td>{index + 1}</td>
                <td>{job.job_id}</td>
                <td>{job.title}</td>
                <td>
                  <Button variant="primary" onClick={() => handleView(job.job_id)}>
                    <VisibilityIcon />
                  </Button>{' '}
                  <Button variant="success" onClick={() => handleEdit(job.job_id)}>
                    <EditIcon />
                  </Button>{' '}
                  <Button variant="danger" onClick={() => handleDelete(job.job_id)}>
                    <DeleteIcon />
                  </Button>
                </td>
                <td>
                  <Button className="btn btn-info rounded" variant="link" onClick={() => ViewApplicants(job.job_id)}>
                    {job.applicant_count}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No jobs Available Currently.</p>
      )}

      {/* Modal for displaying job details */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Job Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedJob && (

          <Table striped bordered hover responsive>
            <tbody>
            <tr>
                <td>Application Link:</td>
                <td className='text-primary' onClick={copyUrlToClipboard}>
                  {`${applyURL}/${selectedJob.job_id}`}
                  <IconButton aria-label="copy">
                    <ContentCopy>Copy URL</ContentCopy>
                  </IconButton>
                </td>
              </tr>
              <tr>
                <td>Job ID:</td>
                <td>{selectedJob.job_id}</td>
              </tr>
              <tr>
                <td>Title:</td>
                <td>{selectedJob.title}</td>
              </tr>
              <tr>
                <td>Description:</td>
                <td>{selectedJob.description}</td>
              </tr>
              <tr>
                <td>Skills:</td>
                <td>{selectedJob.skills}</td>
              </tr>
              <tr>
                <td>Experience:</td>
                <td>{selectedJob.experience}</td>
              </tr>
              <tr>
                <td>Openings:</td>
                <td>{selectedJob.no_of_openings}</td>
              </tr>
              <tr>
                <td>Deadline:</td>
                <td>{selectedJob.deadline}</td>
              </tr>
            </tbody>
          </Table>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleEdit}>
          Edit
        </Button>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
  );
};

export default MyVacancies;
