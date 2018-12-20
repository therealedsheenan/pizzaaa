import React from 'react';
import { Grid } from 'semantic-ui-react';

import Pizza from './components/Pizza';
import Cart from './components/Cart';
import Total from './components/Total';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

const App = () => (
  <Grid celled="internally">
    <Grid.Row className="App" celled="internally">
      <Grid.Column width={4}>
        <Pizza />
        <Total />
      </Grid.Column>
      <Grid.Column width={12} className="cart">
        <Cart />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default App;
