import React, { Component } from 'react';
import '../scss/About.scss';
import aboutVideo from '../resource/video/about.mp4';
import playIcon from '../resource/image/imd_logo_white.png';
import $ from 'jquery';

class About extends Component {

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
  componentDidMount(){
    $(document).scroll(()=>{
      let topScroll = ($(document).scrollTop());
      let topList = document.querySelector('.top');
      let topTransform = $(topList).css('transform');
      let bottomList = document.querySelector('.bottom');
      let bottomTransform = $(bottomList).css('transform');
      if (topScroll < 520){
        $('.sectionCover').css('backgroundColor', `rgba(0, 0, 0, 0)`);
      }
      else if (topScroll < 1800){
        let opacityVal = (topScroll - 520)/600;
        let moveVal = - (0.15 * topScroll) + 'px';
        $('#aboutClip').css('marginTop', moveVal);
        $('.sectionCover').css('backgroundColor', `rgba(0, 0, 0, ${opacityVal})`);
      }
      else {
        let topValue = 100 - (0.1 * topScroll) + 'px';
        let bottomValue = -(400 - (0.1 * topScroll)) + 'px';
        topTransform = `translate3d(${topValue},0 , 0)`;
        bottomTransform = `translate3d(${bottomValue},0 , 0)`;
        $('#top').css('transform', topTransform);
        $('#bottom').css('transform', bottomTransform);
      }
    })
  }

  

  render() {
    const videoStyle = {
      width: '100vw',
      marginTop: '-9%'
    }
    let a = 0;
    let playVideo = a.map(function(){
      if (a % 2 === 0){
        $('#videoOverlay').css('backgroundColor', `rgba(0, 0, 0, 0)`);
        $('.videoSize').css('height', '100vh');
      } else {
        $('#videoOverlay').css('backgroundColor', `rgba(0, 0, 0, 0.65)`);
        $('.videoSize').css('height', '640px');
      }a++
      console.log('it works');
    })
  
    return (
      <div className="About">
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
                <img className="playBtn" onClick={playVideo} width="56px" src={playIcon}></img>
              </div>
              <div className="videoLayer" >
                <video id="aboutClip" autoPlay loop muted style={videoStyle}>
                  <source src={aboutVideo} type="video/mp4"/>
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>

          <div className="marginContainer">
            <div className="section3 marginTop">
              <h1 className="b">Services</h1>
              <p className="l bodyText">Make your video more dynamic, dramatic 
                and diversMake your video more dynamic, dramatic 
                and diversMake your video more dynamic, dramatic 
                and diversMake your video more dynamic, dramatic 
                and divers</p>
            </div>
            <div className="serviceContent marginTop">
              <h2 className="b">Footage</h2>
              <ul>
                <li className="b bodyText">4k resolution</li>
                <li className="b bodyText">4k resolution</li>
                <li className="b bodyText">4k resolution</li>
                <li className="b bodyText">4k resolution</li>
              </ul>
            </div>
            <div className="serviceContent">
              <h2 className="b">Footage</h2>
              <ul>
                <li className="b bodyText">4k resolution</li>
                <li className="b bodyText">4k resolution</li>
                <li className="b bodyText">4k resolution</li>
                <li className="b bodyText">4k resolution</li>
              </ul>
            </div>
            <div className="serviceContent">
              <h2 className="b">Footage</h2>
              <ul>
                <li className="b bodyText">4k resolution</li>
                <li className="b bodyText">4k resolution</li>
                <li className="b bodyText">4k resolution</li>
                <li className="b bodyText">4k resolution</li>
              </ul>
            </div>
            <h1 className="b marginTop">Gallery</h1>
          </div>

          <div className="section4">
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

          <div className="personalFootage marginContainer marginTop">

            <h1 className="b">Personal Footage</h1>
            <h2 className="b">Personal</h2>
            <ul>
              <li className="b bodyText">4k resolution</li>
              <li className="b bodyText">4k resolution</li>
              <li className="b bodyText">4k resolution</li>
              <li className="b bodyText">4k resolution</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
