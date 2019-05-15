import React, { Component } from 'react';
import { Container, Col, Row, Button, InputGroup, FormControl } from 'react-bootstrap'
import { getUserThreads } from '../../helpers/api'


class MessageThreadManagement extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            key: 'overview',
            user: '5cda14ea6b14503b45cbd66d',
        };
    }

    componentDidMount() {
        this.load_threads();
    }

    load_threads = () => {
        getUserThreads(this.state.user, (res) => {
            console.log(res.data)
            this.setState({threads: res.data});
        });
    }

    threads_render = () => {
        return(
            this.state.threads
            ?   this.state.threads.map(thread => {
                    return(
                        <Row key={thread._id}>
                            ({thread._id})
                            ({thread.users.length})
                            ({thread.messages.length})
                            ({thread.messages.slice(-1)[0].date})
                        </Row>
                    )
                })
            :   null
        )
    }

    render() {
        return (
            <Container>
                 <Row>
                    <h3>Message Threads</h3>
                </Row>
                {this.threads_render()}
            </Container>
        )
    }
}
export default MessageThreadManagement;
