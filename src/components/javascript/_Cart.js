/* eslint-disable */ 
import React, { Component } from 'react';
import '../scss/_Cart.scss';
import image_x from '../resource/image/x.png';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import anime from 'animejs';
import VideoInformation from '../resource/json/VideoInformation.json';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

class Cart extends Component {

  // constructor(props) {
  //   super(props);
  // }

  componentDidUpdate() {
    let hideFlag = false;
    if(!$('.Cart').is(":visible")){
      $('.Cart').show();
      hideFlag = true;
    }

    const imageWidth = $('.photo-container').width();
    const height = imageWidth * 0.75;
    $('.photo-container').height(height);
    $('.title-container').height(height);
    $('.close-container').height(height);
    $('.price-container').height(height);

    if(hideFlag)
      $('.Cart').hide();
  }

  componentDidMount() {
    const imageWidth = $('.photo-container').width();
    const height = imageWidth * 0.75;
    $('.photo-container').height(height);
    $('.title-container').height(height);
    $('.close-container').height(height);
    $('.price-container').height(height);

    const cartWidth = $('.Cart').width();
    $('.Cart').css('right', -cartWidth);
  }

  removeCart(index) {
    console.log(this);
    this.props.removeCart(index);
  }

  closeCart() {
    const cartWidth = $('.Cart').width();
    $('#disableScroll').css('position', 'static');
    $('#disableScroll').css('top', '0px');

    anime({
      targets: '.Cart',
      right: -cartWidth,
      opacity : [1,0],
      duration: 800,
      easing: 'easeInOutQuart'
    });


    const transparent = anime({
      targets: '#transparent',
      opacity: [0.5, 0],
      duration: 800,
      easing: 'easeInOutQuart'
    });

    transparent.complete = () => {
      $('#transparent').hide();
      $('.Cart').hide();
    }
  }

  render() {
    let total = 0;
    return (
      <div className="Cart">
        <div className="marginContainer" style={{ height: '100%', overflowY: 'scroll' }}>
          <img src={image_x} id="close" onClick={this.closeCart} />
          <TransitionGroup id="item-root-container">
            {this.props.cart.map((value, index) => {
              total += parseInt(VideoInformation.data[value].price);
              return (
                <CSSTransition
                  key={index}
                  timeout={500}
                  classNames="fade"
                >
                  <div className="item-container">
                    <div className="photo-container">
                      <img src={process.env.PUBLIC_URL + '/image/' + VideoInformation.data[value].title + '.jpg'} className="photo" />
                    </div>
                    <div className="title-container">
                      <p className="b">{VideoInformation.data[value].title}</p>
                    </div>
                    <div className="close-container" onClick={() => { this.removeCart(value) }}>
                      <img src={image_x} />
                    </div>
                    <div className="price-container">
                      <p className="b">{parseInt(VideoInformation.data[value].price).toLocaleString() + ' krw'}</p>
                    </div>
                  </div>
                </CSSTransition>
              )
            })}
          </TransitionGroup>
          <div id="item-sum-container">
            <p className="b" id="total">Total</p>
            <p className="b" id="price">{total.toLocaleString() + ' krw'}</p>
          </div>
          <Link to="/checkout/cart" onClick={this.closeCart}> <div id="checkout">
            <p className="b">Checkout</p>
          </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default Cart;
