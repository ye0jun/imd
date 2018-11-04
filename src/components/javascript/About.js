import React, { Component } from 'react';
import '../scss/About.scss';
import aboutVideo from '../resource/video/about.mp4';
import playIcon from '../resource/image/playbtn.png';
import $ from 'jquery';
import Plyr from 'plyr';

class About extends Component {

  constructor(props) {
    super(props);

    this.state = {
      scroll: 0
    }

    this.disableScroll = this.disableScroll.bind(this);
    this.enableScroll = this.enableScroll.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.hideVideo = this.hideVideo.bind(this);
  }

  // componentDidMount(){
  //   $(document).scroll(()=>{
  //     let topImgs = document.querySelector('.top');
  //     let bottomImgs = document.querySelector('.bottom')
  //     let topScroll = ($(document).scrollTop());
  //     let topTransform = $(topImgs).css('transform');
  //     let bottomTransform = $(bottomImgs).css('transform');
  //     if (topScroll > 1900) {
  //       let topTransform = 100 - (0.1 * topScroll) + 'px';
  //       topTransform = `translate3d(${topTransform},0 , 0)`;
  //       bottomTransform = `translate3d(-${topTransform},0 , 0)`;
  //       $('#test').css('transform', topTransform);
  //       $('#bottom').css('transform', bottomTransform);
  //     }
  //   })
  // }
  componentDidMount() {
    $(document).scroll(() => {
      let topScroll = ($(document).scrollTop());
      let topList = document.querySelector('.top');
      let topTransform = $(topList).css('transform');
      let bottomList = document.querySelector('.bottom');
      let bottomTransform = $(bottomList).css('transform');
      let currentScroll = 0;
      if (topScroll < 520) {
        currentScroll = 0;
        let imgSize = 670 - (topScroll / 6) + 'px';
        $('.sectionCover').css('backgroundColor', `rgba(0, 0, 0, 0)`);
        $('.imgContainer').css('display', 'flex');
        $('.imgContainer').css('height', `${imgSize}`);
      }
      else if (topScroll < 1800) {
        currentScroll = 1;
        let opacityVal = (topScroll - 520) / 600;
        $('.sectionCover').css('backgroundColor', `rgba(0, 0, 0, ${opacityVal})`);
        $('.imgContainer').css('display', 'flex');
      }
      else {
        currentScroll = 2;
        let topValue = 100 - (0.1 * topScroll) + 'px';
        let bottomValue = -(400 - (0.1 * topScroll)) + 'px';
        topTransform = `translate3d(${topValue},0 , 0)`;
        bottomTransform = `translate3d(${bottomValue},0 , 0)`;
        $('#top').css('transform', topTransform);
        $('#bottom').css('transform', bottomTransform);
        $('.imgContainer').css('display', 'none');
      }

      // if(this.state.scroll != currentScroll){
      //   this.setState({
      //     scroll : currentScroll
      //   });
      // }
    })

    this.player = new Plyr('#player', {
      controls : ['play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen']	
    });
  }

  preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
      e.preventDefault();
    e.returnValue = false;
  }


  disableScroll() {
    if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', this.preventDefault, false);
    window.onwheel = this.preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = this.preventDefault; // older browsers, IE
    window.ontouchmove = this.preventDefault; // mobile
    document.onkeydown = this.preventDefaultForScrollKeys;
  }

  enableScroll() {
    if (window.removeEventListener)
      window.removeEventListener('DOMMouseScroll', this.preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
  }

  playVideo() {
    $('.videoPlay').show();
    this.player.play();
  }

  hideVideo() {
    $('.videoPlay').hide();
    this.player.stop();
  }

  render() {
    const videoStyle = {
      width: '100vw'
    }

    return (
      <div className="About">
        <div className="videoPlay">
          <div id="videoContainer">
            <video id="player" >
              {/* <source src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4" type="video/mp4" size="576"></source> */}
              <source src={aboutVideo} type="video/mp4" />
            </video>
          </div>
          <div id="stopVideo" onClick={this.hideVideo}></div>
        </div>
        <div className="section1">
          <div className="sectionCover"></div>
          <div className="marginContainer">
            <h1 className="b">Make your video more dynamic, dramatic <br></br>and divers</h1>
            <div className="imgContainer">
              <div className="img1"></div>
              <div className="img2"></div>
            </div>
          </div>
        </div>
        <div className="bgWhite">
          <div className="section2">
            <div className="videoSize">
              <div id="videoOverlay">
                <img className="playBtn" onClick={this.playVideo} width="56px" src={playIcon}></img>
              </div>
              <div className="videoLayer" >
                <video id="aboutClip" autoPlay loop muted style={videoStyle}>
                  <source src={aboutVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>

          <div className="marginContainer">
            <div className="section3 marginTop">
              <h1 className="b">Services</h1>
              <p className="l bodyText">We provide concept-driven creative solutions that are led by an intelligent understanding of the task at hand and achieved through research and strategic insights. Solutions that are both pleasing and most importantly effective.</p>
            </div>
            <div className="serviceContent marginTop">

              <ul>
                <h2 className="b">Footage</h2>
                <li className="b bodyText">4k resolution</li>
                <li className="b bodyText">Various drone</li>
                <li className="b bodyText">Effective running time</li>
                <li className="b bodyText">Unlimited download</li>
              </ul>
            </div>
            <div className="serviceContent marginTop">
              <ul>
                <h2 className="b">Contents</h2>
                <li className="b bodyText">Concept</li>
                <li className="b bodyText">Photography</li>
                <li className="b bodyText">Videography</li>
              </ul>
            </div>
            <div className="serviceContent marginTop">
              <ul>
                <h2 className="b">Personal</h2>
                <li className="b bodyText">Custom Footage</li>
              </ul>
            </div>
          </div>

          <div className="section4">
            <h1 className="b marginTop marginContainer">Gallery</h1>
            <div className="gallery">
              <div className="imgList top" id='top'>
                <div className="image image1"></div>
                <div className="image image2"></div>
                <div className="image image3"></div>
                <div className="image image4"></div>
              </div>
            </div>
            <div className="gallery">
              <div className="imgList bottom" id='bottom'>
                <div className="image image5"></div>
                <div className="image image6"></div>
                <div className="image image7"></div>
              </div>
            </div>
          </div>

          <div className="personalFootage marginContainer marginTop section3">
            <h1 className="b">Process</h1>
            <p className="l bodyText">We believe that structure empowers creativity. The 12 notes of the musical scale. The 26 letters in the alphabet. The 256 colors in the RGB digital color spectrum. All structural systems used to unlock the vast creativity of music, literature, and visual communication. The foundation to our methodology is the belief that creativity used in conjunction with sound strategic thinking can solve any problem. Built to adapt to each project’s unique circumstances, our process begins with conversation, insight, and research. Driven by our client’s aspirations and business objectives, our tailored approach allows us to focus on creating impactful and effective design solutions.</p>
          </div>
          <div className="client">
            <h1 className="b">Clients</h1>
            <p className="l bodyText">We pride ourselves on building trust and understanding with our clients. From forward-thinking startups to large international brands, here are some of the companies that we are fortunate to work with.</p>
            <div className="row">
              <div className="logos">
                <div className="clientImg logo1"></div>
                <div className="clientImg logo2"></div>
                <div className="clientImg logo3"></div>
              </div>
            </div>
            <div className="row">
              <div className="logos">
                <div className="clientImg logo4"></div>
                <div className="clientImg logo5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
