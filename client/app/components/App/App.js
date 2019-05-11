import React, { Component } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import {Button, ButtonToolbar} from 'react-bootstrap/Button';

const App = ({ children }) => (
  <>
    <Header />

    <main>
      {children}
    </main>
    <Footer></Footer>
  </>
);

export default App;
