import React, { Component } from 'react';
import { Col, Row, Button, InputGroup, FormControl, Nav } from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab'
import TabContainer from 'react-bootstrap/TabContainer'
import TabPane from 'react-bootstrap/TabPane'



// Where we start: My Account Overview Page
class MyAccount extends React.Component {
    constructor(props, context) {
        super(props, context);
        console.log(this.props.match.params.id)
    }
    render() {
        return(
            "hello"
        )
    }
}

export default MyAccount;