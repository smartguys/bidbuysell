import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Form, FormControl } from 'react-bootstrap';
import { Container, Grid, Row, Col } from 'react-bootstrap';
import { getJwt } from '../../helpers/getjwt'
import Axios from 'axios'

class HeaderWithName extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
    };
  }

  componentDidMount() {
    const jwt = getJwt();
    console.log(jwt)
    if (jwt) {
      Axios.get('/verify', {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }).then(res => {
        this.setState({
          userName: res.data.message.userName
        });
      }).catch(err => {
        localStorage.removeItem('cool-jwt')
      }
      )
    }
  }

  render() {
    const {
      userName
    } = this.state;

    return (
      <Navbar bg="light" expand="lg">
        <Link to='/'>
          <Navbar.Brand>BidBuySell</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          </Nav>
          <Nav className="justify-content-end" activeKey="/home">
            <Nav.Item>
              <Link to='/sell'><Navbar.Brand>Buy</Navbar.Brand></Link>
            </Nav.Item>
            <Nav.Item>
              <Link to='/sell'><Navbar.Brand>Sell</Navbar.Brand></Link>
            </Nav.Item>
            <Link to='/login'>
              <Button style={{ marginLeft: '5px' }} variant="primary">{(userName === '')? "Login" : "My Account"}</Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}


export default HeaderWithName;