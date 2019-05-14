
import React, { Component } from 'react';
import { Col, Row, Button, InputGroup, FormControl, Container, Table } from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs'
import TabContainer from 'react-bootstrap/TabContainer'
import TabPane from 'react-bootstrap/TabPane'

//Could use just ID and Full Name as links to full info?

class AppManagement extends Component {

    constructor(props){
        super(props);
    }

//td format should be: <td>{app.id}</td>
//.map((app, index))=> {
//<tr key={index}>
//<th scope="row">{index + 1}</th>

    
    render() {
        return (
            <Container>
                <h5>Pending Applications</h5>
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
                            <th>Action</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>

                                     
                        <tr>
                            <td>app.id</td>
                            <td>date</td>
                            <td>app.firstName</td>
                            <td>app.lastName</td>
                            <td>app.username</td>
                            <td>app.email</td>
                            <td>app.phone</td>
                            <td>app.address</td>
                            <td>app.city</td>
                            <td>app.state</td>
                            <td>app.zip</td>
                            <td>
                                <a href="#"  title="Approve" data-toggle="tooltip"></a>
							    <a href="#" title="Deny" data-toggle="tooltip"></a></td>
                            <td></td>
                            
                        </tr>
                    
                        
                    </tbody>
                </Table>
         
            </Container>
        )
    }
}
export default AppManagement;