import React, { Component } from 'react';
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
import Header from './components/javascript/_Header';
import Detail from './components/javascript/Detail';
import Footer from './components/javascript/_Footer';
import Cart from './components/javascript/_Cart';
// ReactDOM.render(<App />, document.getElementById('root'));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      more : false
    }
    this.addCart = this.addCart.bind(this);
    this.removeCart = this.removeCart.bind(this);
    this.setMore = this.setMore.bind(this);
  }

  setMore(value){
    this.setState({
      more : value
    });
  }

  addCart(item) {
    if (this.state.cart.includes(item))
      return;
    this.setState(prevState => ({
      cart: [...prevState.cart, item]
    }));
  }

  removeCart(item) {
    const index = this.state.cart.indexOf(item);
    if (index > -1) {
      const array = [...this.state.cart];
      array.splice(index, 1);
      this.setState({
        cart : array
      });
    }
  }

  componentDidUpdate() {
    console.log(this);
  }

  render() {
    return (
      <Router>
        <div style={{ height: '100%' }}>
          <div id="transparent"></div>
          <div id="disableScroll">
            <Route render={(props) => <Header {...props} cart={this.state.cart} more={this.state.more} setMore={this.setMore}/>}/>
            <Switch>
              <Route exact path="/" component={Main} />
              <Route path="/about" component={About} />
              <Route path="/checkout/:id" render={(props) => <Checkout {...props} cart={this.state.cart}/>} />
              <Route path="/contact" component={Contact} />
              <Route path="/footage" component={Footage} />
              <Route path="/signin" component={SignIn} />
              {/* <Route path="/work" component={Work} /> */}
              <Route path='/work' render={(props) => <Work {...props} more={this.state.more} setMore={this.setMore} />} />
              <Route path='/detail/:id' render={(props) => <Detail {...props} addCart={this.addCart} />} />
              <Route component={NoMatch} />
            </Switch>
            <Route component={Footer} />
          </div>
          <Route render={(props) => <Cart {...props} cart={this.state.cart} removeCart={this.removeCart}/>} />
        </div>
      </Router>
    );
  }
};
ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
