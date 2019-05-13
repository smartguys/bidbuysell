import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Form, FormControl } from 'react-bootstrap';

const Footer = () => (
  <Navbar fixed="bottom" bg="light" expand="lg">
  <Link to='/helloworld'>
    <Navbar.Brand>BidBuySell</Navbar.Brand>
  </Link>
</Navbar>
);

export default Footer;
