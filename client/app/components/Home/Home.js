import React, { Component } from 'react';
import 'whatwg-fetch';
import Button from 'react-bootstrap/Button';
import { Container, Grid, Row, Col } from 'react-bootstrap';
import SearchBar from '../Search/Search'
import Recommendation from '../Recommendation/Recommendation'
import Listing from '../Listing/Listing'
import { getJwt } from '../../helpers/getjwt'
import Axios from 'axios'

class Home extends Component {
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
      console.log(res); 
    }).catch(err => {
        this.props.history.push('/Login')
        localStorage.removeItem('cool-jwt')
      }
      )
  }
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
          <SearchBar></SearchBar>
        </Row>
        <Row>
          <Recommendation></Recommendation>
        </Row>
      </Container>

    );

  }
}

export default Home;
