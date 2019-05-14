import React, { Component } from 'react'
// import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Row, Col, Container, InputGroup, FormControl } from 'react-bootstrap'
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css' // If using WebPack and style-loader.
import Files from "react-butterfiles";
const addSubtractDate = require("add-subtract-date");
import axios from 'axios'

class Sell extends Component {
    constructor() {
        super()
        this.state = {
            tags: [],
            files: [],
            errors: [],
            name: '',
            description: '',
            auction: false,
            endtime: '',
            image: '',
            friendDiscount: '',
            seller: '',
            length: ''
        }
    }

    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submit = e => {
        e.preventDefault();
        var d = new Date();
        d = addSubtractDate.add(d, this.state.length, "days")
        console.log("date",d)
        axios.post('/api/listing/create', {
            name: this.state.name,
            description: this.state.description,
            auction: this.state.auction,
            endtime: d,
            image: this.state.image,
            friendDiscount: this.state.friendDiscount,
            seller: this.state.seller
        }).then(res => {
            switch (res.data.success) {
                case false:
                  console.log("failed")
                  break;
                case true:
                console.log("submitted")

                  break;
              }
        })
      }

    handleChange = (tags) => {
        this.setState({ tags })
    }

    checkChange = () => {
        this.setState({
            auction: !(this.state.auction)
        })
    }


    render() {
        var d = new Date();
        console.log(addSubtractDate.add(d, 2, "days"))

        return (
            <Container>
                <Row className="justify-content-center mt-5">
                    <h3>Sell an Item</h3>
                </Row>
                <Form onSubmit={this.submit}>
                <Row >
                    <Col xs lg="8">
                    
                        <Form.Group controlId="formGroupTitle">
                            <Form.Label>Listing Title:</Form.Label>
                            <Form.Control name="name" type="text" placeholder="Enter a descriptive title" />
                        </Form.Group>
                        <Form.Group controlId="exampleFormDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control placeholder="Enter a brief description" name="description" as="textarea" rows="3" />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.Categories">
                            <Form.Label>Categories</Form.Label>
                            <Form.Control as="select">
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
                                            name="auction"
                                            onChange={this.checkChange} 

                                        />
                                    </div>))}
                                <Form.Label>Starting Price:</Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl name="price" placeholder="Starting price" aria-label="Starting Price" />
                                </InputGroup>


                            </Col>
                            <Col>
                                <Form.Label>Upload Images:</Form.Label>

                                <Files
                                    multiple={true}
                                    maxSize="2mb"
                                    multipleMaxSize="10mb"
                                    multipleMaxCount={3}
                                    accept={["image/png", "image/jpg", "image/jpeg"]}
                                    onSuccess={files => this.setState({ files })}
                                    onError={errors => this.setState({ errors })}
                                >
                                    {({ browseFiles, getDropZoneProps }) => (
                                        <>
                                            <div {...getDropZoneProps({ className: "myDropZone" })} />
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
                    <Form.Group controlId="exampleFormListingLength">
                            <Form.Label>Listing Length</Form.Label>
                            <Form.Control name="length" as="select">
                                <option>3 days</option>
                                <option>5 days</option>
                                <option>7 days</option>
                                <option>10 days</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formGroupDiscount">
                            <Form.Label>Friend Discount:</Form.Label>
                            <Form.Control name="friendDiscount" type="number" placeholder="Provide friend discount" />
                        </Form.Group>

                        <Form.Group controlId="formGroupTags">
                            <Form.Label>Tags:</Form.Label>
                        </Form.Group>
                        <TagsInput value={this.state.tags} onChange={this.handleChange} />
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Button style={{ marginLeft: '5px' }} type="submit" variant="primary">Submit Listing</Button>
                </Row>
                </Form>
            </Container>
        );
    }
}

export default Sell; 