import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Product from './Product'
//import ProductImage from './ProductImage';
import CurrentPrice from './CurrentPrice';
import BidAmount from './BidAmount';
import SellerInfo from './SellerInfo';
//import Description from './Description';
import SearchBar from '../Search/Search'

class Listing extends React.Component {
    render() {
        return (
            <Container fluid={true}>
                <Row className="mt-3">
                    <Col xs lg="8"><SearchBar></SearchBar></Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col>
                    </Col>

                    <Col>
                        <Row><SellerInfo></SellerInfo>
                        </Row>
                        
                        <Row><CurrentPrice></CurrentPrice>
                        </Row>    
                        
                        <Row><BidAmount></BidAmount>                       
                        </Row>
                 
                    </Col>              
              
            </Row>
            </Container>

        )
    }
}

export default Listing;