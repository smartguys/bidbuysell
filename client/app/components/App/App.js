import React, { Component } from 'react';
import Header from '../Header/Header';
import HeaderWithName from '../Header/HeaderWithName';
import { Container } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      userName
     } = this.props
    

    const children = React.Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child, {
          index
      });
    });

    return (
      <Container fluid={true}>
        <HeaderWithName userName={userName}/>
        { children }
      </Container>
    )
  }
}

export default App;
