
import React, { Component } from 'react';
import { Col, Row, Button, ButtonToolbar, Container, Table } from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs'
import TabContainer from 'react-bootstrap/TabContainer'
import TabPane from 'react-bootstrap/TabPane'
import axios from 'axios'

class UserManagement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            decision: '',
            applicationApproved: ''
        }
    }

    componentDidMount() {
        this.props.getUsers()
    }

    // updateApplication = () => {
    //     axios.put(`/api/account/apply/${this.state.id}/${this.state.decision}`)
    //     .then( res => {
    //         switch(res.data.success) {
    //             case true:
    //                 this.setState({
    //                     id: '',
    //                     decision: '',
    //                     applicationApproved: res.data.data
    //                 }, this.props.getApplications());
    //                 if ((this.state.applicationApproved.status) == 'approved') {
    //                     this.createUserFromApplication()
    //                 }
    //                 break;
    //             case false:
    //                console.log(res.data.message);
    //                break; 
    //         }
    //     })
    // }

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
            users
        } = this.props

        return (
            <Container>
                <Row> <h3>Manage Users</h3></Row>
                <Row>
                    <Col>
                        {
                            users.slice(0).reverse().map(user => {
                                return (
                                <Container key={user._id}>
                                    <Row className="mt-3">
                                    <h5>User: {user.userName} </h5>
                                    
                                    <Button type="button" name={user._id} value="suspended" onClick={this.click} className="ml-3" variant="warning" size="sm">Suspend User</Button> 
                                    <Button type="button" name={user._id} value="blocked" onClick={this.click} className="ml-3" variant="danger" size="sm">Block Person</Button> 

                                    </Row>
                                    <Row>
                                    <Table className="mt-3" responsive>
                                        <tbody>
                                            <tr>
                                                <th>Status</th>
                                                <td>{user.status}</td>
                                            </tr>
                                            {(user.firstName)?
                                            <tr>
                                                <th>First Name</th>
                                                <td>{user.firstName}</td>
                                            </tr> : null }

                                            <tr>
                                                <th>Last Name</th>
                                                <td>{user.lastName}</td>
                                            </tr>

                                            <tr>
                                                <th>Username</th>
                                                <td>{user.userName}</td>
                                            </tr>


                                            <tr>
                                                <th>Email</th>
                                                <td>{user.email}</td>
                                            </tr>

                                            <tr>
                                                <th>Phone</th>
                                                <td>{user.phone}</td>
                                            </tr>
                                            {(user.address)? 
                                            <tr>
                                                <th>Address</th>
                                                <td>{user.address.street}</td>
                                            </tr> : null}
                                            {(user.address)? 
                                            <tr>
                                                <th>City</th>
                                                <td>{user.address.city}</td>
                                            </tr> : null }

                                            {(user.address)? 
                                            <tr>
                                                <th>State</th>
                                                <td>{user.address.state}</td>
                                            </tr> : null }

                                            {(user.address)? 
                                            <tr>
                                                <th>Zip</th>
                                                <td>{user.address.zip}</td>
                                            </tr> : null }

                                            <tr>
                                                <th>Credit Card</th>
                                                <td>{`****-****-****-${user.creditCard.slice(user.creditCard.length-4)}`}</td>
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



export default UserManagement;