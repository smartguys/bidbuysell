import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import App from './components/App/App';
import NotFound from './components/App/NotFound';
import Home from './components/Home/Home';
import HelloWorld from './components/HelloWorld/HelloWorld';
import Listing from './components/Listing/Listing'
import './styles/styles.scss';
import Recommendation from './components/Recommendation/Recommendation';
import Login from './components/Login/Login'
import Application from './components/Apply/Application'
import Sell from './components/Sell/Sell'
import SearchResults from './components/SearchResults/SearchResults';
import IndividualListing from './components/SearchResults/IndividualListing';
import LeaveFeedback from './components/Feedback/LeaveFeedback';
import Admin from './components/Admin/Admin';
import MyAccount from './components/Account/MyAccount';


render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/helloworld" component={HelloWorld}/>
        <Route path="/listing" component={Listing}/>
        <Route path="/login" component={Login}/>
        <Route path="/apply" component={Application}/>
        <Route path="/sell" component={Sell}/>
        <Route path="/search" component={SearchResults}/>
        <Route path="/individual" component={IndividualListing}/>
        <Route path="/feedback" component={LeaveFeedback}/>
        <Route path="/admin" component={Admin}/>
        <Route path="/myaccount" component={MyAccount}/>
      

        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));
