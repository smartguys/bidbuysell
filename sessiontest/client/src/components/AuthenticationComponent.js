import React, { Component } from 'react'; 
import { getJwt } from './helpers/jwt'
import Axios from 'axios';
import { withRouter } from 'react-router-dom'

class AuthenticatedComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        user: undefined,
        valid: false
        }
    }

    componentDidMount() {
        const jwt = getJwt(); 
        console.log(this.props)
        if (!jwt) {
            console.log("here")
            this.props.history.push('/Login')
        }
        Axios.get('/', { headers: {
            Authorization: `Bearear ${jwt}`
        }}).then (res => 
            this.setState({
                "valid": true
            })).catch(err => {
                this.props.history.push('/Login')
                localStorage.removeItem('cool-jwt')
            }
               )
    }

    render() {
        if (this.valid === false) {
            return (
                <div>Loading..</div>
            )
        } 
        return (
            <div>
            {this.props.children}
            </div>
        )
    }
}

export default withRouter(AuthenticatedComponent)
