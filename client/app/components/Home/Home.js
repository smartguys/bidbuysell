import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Container, Grid, Row, Col } from 'react-bootstrap';
import SearchBar from '../Search/Search'
import Recommendation from '../Recommendation/Recommendation'
import Listing from '../Listing/Listing'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      query: ''
    }

  }

  change = e => {
    this.setState({
        [e.target.name]: e.target.value
    })
}

  submit = e => {
      e.preventDefault();
      this.props.history.push({
          pathname: '/search',
          query: this.state.query
        })
  }



  render() {
    let title = {
      marginLeft: 'auto', 
      marginRight: 'auto',
      fontSize: '72px', 
      color: '#007bff',
      weight: 'Bold'
    }
    
    return (
      <Container>
        <Row>
          <h1 style={title}>BidBuySell</h1>
        </Row>
        <Row>
          <SearchBar change={this.change} submit={this.submit}></SearchBar>
        </Row>
        <Row>
          <Recommendation></Recommendation>
        </Row>
      </Container>

    );

  }
}

export default Home;
