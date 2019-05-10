import React, { Component } from 'react';
import { CardGroup, Card, Button } from 'react-bootstrap'

class Recommendation extends React.Component {
    render() {
        return (
            <div style={ { marginTop: '50px', paddingBottom: '50px'}}>
            <h5>Recommmended for You:</h5>
            <CardGroup>
                <Card>
                    <Card.Img variant="top" src="http://via.placeholder.com/640x360" />
                    <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                            This is a wider card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer.
                </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    <Card.Link href="#">Viewing Listing</Card.Link>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Img variant="top" src="http://via.placeholder.com/640x360" />
                    <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                            This card has supporting text below as a natural lead-in to additional
                  content.{' '}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    <Card.Link href="#">Viewing Listing</Card.Link>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Img variant="top" src="http://via.placeholder.com/640x360" />
                    <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                            This is a wider card with supporting text below as a natural lead-in to
                            additional content. This card has even longer content than the first to
                            show that equal height action.
                </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    <Card.Link href="#">Viewing Listing</Card.Link>
                    </Card.Footer>
                </Card>
            </CardGroup>
            </div>
        )
    }

}

export default Recommendation;
