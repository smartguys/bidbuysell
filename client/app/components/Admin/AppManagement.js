
import React, { Component } from 'react';
import { Col, Row, Button, ButtonToolbar, Container, Table } from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs'
import TabContainer from 'react-bootstrap/TabContainer'
import TabPane from 'react-bootstrap/TabPane'
import axios from 'axios'

class AppManagement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            decision: '',
            applicationApproved: ''
        }
    }

    componentDidMount() {
        this.props.getApplications()
    }

    createUserFromApplication = () => {
        console.log("user create");
        axios.post('/api/account/signup', {
            firstName: this.state.applicationApproved.firstName,
            lastName: this.state.applicationApproved.lastName,
            userName: this.state.applicationApproved.userName,
            email: this.state.applicationApproved.email,
            address: this.state.applicationApproved.address,
            creditCard: this.state.applicationApproved.creditCard,
            phone: this.state.applicationApproved.phone,
            password: this.state.applicationApproved.userName
        }).then( res => {
            switch(res.data.success) {
                case true:
                    console.log(res.data.message)
                    break;
                case false:
                    console.log(res.data.message)
                    break; 
            }
        })
    }

    updateApplication = () => {
        axios.put(`/api/account/apply/${this.state.id}/${this.state.decision}`)
        .then( res => {
            switch(res.data.success) {
                case true:
                    this.setState({
                        id: '',
                        decision: '',
                        applicationApproved: res.data.data
                    }, this.props.getApplications());
                    if ((this.state.applicationApproved.status) == 'approved') {
                        this.createUserFromApplication()
                    }
                    break;
                case false:
                   console.log(res.data.message);
                   break; 
            }
        })
    }

    click = e => {
        console.log(e.target.name,e.target.value)
        e.preventDefault();
        this.setState({
            id: e.target.name,
            decision: e.target.value
        }, () => this.updateApplication())
    }

    render() {
        let {
            applications
        } = this.props

        return (
            <Container>
                <Row> <h3>Pending Applications</h3></Row>
                <Row>
                    <Col>
                        {
                            applications.slice(0).reverse().map(application => {
                                return (
                                <Container key={application._id}>
                                    <Row className="mt-3">
                                    <h5>Application for {application.firstName} {application.lastName} </h5>
                                    
                                    <Button type="button" name={application._id} value="approved" onClick={this.click} className="ml-3" variant="success" size="sm">Approve</Button>
                                    <Button type="button" name={application._id} value="rejected" onClick={this.click} className="ml-3" variant="danger" size="sm">Reject</Button>
                                    <Button type="button" name={application._id} value="blocked" onClick={this.click} className="ml-3" variant="danger" size="sm">Block Person</Button>

                                    </Row>
                                    <Row>
                                    <Table className="mt-3" responsive>
                                        <tbody>
                                            <tr>
                                                <th>Status</th>
                                                <td>{application.status}</td>
                                            </tr>
                                            <tr>
                                                <th>First Name</th>
                                                <td>{application.firstName}</td>
                                            </tr>

                                            <tr>
                                                <th>Last Name</th>
                                                <td>{application.lastName}</td>
                                            </tr>

                                            <tr>
                                                <th>Username</th>
                                                <td>{application.userName}</td>
                                            </tr>


                                            <tr>
                                                <th>Email</th>
                                                <td>{application.email}</td>
                                            </tr>

                                            <tr>
                                                <th>Phone</th>
                                                <td>{application.phone}</td>
                                            </tr>

                                            <tr>
                                                <th>Address</th>
                                                <td>{application.address.street}</td>
                                            </tr>

                                            <tr>
                                                <th>City</th>
                                                <td>{application.address.city}</td>
                                            </tr>

                                            <tr>
                                                <th>State</th>
                                                <td>{application.address.state}</td>
                                            </tr>

                                            <tr>
                                                <th>Zip</th>
                                                <td>{application.address.zip}</td>
                                            </tr>

                                            <tr>
                                                <th>Credit Card</th>
                                                <td>{`****-****-****-${application.creditCard.slice(application.creditCard.length-4)}`}</td>
                                            </tr>

                                        </tbody>

                                    </Table>
                                </Row>
                                </Container>
                                )

                            })
                        }
                    </Col>

                   

                </Row>
            </Container>
        )
    }
}



export default AppManagement;