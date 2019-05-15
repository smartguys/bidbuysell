import { getJwt } from '../../helpers/getjwt'
import Axios from 'axios'
import React, { Component } from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import Home from '../Home/Home';
import Listing from '../Listing/Listing';
import Login from '../Login/Login';
import Application from '../Apply/Application';
import Sell from '../Sell/Sell';
import SearchResults from '../SearchResults/SearchResults';
import IndivudalListing from '../SearchResults/IndividualListing';
import LeaveFeedback from '../Feedback/LeaveFeedback';
import MyAccount from '../MyAccount/MyAccount';
import Admin from '../Admin/Admin';
import App from '../App/App'
import NotFound from '../App/NotFound'
import Test from '../../Test';


class RouterHandler extends Component {
    constructor(props) {
        super(props);

        this.state = {
          userName: '',
          userID: '',
          isAdmin: ''
        };
    }

    
  componentDidMount() {
    this.login()
  }

  login = () => {
    const jwt = getJwt();
    if (jwt) {
      Axios.get('/verify', {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }).then(res => {
        this.setState({
          userName: res.data.message.userName,
          userID: res.data.message.userID,
          isAdmin: res.data.message.isAdmin
        });

      }).catch(err => {
        localStorage.removeItem('cool-jwt')
      }
      )
    }
  }

  logout = () => {
    localStorage.removeItem('cool-jwt')
    this.setState({
      userName: ''
    })
  }

    render() {
      const {
        userName,
        userID,
        isAdmin
      } = this.state; 

    return(
    <Router>
    <App userName={userName} login={this.login} logout={this.logout} isAdmin={isAdmin}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/listing/:id" render={(props) => <Listing {...props} userID={userID}/>} />
        <Route path="/login" render={(props) => <Login {...props} userName={userName} login={this.login}/>} />
        <Route path="/apply" component={Application}/>
        <Route path="/sell"  render={(props) => <Sell {...props} userID={userID}/>} />
        <Route path="/search" component={SearchResults}/>
        <Route path="/individual" component={IndivudalListing}/>
        <Route path="/feedback" component={LeaveFeedback}/>
        <Route path="/myaccount" component={(isAdmin)? Admin : MyAccount}/>
        <Route path="/test" component={Test}/>
        {(isAdmin)? <Route path="/admin" render={(props) => <Admin {...props} isAdmin={isAdmin} userID={userID}/>}/> : null }
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
    )
}
}

export default RouterHandler;

