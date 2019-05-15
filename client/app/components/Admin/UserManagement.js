import React, { Component } from 'react';
import { Col, Row, Button, InputGroup, FormControl, Container, Table } from 'react-bootstrap';
import Feedback from 'react-bootstrap/Feedback';
import Rating from 'react-rating';

class UserManagement extends Component {
    constructor(props) {
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
                <h3>Users</h3>
              
                <Row>
                    <Col>

                        <Table responsive>
                            <tbody>
                                <tr>
                                    <th>Username</th>
                                    <td>app.username</td>
                                </tr>

                                <tr>
                                    <th>First Name</th>
                                    <td>app.firstName</td>
                                </tr>

                                <tr>
                                    <th>Last Name</th>
                                    <td>app.lastName</td>
                                </tr>

                                <tr>
                                    <th>Email</th>
                                    <td>app.email</td>
                                </tr>

                                <tr>
                                    <th>Phone</th>
                                    <td>app.phone</td>
                                </tr>

                                <tr>
                                    <th>Address</th>
                                    <td>app.address</td>
                                </tr>

                                <tr>
                                    <th>City</th>
                                    <td>app.city</td>
                                </tr>

                                <tr>
                                    <th>State</th>
                                    <td>app.state</td>
                                </tr>

                                <tr>
                                    <th>Zip</th>
                                    <td>app.zip</td>
                                </tr>

                                <tr>
                                    <th>Credit Card</th>
                                    <td>app.credit</td>
                                </tr>

                            </tbody>

                        </Table>
                    </Col>

                    <Col className="ml-4">
                        <Row>
                            <Rating></Rating>
                        </Row>
                        <Row></Row>
                        <Row> <Button variant="warning" size="sm">Suspend</Button>
                        </Row>
                        <Row><p></p></Row>
                        <Row> <Button variant="danger" size="sm">Block</Button>
                        </Row>

                    </Col>

                </Row>


















            </Container>
        )
    }
}


{/* <Table responsive>
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
</Table> */}

export default UserManagement;