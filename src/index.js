import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Main from './components/javascript/Main';
import Footage from './components/javascript/Footage';
import NoMatch from './components/javascript/NoMatch';
import About from './components/javascript/About';
import Checkout from './components/javascript/Checkout';
import Contact from './components/javascript/Contact';
import SignIn from './components/javascript/SignIn';
import Work from './components/javascript/Work';
import Header from './components/javascript/_Header'

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
  <Router>
    <div style={{height : '100%'}}>
      <Route component={Header} />
      <Switch>
        {/* <Route exact path='/' render={(props) => <Main {...props} isMain={true} />} /> */}
        <Route exact path="/" component={Main} />
        <Route path="/about" component={About} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/contact" component={Contact} />
        <Route path="/footage" component={Footage} />
        <Route path="/signin" component={SignIn} />
        <Route path="/work" component={Work} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
