import React, { Component } from 'react';
import { Container, Row, Col, Card, CardGroup } from 'react-bootstrap';

//Maybe make this into a card so that it includes the image and the description in one.
// And let it be its own column and the price/rating stuff goes in another.

class Product extends React.Component{
    render() {
        return (
            <div style={ { marginTop: '50px', paddingBottom: '50px'}}>
           
            <CardGroup>
                <Card bg="light">
                   
                    <Card.Body>
                        <Card.Title>Product Name</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Product Subtitle</Card.Subtitle>

                        <Card.Img variant="top" src="http://via.placeholder.com/640x360" />
                        <Card.Text>
                            The product description goes here.
                </Card.Text>
                    </Card.Body>
                 
                </Card>
            </CardGroup>
            </div>
        



    // {  <div>
          //  <h3>Product Name</h3>
           // <h4>Subtitle</h4>          
           //</div> } 
 
        )
    }
}
 

export default Product;