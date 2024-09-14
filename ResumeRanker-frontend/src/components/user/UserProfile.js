import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import { Table } from 'react-bootstrap';
export default class UserProfile extends Component {
  render() {
    return (
    <Container className='shadow mt-5 p-3'>
        <h1>Hey, your profile is here.</h1>
        <Table striped bordered hover responsive>
            <tbody>              
              <tr>
                <td>Name</td>
                <td>{JSON.parse(localStorage.getItem('user')).first_name+ " "+JSON.parse(localStorage.getItem('user')).last_name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{JSON.parse(localStorage.getItem('user')).email}</td>
              </tr>
              <tr>
                <td>Password</td>
                <td>********</td>
              </tr>
              <tr>
                <td>Mobile No</td>
                <td>{JSON.parse(localStorage.getItem('user')).mobile_number}</td>
              </tr>              
            </tbody>
          </Table>
    </Container>
    )
  }
}