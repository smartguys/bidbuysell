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

render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/helloworld" component={HelloWorld}/>
        <Route path="/listing" component={Listing}/>
        <Route path="/login" component={Login}/>
        <Route path="/apply" component={Application}/>
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));
