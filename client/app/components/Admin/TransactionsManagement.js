import React, { Component } from 'react';
import { Container, Col, Row, Button, InputGroup, Form, FormControl, Table } from 'react-bootstrap'
import axios from 'axios'

class TransactionsManagement extends Component {
    constructor(props) {
        super(props)
        this.state = {
            transactions: [],
            id: ''
        }
    }

    getTransactions = () => {
        console.log("getting transactions")
        axios.get(`api/transaction/user/${this.state.id}`).then(res => {
            switch (res.data.success) {
                case true:
                    this.setState({
                        transactions: res.data.data.transactions
                    }, () => console.log(this.state.transactions))
                    break;
                case false:
                    console.log(res.data.message);
                    break;
            }
        })
    }

    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submit = e => {
        e.preventDefault();
        this.getTransactions();
    }

    render() {
        let {
            transactions
        } = this.state

        return (
            <Container>
                <Row>
                    <h3>View Transactions</h3>
                </Row>

                <Row>
                    <Form onSubmit={this.submit}>
                        <Form.Label>User ID</Form.Label>
                        <Form.Control onChange={this.change} name="id" placeholder="User ID" />
                        <Button type="submit" className="mt-3" variant="warning">Search User</Button>
                    </Form>
                </Row>

                <Row>
                    <Table className="mt-3" responsive>
                        <thead>
                            <tr>
                                <th>Listing ID</th>
                                <th>Seller</th>
                                <th>Buyer</th>
                                <th>Final Price</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.slice(0).reverse().map(transaction => {
                                return (<tr key={transaction._id}>
                                <td>{transaction._id}</td>
                                <td>{transaction.seller}</td>
                                <td>{transaction.buyer}</td>
                                <td>${transaction.price}</td>
                                <td>{transaction.timestamp}</td>
                                </tr>)
                            }
                            )}
                        </tbody>
                    </Table>
                </Row>
            </Container>
        )
    }
}
export default TransactionsManagement;
