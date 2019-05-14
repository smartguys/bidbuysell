import React, { Component } from 'react';
import { Container, Row, Col, Card, CardGroup } from 'react-bootstrap';

//Maybe make this into a card so that it includes the image and the description in one.
// And let it be its own column and the price/rating stuff goes in another.

class Product extends React.Component{
    render() {
        let {
            name,
            description
        } = this.props.listing

        return (
           
            <CardGroup>
                <Card bg="light">
                   
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Product Subtitle</Card.Subtitle>

                        <Card.Img variant="top" src="http://via.placeholder.com/640x360" />
                        <Card.Text>
                        {description}
                </Card.Text>
                    </Card.Body>
                 
                </Card>
            </CardGroup>
        



    // {  <div>
          //  <h3>Product Name</h3>
           // <h4>Subtitle</h4>          
           //</div> } 
 
        )
    }
}
 

export default Product;