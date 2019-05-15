import React from 'react';
import { render } from 'react-dom';

import './styles/styles.scss';
import './components/Router/RouterHandler'
import RouterHandler from './components/Router/RouterHandler';


render((
  <RouterHandler/>
), document.getElementById('app'));
