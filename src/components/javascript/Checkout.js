/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../scss/Checkout.scss';
import backImage from '../resource/image/back.png';
import checkImage from '../resource/image/imd_icon_check.png';
import VideoInformation from '../resource/json/VideoInformation.json';
import anime from 'animejs';
import $ from 'jquery';


class Checkout extends Component {
  constructor(props) {
    super(props);
    console.log(this);
    console.log(this.props.match.params.id);
    const items = this.props.match.params.id === 'cart' ? this.props.cart : [this.props.match.params.id];
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      const data = VideoInformation.data[items[i]];
      total += parseInt(data.price);
    }
    this.state = {
      items: items,
      total: total
    };
  }

  componentDidMount() {
    $('#cart-check-absolute').width($('#cart').width());
    $('#cart-check-absolute').height($('#cart').height());
  }

  addToCartAnimation() {
    $('#cart-check-container').css('left', '0px');
    $('#cart-check-container').css('right', 'auto');
    $('#checkImg').css('opacity', 1);
    const cart = anime({
      targets: '#cart-check-container',
      width: ['0%', '100%'],
      backgroundColor: '#000000',
      duration: 800,
      easing: 'easeInOutQuart'
    });

    const self = this;
    cart.complete = () => {
      $('#cart-check-container').css('left', 'auto');
      $('#cart-check-container').css('right', '0px');
      anime({
        targets: '#cart-check-container',
        width: ['100%', '0%'],
        backgroundColor: '#000000',
        delay: 1000,
        duration: 800,
        easing: 'easeInOutQuart'
      });
      anime({
        targets: '#checkImg',
        opacity: 0,
        delay: 800,
        duration: 500,
        easing: 'easeInOutQuart'
      });
    }
  }

  itemRender() {
    const output = [];
    let total = 0;
    for (let i = 0; i < this.state.items.length; i++) {
      const data = VideoInformation.data[this.state.items[i]];
      output.push(
        <div key={'item_' + i} className="three-container">
          <div className="three-left"><img src={process.env.PUBLIC_URL + '/image/' + data.title + '.jpg'} /></div>
          <div className="three-center"><span className="b">{data.title}</span></div>
          <div className="three-right"><span className="l gray">{parseInt(data.price).toLocaleString() + ' krw'}</span></div>
        </div>
      );
    }
    return output;
  }
  render() {
    return (
      <div className="Checkout">
        <div className="marginContainer" id="container">
          <div id="sectionContainer">
            <div className="ib" id="section-left">
              <img src={backImage} onClick={this.props.history.goBack} id="back" />
            </div>
            <div className="ib" id="section-center">
              <p className="b" id="CheckoutText">Checkout</p>
              <p className="l gray title">items</p>
              <div id="itemContainer" className="three">
                {this.itemRender()}
              </div>
              <div id="itemTotal" className="three">
                <div className="three-container">
                  <div className="three-left"></div>
                  <div className="three-center"><span className="b">Total</span></div>
                  <div className="three-right"><span className="l gray">{this.state.total.toLocaleString() + ' krw'}</span></div>
                </div>
              </div>
            </div>
            <div className="ib" id="section-right">
              <p className="l gray title">payment</p>
              <div id="cardInformationContainer">
                <div className="underbar">
                  <p className="b margin0 ib">Card number</p>
                  <input className="b"></input>
                </div>
                <div className="underbar">
                  <p className="b margin0 ib">Exp date</p>
                  <input className="b"></input>
                </div>
                <div className="underbar">
                  <p className="b margin0 ib">CVC</p>
                  <input className="b"></input>
                </div>
              </div>

              <div className="button ib c" id="cart" onClick={this.addToCartAnimation}>
                <p className="b vc">buy</p>
                <div id="cart-check-container">
                  <div id="cart-check-absolute">
                    <img src={checkImage} id="checkImg" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Checkout;
