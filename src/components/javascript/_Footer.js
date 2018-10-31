import React, { Component } from 'react';
import '../scss/_Footer.scss';
import Visa from '../resource/image/visa.png';
import Master from '../resource/image/master.png';
import $ from 'jquery';
class Footer extends Component {

  constructor(props){
    super(props);

    const pathName = this.props.location.pathname;
    this.state = {
      isScroll : 'static',
      pathName : pathName
    };
  }
  
  componentDidMount(){
    $('#credit').height($('#contact').height());
    const images = $('.Footer img');
    const imageWidth = $('#credit').width() * 0.3;
    const imageHeight = $('#credit').height() * 0.5;
    for(let i=0; i<images.length; i++){
      $(images[i]).width(imageWidth);
      $(images[i]).height(imageHeight);
    }
    this.adjustFoooterPlcae();
  }

  componentDidUpdate(){
    console.log('footer render');
    const pathName = this.props.location.pathname;
    if(pathName != this.state.pathName){
      this.setState({
        pathName : pathName
      });
      this.adjustFoooterPlcae();
    }
  }

  adjustFoooterPlcae(){
    const isScroll = $('body')[0].scrollHeight > $('body')[0].clientHeight;
    this.setState({
      isScroll : isScroll
    });
  }

  render() {
    const displayTableStyle = {
      display: 'table',
      width: '100%',
    };

    const footerPositionStyle = {
      position : this.state.isScroll ? 'static' : 'absolute',
      width : '100%',
      bottom : '0px'
    };

    return (
      <div className="Footer" style={footerPositionStyle}>
        <div className="marginContainer" id="container">
          <div className="ib" id="contact">
            <div style={displayTableStyle}>
              <p className="l title">Contact</p>
              <p className="l content">imdh1640@gmail.com</p>
              <p className="l content">info@imdfilmstudio.com</p>
            </div>
          </div>
          <div className="ib" id="social">
            <div style={displayTableStyle}>
              <p className="l title">Social</p>
              <div className="l content">
                <p className="ib margin0 content-left">Youtube</p>
                <p className="ib margin0">Vimeo</p>
              </div>
              <div className="l content">
                <p className="ib margin0 content-left">Behance</p>
                <p className="ib margin0">Instagram</p>
              </div>
            </div>
          </div>
          <div className="ib" id="legal">
            <div style={displayTableStyle}>
              <p className="l title">Legal</p>
              <p className="l content">terms</p>
              <p className="l content">privacy policy</p>
            </div>
          </div>
          <div className="ib" id="credit">
            <div id="creditContainer">
              <img src={Master}/>
              <img src={Visa} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
