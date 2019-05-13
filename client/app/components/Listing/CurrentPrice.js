import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

class CurrentPrice extends React.Component {
    render() {
        return(
            <div style={ { marginTop: '50px', paddingBottom: '50px'}}>
             Price:$ (.prop here)
             <Button type="submit" variant="secondary">Buy Now</Button>
            </div>
        )
    }
}



export default CurrentPrice;