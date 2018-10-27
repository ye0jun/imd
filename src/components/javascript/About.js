/* eslint-disable */ 
import React, { Component } from 'react';
import '../scss/About.scss';
import mainVideo from '../resource/video/main.mp4';
import mainJson from '../resource/json/Main.json';

class About extends Component {
  render() {
    return (
      <div className="About">
        <div className="section1">
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
              <div className="videoLayer">
                <video autoPlay loop muted>
                  <source src={mainVideo} type="video/mp4" />
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
              <div className="imgList top">
                {mainJson.gallery.map((gallery, i) => {
                  if ( i < 3 ){
                    return (
                      <img alt="sample" key={i} src={'..'+gallery.imgUrl} className="galleryImg"></img>
                    );
                  }
                })}
              </div>
            </div>
            <div className="gallery">
              <div className="imgList bottom">
                {mainJson.gallery.map((gallery, i) => {
                  if ( i >= 3 ){
                    return (
                      <img alt="sample" key={i} src={gallery.imgUrl} className="galleryImg"></img>
                    );
                  }
                })}
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
