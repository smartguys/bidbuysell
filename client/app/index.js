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
<<<<<<< HEAD

import Listing from './components/Listing/Listing';

import SellerInfo from './components/Listing/SellerInfo';
import CurrentPrice from './components/Listing/CurrentPrice';
import BidAmount from './components/Listing/BidAmount';

=======
import Listing from './components/Listing/Listing'
>>>>>>> e491701fb298e5736740989ef5fc6e751a4e673f
import './styles/styles.scss';
import Recommendation from './components/Recommendation/Recommendation';

render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/helloworld" component={HelloWorld}/>
        <Route path="/listing" component={Listing}/>
<<<<<<< HEAD
     


=======
>>>>>>> e491701fb298e5736740989ef5fc6e751a4e673f
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));
