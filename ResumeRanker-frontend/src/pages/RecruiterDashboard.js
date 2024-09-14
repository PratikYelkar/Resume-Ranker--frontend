import React, { Component } from 'react'
import { Container } from 'react-bootstrap';
import MyVacancies from '../components/Recruiter/MyVanancies';
export default class RecruiterDashboard extends Component {
  render() {
    
  document.title = "Resume Ranker | Recruiter Dashboard";
    return (
    <Container className='shadow pt-4 mt-4 justify-content-center '>
        {/* <h1>Welcome {JSON.parse(localStorage.getItem('recruiter')).first_name}</h1> */}
        <MyVacancies />
    </Container>
    )
  }
}
