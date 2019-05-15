import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Product from './Product'
import CurrentPrice from './CurrentPrice';
import BidAmount from './BidAmount';
import SellerInfo from './SellerInfo';
import SearchBar from '../Search/Search'

class Listing extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.match.params.id)
    }

    render() {
        return (
            <Container fluid={true}>
                <Row className="mt-3">
                    <Col xs lg="8"><SearchBar></SearchBar></Col>
                    <Col></Col>
                </Row>
                {/* <Row>
                    <Col><Product></Product>
                    </Col>

                    <Col>
                        <Row><SellerInfo></SellerInfo>
                        </Row>
                        
                        <Row><CurrentPrice></CurrentPrice>
                        </Row>    
                        
                        <Row><BidAmount></BidAmount>                       
                        </Row>
                 
                    </Col>              
              
            </Row> */}
            </Container>
        )
    }
}

export default Listing;