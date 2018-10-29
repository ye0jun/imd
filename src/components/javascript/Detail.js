/* eslint-disable */ 
import React, { Component } from 'react';
import '../scss/Detail.scss';
import VideoInformation from '../resource/json/VideoInformation.json';
import Plyr from 'plyr';
import $ from 'jquery';
import anime from 'animejs';
import checkImage from '../resource/image/imd_icon_check.png'
import backImage from '../resource/image/back.png'
import { Link } from 'react-router-dom'

class Detail extends Component {

  constructor(props) {
    super(props);
    // this.props.match.params.id

    this.addToCartAnimation = this.addToCartAnimation.bind(this);
  }

  componentDidMount() {
    const player = new Plyr('#player', {
      // controls : ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen']	
    });

    $('#cart-check-absolute').width($('#cart').width());
    $('#cart-check-absolute').height($('#cart').height());
    this.videoSetting();
  }

  videoSetting() {
    $('.plyr, .plyr__video-wrapper, video').height('100%');
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
      self.props.addCart(self.props.match.params.id);
      $('#cart-check-container').css('left', 'auto');
      $('#cart-check-container').css('right', '0px');
      anime({
        targets: '#cart-check-container',
        width: ['100%', '0%'],
        backgroundColor: '#000000',
        delay : 1000,
        duration: 800,
        easing: 'easeInOutQuart'
      });
      anime({
        targets: '#checkImg',
        opacity : 0,
        delay : 800,
        duration: 500,
        easing: 'easeInOutQuart'
      });
    }
  }

  render() {
    const data = VideoInformation.data[this.props.match.params.id];
    return (
      <div className="Detail">
        <div className="marginContainer" id="container">
          <div id="sectionContainer">
            <div className="ib" id="section-left">
              {/* <Link to="/footage"><img src={backImage} id="back"/></Link> */}
              <img src={backImage} id="back" onClick={this.props.history.goBack}/>
            </div>
            <div className="ib" id="section-center">
              <video id="player">
                {/* <source src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4" type="video/mp4" size="576"></source> */}
                <source src={process.env.PUBLIC_URL + '/video/' + data.title + '.mp4'} type="video/mp4" />
              </video>
            </div>
            <div className="ib" id="section-right">
              <div id="section-top">
                <p className="b ib" id="title">{data.title}</p>
                <p className="b ib" id="price">{parseInt(data.price).toLocaleString() + 'KRW'}</p>
              </div>
              <div id="section-middle">
                <table style={{ width: '100%' }}>
                  <tbody>
                    <tr>
                      <td className="b" style={{ width: '30%' }}>drone</td>
                      <td className="l">{data.Drone}</td>
                    </tr>
                    <tr>
                      <td className="b">frame rate</td>
                      <td className="l">{data['Frame rate']}</td>
                    </tr>
                    <tr>
                      <td className="b">frame size</td>
                      <td className="l">{data.Resolution === '4k' ? '4096 x 2160' : '1920 x 1080'}</td>
                    </tr>
                    <tr>
                      <td className="b">raw data</td>
                      <td className="l">{data['raw data']}</td>
                    </tr>
                    <tr>
                      <td className="b">location</td>
                      <td className="l">{data.location}</td>
                    </tr>
                    <tr>
                      <td className="b">tag</td>
                      <td className="l">{data.tag}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div id="section-bottom">
                <div className="button ib c" id="cart" onClick={this.addToCartAnimation}>
                  <p className="b vc">add to cart</p>
                  <div id="cart-check-container">
                    <div id="cart-check-absolute">
                      <img src={checkImage} id="checkImg" />
                    </div>
                  </div>
                </div>
                <div className="button ib c" id="buy"><Link to={"/checkout/"+this.props.match.params.id} style={{ textDecoration: 'none', color : 'white'}}><p className="b vc">checkout</p></Link></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Detail;
