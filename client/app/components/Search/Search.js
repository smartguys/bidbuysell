import React, { Component } from 'react';
import { Form, FormControl, Button, InputGroup } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa';

class SearchBar extends React.Component {
    render() {
        return (
            <div style={ {width: '100%'}}>
                <InputGroup>
                    <Form.Control size="lg" type="text" placeholder="Search listings..." />
                    <InputGroup.Append>
                        <Button href='/listing' variant="outline-secondary"><FaSearch/></Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>

        );
    }
}

export default SearchBar;