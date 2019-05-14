import React, { Component } from 'react';
import { Form, FormControl, Button, InputGroup } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom'

class SearchBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let {
            query
        } = this.props

        return (
            <div style={{ width: '100%' }}>
            <Form onSubmit={this.props.submit}>
                <InputGroup>
                    <Form.Control value={query} onChange={this.props.change} name="query" size="lg" type="text" placeholder="Search listings..." />
                    <InputGroup.Append>
                        <Button type="submit" variant="outline-secondary"><FaSearch /></Button>
                    </InputGroup.Append>

                </InputGroup>
            </Form>
            </div>

        );
    }
}

export default SearchBar;