
import React, { Component } from 'react';
import { Col, Row, Button, ButtonToolbar, Container, Table } from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs'
import TabContainer from 'react-bootstrap/TabContainer'
import TabPane from 'react-bootstrap/TabPane'


class AppManagement extends Component {

    constructor(props) {
        super(props);
    }

    //td format should be: <td>{app.id}</td>
    //.map((app, index))=> {
    //<tr key={index}>
    //<th scope="row">{index + 1}</th>


    render() {
        return (
            <Container>
               <Row> <h3>Pending Applications</h3></Row>
                
                <Row>
                    <Col>

                        <Table responsive>
                            <tbody>
                                <tr>
                                    <th>Date</th>
                                    <td>app.date</td>
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
                                    <th>Username</th>
                                    <td>app.username</td>
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

                        <Row>  <Button variant="success" size="sm">Approve</Button>
                        </Row>
                        <Row><p></p></Row>
                        <Row> <Button variant="danger" size="sm">Deny</Button>
                        </Row>

                    </Col>

                </Row>
            </Container>
        )
    }
}



export default AppManagement;