import React, { Component } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

class ProductImage extends React.Component {
    render() {
        return(
            <Container>
                <Col xs={6} md={4}>
                <Image src="holder.js/171x180" rounded />
                </Col>
            </Container>
            )
        }
    }

export default ProductImage;