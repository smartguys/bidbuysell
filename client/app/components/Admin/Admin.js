
import React, { Component } from 'react';
import { Col, Row, Button, InputGroup, FormControl, Nav, Tab, Container } from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs'
//import TabPane from 'react-bootstrap/TabPane'
import AppManagement from './AppManagement';
import UserManagement from './UserManagement';
import ListingManagement from './ListingManagement';
import TransactionsManagement from './TransactionsManagement';
//import Messages from MyAccount;
import axios from 'axios'

class Admin extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            key: 'overview',
            applications: [],
            users: [],
            listings: []
        };
    }

    getApplications = () => {
        console.log("getting apps")
        axios.get('api/account/apply').then(res => {
            switch (res.data.success) {
                case true:
                    this.setState({
                        applications: res.data.data.applications
                    }, () => console.log(this.state.applications))
                    break;
                case false:
                    console.log(res.data.message);
                    break;
            }
        })
    }

    getUsers = () => {
        console.log("getting users")
        axios.get('api/account').then(res => {
            console.log(res.data)
            this.setState({
                users: res.data
            }, () => console.log(this.state.users))
        }
        )
    }

    getListings = () => {
        console.log("getting listings")
        axios.get('/api/listing/all').then(res => {
            switch (res.data.success) {
                case true:
                    this.setState({
                        listings: res.data.data.listings
                    }, () => console.log(this.state.listings))
                    break;
                case false:
                    console.log(res.data.message);
                    break;
            }
        })
    }

    render() {
        return (
            <Container className="mt-5" fluid={true}>
                <Tab.Container id="left-tabs-example" defaultActiveKey="apps">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="apps">Applications</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="users">Users</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="listings">Listings</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="transactions">Transactions</Nav.Link>
                                </Nav.Item>

                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="apps">
                                    <AppManagement applications={this.state.applications} getApplications={this.getApplications} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="users">
                                    <UserManagement users={this.state.users} getUsers={this.getUsers} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="listings">
                                    <ListingManagement  listings={this.state.listings} getListings={this.getListings} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="transactions">
                                    <TransactionsManagement />
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
        );
    }
}

export default Admin;
