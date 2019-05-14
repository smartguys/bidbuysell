
import React, { Component } from 'react';
import { Col, Row, Tab, Button, InputGroup, FormControl } from 'react-bootstrap'
import Tabs from 'react-bootstrap/Tabs'
import TabContainer from 'react-bootstrap/TabContainer'
import TabPane from 'react-bootstrap/TabPane'



// Where we start: My Account Overview Page
class MyAccount extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            key: 'overview',
        };
    }

    render() {
        return (

            <Tab.Container id="account" defaultActiveKey="overview">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="overview">Overview</Nav.Link>
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
                            <Tab.Pane eventKey="overview">
                                <Overview />
                            </Tab.Pane>
                            
                            
                            <Tab.Pane eventKey="buying">
                                <Buying />
                            </Tab.Pane>

                            <Tab.Pane eventKey="selling">
                                <Selling />
                            </Tab.Pane> 
                            
                            <Tab.Pane eventKey="messages">
                                <Messages />
                            </Tab.Pane> 
                            
                            <Tab.Pane eventKey="transactions">
                                <Transactions />
                            </Tab.Pane> 
                            
                            <Tab.Pane eventKey="friends">
                                <Friends />
                            </Tab.Pane> 
                            
                            <Tab.Pane eventKey="edit">
                                <Edit />
                            </Tab.Pane>


                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
  );
}
}

export default MyAccount;

        /*  
               <>
             <Tabs
               id="controlled-tab-example"
               activeKey={this.state.key}
               onSelect={key => this.setState({ key })}
             >
               <Tab eventKey="overview" title="Overview">
                 <Sonnet />
               </Tab>
               <Tab eventKey="profile" title="Profile">
                 <Sonnet />
               </Tab>
               <Tab eventKey="contact" title="Contact" disabled>
     
               <Tab eventKey="overview" title="Overview">
                 <Sonnet />
               </Tab>
               <Tab eventKey="overview" title="Overview">
                 <Sonnet />
               </Tab>
               <Tab eventKey="overview" title="Overview">
                 <Sonnet />
               </Tab>
               <Tab eventKey="overview" title="Overview">
                 <Sonnet />
               </Tab>
     
                 <Sonnet />
               </Tab>
             </Tabs>
          */


/*         My Account Buying Page

        My Account Selling Pageg

        My Account Messages Page

        My Account New Messages Page

        My Account Edit Profile Page: use a form that has the non editable things= FormControl= plaintext

        My Account Transaction History Page: use a table

        My Account Friends: Use a table with links on the names, a delete/message button 
        and add an input field underneath
 */