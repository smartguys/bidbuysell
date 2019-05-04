import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './Home'
import AuthenticatedComponent from './AuthenticationComponent';
import Login from './Login'
import Protected from './Protected'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path ="/" exact component = {Home}/>
        <Route path ="/Login" component = {Login}/>
        <AuthenticatedComponent>
          <Route path="/Protected" component = {Protected}/>
          </AuthenticatedComponent>
        
      </Switch>
    </BrowserRouter>
  );
}

export default App;
