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
            <Container>
                <Row>
                    <Col><SearchBar></SearchBar></Col>
                    <Col></Col>
                </Row>
                <Row>
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
              
            </Row>
            </Container>


//  <Row><Description></Description></Row>
// <Col><ProductImage></ProductImage></Col>

            //     <HeaderWithName></HeaderWithName>
            // <SearchBar></SearchBar> 
            // <ProductInfo>
            //     <Product></Product>  
            //     <CurrentPrice></CurrentPrice>
            //     <SellerInfo></SellerInfo>
            //     <ProductDescription> 
            // </ProductInfo>
        )
    }
}

export default Listing;