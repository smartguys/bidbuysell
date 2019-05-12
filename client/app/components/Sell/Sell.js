import React, { Component } from 'react'
// import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Row, Col, Container, InputGroup, FormControl } from 'react-bootstrap'
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css' // If using WebPack and style-loader.
import Files from "react-butterfiles";

class Sell extends Component {
    constructor() {
        super()
        this.state = { 
            tags: [],
            files: [],
            errors: []
        }
    }

    handleChange = (tags) => {
        this.setState({ tags })
    }

    render() {
        return (
            <Container>
                <Row className="justify-content-center mt-5">
                    <h3>Sell an Item</h3>
                </Row>
                <Row>
                    <Col xs lg="8">
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Listing Title:</Form.Label>
                            <Form.Control type="text" placeholder="Enter a descriptive title" />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows="3" />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect2">
                            <Form.Label>Categories</Form.Label>
                            <Form.Control as="select" multiple>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Form.Group>
                        <Row>
                            <Col>
                                {['checkbox'].map(type => (
                                    <div key={`custom-${type}`} className="mb-3">
                                        <Form.Check
                                            custom
                                            type={type}
                                            id={`custom-${type}`}
                                            label={`Auction Style`}

                                        />
                                    </div>))}
                                    <Form.Label>Starting Price:</Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl aria-label="Starting Price" />
                                </InputGroup>


                            </Col>
                            <Col>
                            <Form.Label>Upload Images:</Form.Label>

                            <Files
    multiple={true} 
    maxSize="2mb"
    multipleMaxSize="10mb"
    multipleMaxCount={3}
    accept={["image/png","image/jpg","image/jpeg"]}
    onSuccess={files => this.setState({ files })}
    onError={errors => this.setState({ errors })}
>
    {({ browseFiles, getDropZoneProps }) => (
        <>
            <div {...getDropZoneProps({ className: "myDropZone" })}/>
            <button onClick={browseFiles}>Select files...</button>
            <ol>
                {this.state.files.map(file => (
                    <li key={file.name}>{file.name}</li>
                ))}
                {this.state.errors.map(error => (
                    <li key={error.file.name}>
                        {error.file.name} - {error.type}
                    </li>
                ))}
            </ol>
        </>
    )}
</Files>
</Col>
                        </Row>

                    </Col>

                    <Col>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Tags:</Form.Label>
                        </Form.Group>
                        <TagsInput value={this.state.tags} onChange={this.handleChange} />
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Button style={{ marginLeft: '5px' }} variant="primary">Submit Listing</Button>
                </Row>
            </Container>
        );
    }
}

export default Sell; 