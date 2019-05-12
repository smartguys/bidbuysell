import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Form, FormControl } from 'react-bootstrap';
import { Container, Grid, Row, Col } from 'react-bootstrap';

const HeaderWithName = () => (
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
          <Nav.Link href="/home">Buy</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/sell">
          <Nav.Link eventKey="link-1">Sell</Nav.Link>
          </Link>
        </Nav.Item>
        <Link to='/login'>
          <Button style={{ marginLeft: '5px' }} variant="primary">Log in</Button>
        </Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>


);

export default HeaderWithName;