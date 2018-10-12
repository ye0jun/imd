import React, { Component } from 'react';
import '../scss/About.scss';
import mainVideo from '../resource/video/main.mp4';

class About extends Component {
  render() {
    return (
      <div className="About">
        <div className="section1 marginContainer">
          <h1 className="b">Make your video more dynamic, dramatic <br></br>and divers</h1>
          <div className="imgContainer">
            <div className="img1"></div>
            <div className="img2"></div>
          </div>
        </div>
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
        <div className="section3 marginContainer">
          <h1 className="b">Services</h1>
          <p className="l bodyText">Make your video more dynamic, dramatic 
  and diversMake your video more dynamic, dramatic 
  and diversMake your video more dynamic, dramatic 
  and diversMake your video more dynamic, dramatic 
  and divers</p>
        </div>


      </div>
    );
  }
}

export default About;
