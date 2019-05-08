import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Product from './Product'

class Listing extends React.Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col><Product></Product>
                    </Col>
                    <Col>Price info
                    </Col>
                    <Col>Seller Rating
                    </Col>
                </Row>

                <Row>
                    Description
                </Row>
            </Container>
            //     <HeaderWithName></HeaderWithName>
            // <SearchBar></SearchBar> 
            // <ProductInfo>
            //     <Product></Product>  
            //     <CurrentPrice></CurrentPrice>
            //     <SellerRating></SellerRating>
            //     <ProductDescription> 
            // </ProductInfo>
        )
    }
}

export default Listing;