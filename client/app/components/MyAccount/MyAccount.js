
import React, { Component } from 'react';
import { Col, Row, Button, InputGroup, FormControl, Nav, Tab, Container } from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs'
import axios from 'axios'
import ProfileManagement from './ProfileManagement';
import BuyingManagement from './BuyingManagement';
import SellingManagement from './SellingManagement'

// Where we start: My Account Overview Page
class MyAccount extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            key: 'overview',
        };
        console.log(this.props.match.params.id)
    }

    render() {
        console.log('myaccount')
        console.log(this.props)
        return (
            <Tab.Container id="account" defaultActiveKey="overview">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="profile">Profile</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="buying">Buying</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="selling">Selling</Nav.Link>
                            </Nav.Item> <Nav.Item>
                                <Nav.Link eventKey="messages">Messages</Nav.Link>
                            </Nav.Item> <Nav.Item>
                                <Nav.Link eventKey="transactions">Transactions</Nav.Link>
                            </Nav.Item> <Nav.Item>
                                <Nav.Link eventKey="friends">Friends</Nav.Link>
                            </Nav.Item> <Nav.Item>
                                <Nav.Link eventKey="edit">Edit Profile</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>

                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="profile">
                                {/* <Overview /> */}
                                <ProfileManagement userId={this.props.userId}/>
                            </Tab.Pane>
                            
                            
                            <Tab.Pane eventKey="buying">
                                {/* <Buying /> */}
                                <BuyingManagement userId={this.props.userId}/>
                            </Tab.Pane>

                            <Tab.Pane eventKey="selling">
                                {/* <Selling /> */}
                                <SellingManagement userId={this.props.userId} />
                            </Tab.Pane> 
                            
                            <Tab.Pane eventKey="messages">
                                {/* <Messages /> */}
                            </Tab.Pane> 
                            
                            <Tab.Pane eventKey="transactions">
                                {/* <Transactions /> */}
                            </Tab.Pane> 
                            
                            <Tab.Pane eventKey="friends">
                                {/* <Friends /> */}
                            </Tab.Pane> 
                            
                            <Tab.Pane eventKey="edit">
                                {/* <Edit /> */}
                            </Tab.Pane>


                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        );
    }
    // render() {
    //     return(
    //         "hello"
    //     )
    // }
}

export default MyAccount;