import React, { Component } from 'react';
import { Col, Row, Button, InputGroup, FormControl, Container, Table } from 'react-bootstrap';

class UserManagement extends Component {
    constructor(props){
        super(props);
    }
        
        //td format should be: <td>{user.id}</td>
        //.map((user, index))=> {
        //<tr key={index}>
        //<th scope="row">{index + 1}</th>
        
//Need Accordian kind of table of users. Cards?

            render() {
                return (
                    <Container>
                        <h5>Users</h5>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Date</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                    <th>City</th>
                                    <th>State</th>
                                    <th>Zip</th>
                                </tr>
                            </thead>
        
                            <tbody>
        
                                             
                                <tr>
                                    <td>user.id</td>
                                    <td>date</td>
                                    <td>user.firstName</td>
                                    <td>user.lastName</td>
                                    <td>user.username</td>
                                    <td>user.email</td>
                                    <td>user.phone</td>
                                    <td>user.address</td>
                                    <td>user.city</td>
                                    <td>user.state</td>
                                    <td>user.zip</td>
                                </tr>
                            
                                
                            </tbody>
                        </Table>
                   
            </Container>
        )
    }
}
export default UserManagement;