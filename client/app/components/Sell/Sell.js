import React, { Component } from 'react'
// import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Row, Col, Container, InputGroup, FormControl, Alert } from 'react-bootstrap'
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css' // If using WebPack and style-loader.
import Files from "react-butterfiles";
const addSubtractDate = require("add-subtract-date");
import axios from 'axios'
import Confirmation from '../Apply/Confirmation'

class Sell extends Component {
    constructor(props) {
        super(props)
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
            seller: props.userID,
            price:'',
            sellAlert: false,
            sellAlertMessage: '',
            sellAlertVariant: '',
            submitted: false
        }
    }

    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submit = e => {
        e.preventDefault();
        axios.post('/api/listing/create', {
            name: this.state.name,
            description: this.state.description,
            auction: this.state.auction,
            price: this.state.price,
            endtime: this.state.endtime,
            image: this.state.image,
            friendDiscount: this.state.friendDiscount,
            seller: this.state.seller
        }).then(res => {
            console.log(res.data.success)
            switch (res.data.success) {
                case false:
                    this.setState({
                    sellAlert: true,
                    sellAlertMessage: res.data.message,
                    sellAlertVariant: 'danger'
                    })
                break;
                case true:
                  this.setState({
                    sellAlert: true,
                    sellAlertMessage: res.data.message,
                    sellAlertVariant: 'success',
                    submitted: true
                  })
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

    setTime = (length) => {
        var current = new Date();
        let endtime = addSubtractDate.add(current, length, "days")
        this.setState({
            endtime: endtime
        })
    }

    calculateTime = e => {
        let length = e.target.value
        setTime(length[0]); 
    }

    componentDidMount() {
        this.setTime(3); 
    }


    render() {
        let { sellAlert,
            sellAlertMessage,
            sellAlertVariant, submitted } = this.state;
        
        const handleHide = () => this.setState({ applyAlert: false })

        if (submitted) {   
            return (
                <Confirmation></Confirmation>
            )
        }

        return (
            <Container>
                <Row className="justify-content-center mt-5">
                    <h3>Sell an Item</h3>
                </Row>
                <Alert onClose={handleHide} show={sellAlert} dismissible variant={sellAlertVariant}>
                {sellAlertMessage}
                </Alert>
                <Form onSubmit={this.submit}>
                <Row >
                    <Col xs lg="8">
                    
                        <Form.Group controlId="formGroupTitle">
                            <Form.Label>Listing Title:</Form.Label>
                            <Form.Control onChange={this.change} name="name" type="text" placeholder="Enter a descriptive title" />
                        </Form.Group>
                        <Form.Group controlId="exampleFormDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control onChange={this.change} placeholder="Enter a brief description" name="description" as="textarea" rows="3" />
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
                                <Form.Label>{(this.state.auction)? 'Starting Price' : 'Fixed Price'}</Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl onChange={this.change} name="price" placeholder={(this.state.auction)? 'Starting Price' : 'Fixed Price'} aria-label="Starting Price" />
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
                            <Form.Control onChange={this.calculateTime} name="length" as="select">
                                <option>3 days</option>
                                <option>5 days</option>
                                <option>7 days</option>
                                <option>10 days</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formGroupDiscount">
                            <Form.Label>Friend Discount:</Form.Label>
                            <Form.Control onChange={this.change} name="friendDiscount" type="number" placeholder="Provide friend discount" />
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