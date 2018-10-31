/* eslint-disable */ 
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../scss/_Header.scss';
import logoBlack from '../resource/image/imd_logo_black.png';
import logoWhite from '../resource/image/imd_logo_white.png';
import $ from 'jquery';
import anime from 'animejs';
import image_prev from '../resource/image/back.png';

class Header extends Component {

  constructor(props) {
    super(props);
    const pathName = this.props.location.pathname;
    this.state = {
      position: pathName === '/' ? 'absolute' : 'relative',
      zIndex: pathName === '/' ? '1' : '0',
      color: pathName === '/' ? 'white' : 'black',
      pathName: pathName,
      more : this.props.more
    };
  }

  componentDidUpdate() {
    const pathName = this.props.location.pathname;
    if (this.state.pathName !== pathName) {
      this.setState({
        position: pathName === '/' ? 'absolute' : 'relative',
        zIndex: pathName === '/' ? '1' : '0',
        color: pathName === '/' ? 'white' : 'black',
        pathName: pathName
      })
    }

    if(this.state.more !== this.props.more){
      if(this.props.more)
        this.more();
      else
        this.moreClose();

        this.setState({
          more : this.props.more
        });
    }
  }

  more(){
    const opacityAnimationOption = {
      targets: ['.menu-items li'],
      opacity: [1, 0],
      duration: 800,
      easing: 'easeInOutQuart'
    }
    anime(opacityAnimationOption);

    const logoHideAnimationOption = {
      targets: '#logo-animation',
      top: ['0%', '100%'],
      duration: 800,
      delay : 3200,
      easing: 'easeInOutQuart'
    }
    anime(logoHideAnimationOption);

    const backShowAnimationOption = {
      targets: '#back-animation',
      top: ['-100%', '0%'],
      duration: 800,
      delay : 3500,
      easing: 'easeInOutQuart'
    }
    anime(backShowAnimationOption);
  }

  moreClose(){
    const opacityAnimationOption = {
      targets: ['.menu-items li'],
      opacity: [0, 1],
      duration: 800,
      delay : 2400,
      easing: 'easeInOutQuart'
    }
    anime(opacityAnimationOption);

    const backHideAnimationOption = {
      targets: '#back-animation',
      top: ['0%', '-100%'],
      duration: 800,
      delay : 3200,
      easing: 'easeInOutQuart'
    }
    anime(backHideAnimationOption);

    const logoShowAnimationOption = {
      targets: '#logo-animation',
      top: ['100%', '0%'],
      duration: 800,
      delay : 3500,
      easing: 'easeInOutQuart'
    }
    anime(logoShowAnimationOption);
  }

  popCart() {
    $('#disableScroll').css('position', 'fixed');
    $('#disableScroll').css('top', '0px');
    $('.Cart').show();
    const cart = anime({
      targets: '.Cart',
      right: '0px',
      opacity: [0, 1],
      duration: 800,
      easing: 'easeInOutQuart'
    });

    $('#transparent').show();
    const transparent = anime({
      targets: '#transparent',
      opacity: [0, 0.5],
      duration: 800,
      easing: 'easeInOutQuart'
    });
  }

  render() {
    const logo = this.props.location.pathname === '/' ? logoWhite : logoBlack;
    const headerStyle = {
      position: this.state.position,
      zIndex: this.state.zIndex
    }
    const menus = ['footage', 'about', 'work', 'contact', 'cart'];


    return (
      <div className="Header" style={headerStyle}>
        <div className="gnb-container">
          <div id="logo">
            <Link to="" id="logo-animation"><img id="logo-image" src={logo} alt="logo" /></Link>
            <div id="back-animation" onClick={()=>{this.props.setMore(false)}}><img id="back-image" src={image_prev} /></div>
          </div>
          <ul className="menu-items">
            {menus.map((value, key) => {
              const headerFontStyle = {
                color: this.state.color,
                fontFamily: "CamptonLight"
              }
              if (this.state.pathName === '/') {
                headerFontStyle.fontFamily = "CamptonBold";
              }
              else if (this.state.pathName.substr(1, this.state.pathName.length - 1) === value) {
                headerFontStyle.fontFamily = "CamptonBold";
              }

              if (value != 'cart')
                return <li key={key}><Link style={headerFontStyle} to={'/' + value}>{value}</Link></li>;
              else {
                headerFontStyle.cursor = 'pointer';
                return (
                  <li key={key}>
                    <span style={headerFontStyle} onClick={this.popCart}>{value}</span>
                    {this.props.cart.length != 0 ? <span className="l" id="badge">{this.props.cart.length}</span> : ''}
                      
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Header;
