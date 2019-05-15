
import React, { Component } from 'react';
import { Col, Row, Button, InputGroup, FormControl, Nav, Tab, Container } from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs'
//import TabPane from 'react-bootstrap/TabPane'
import AppManagement from './AppManagement';
import UserManagement from './UserManagement';
import ListingManagement from './ListingManagement';
import TransactionsManagement from './TransactionsManagement';
import MessageThreadManagement from './MessageThreadManagement';
//import Messages from MyAccount;

class Admin extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            key: 'overview',
        };
    }

    render() {
        return (
            <Container fluid={true}>
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
                            <Nav.Item>
                                <Nav.Link eventKey="messagethreads">Message Threads</Nav.Link>
                            </Nav.Item>

                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="apps">
                                <AppManagement/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="users">
                            <UserManagement/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="listings">
                                <ListingManagement/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="transactions">
                                <TransactionsManagement/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="messagethreads">
                                <MessageThreadManagement/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
</Container>
            // <Tab.Container id="admin" defaultActiveKey="overview">
            //     <Row>
            //         <Col sm={3}>
            //             <Nav variant="pills" className="flex-column">
            //                 <Nav.Item>
            //                     <Nav.Link eventKey="overview">Overview</Nav.Link>
            //                 </Nav.Item><Nav.Item>
            //                 <Nav.Link eventKey="apps">Application Management</Nav.Link>
            //                 </Nav.Item><Nav.Item>
            //                     <Nav.Link eventKey="users">User Management</Nav.Link>
            //                 </Nav.Item><Nav.Item>
            //                     <Nav.Link eventKey="listings">Listings Management</Nav.Link>
            //                 </Nav.Item><Nav.Item>
            //                     <Nav.Link eventKey="transactions">Transactions</Nav.Link>
            //                 </Nav.Item> 
            //             </Nav>
            //         </Col>

            //         <Col sm={9}>
            //             <Tab.Content>
            //                 <Tab.Pane eventKey="overview">
            //                     {/* <Overview/> */}
            //                 </Tab.Pane>

            //                 <Tab.Pane eventKey="apps">
            //                     <AppManagement />
            //                 </Tab.Pane>

            //                 <Tab.Pane eventKey="users">
            //                     <UserManagement/>
            //                 </Tab.Pane>

            //                 <Tab.Pane eventKey="listings">
            //                     <ListingManagement />
            //                 </Tab.Pane> 



            //                 <Tab.Pane eventKey="transactions">
            //                     <TransactionsManagement />
            //                 </Tab.Pane> 




            //             </Tab.Content>
            //         </Col>
            //     </Row>
            // </Tab.Container>
  );
    }
}

export default Admin;
