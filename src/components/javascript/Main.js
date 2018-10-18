import React, { Component } from 'react';
import '../scss/Main.scss';
import mainVideo from '../resource/video/main.mp4';
import mainJson from '../resource/json/Main.json';
import videoIcon from '../resource/image/imd_vidicon.png';
import ScrollReveal from 'scrollreveal'
import $ from 'jquery'

class Main extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    ScrollReveal().reveal('.videoAnimate', {
      reset: true,
      delay: 100,
      distance: '120px'
    });
    ScrollReveal().reveal('.informationContainer', {
      reset: true,
      origin: 'left',
      delay: 150,
    });

    $('.videoContainer').height($('body')[0].clientHeight);
  }

  videoContainerMouseEnter(e) {
    $($(e.currentTarget).find('.videoHoverContainer')[0]).show();
  }

  videoContainerMouseLeave(e) {
    $($(e.currentTarget).find('.videoHoverContainer')[0]).hide();
  }

  render() {
    const contentVideStyle = {
      position: 'relative',
      width: '100%',
      height: '340px',
      objectFit: 'cover'
    }
    return (
      <div className="Main">
        <div className="videoContainer">
          <video autoPlay loop muted>
            <source src={mainVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div id="mainContainer">
          <p className="b" style={{ marginBottom: '0px' }}>Curated Collection</p>
          {mainJson.data.map((data, i) => {
            const contentContainerStyle = {
              width: '640px',
              marginTop: '120px'
            }

            if (i % 2 === 0) {
              contentContainerStyle.marginLeft = '11%';
              contentContainerStyle.marginRight = 'auto';
            }
            else {
              contentContainerStyle.marginRight = '11%';
              contentContainerStyle.marginLeft = 'auto';
            }

            return (
              <div className="contentContainer" key={i} style={contentContainerStyle}>
                <div className="videoContainer videoAnimate" style={{ height: '340px' }} onMouseEnter={this.videoContainerMouseEnter} onMouseLeave={this.videoContainerMouseLeave}>
                  <video autoPlay loop muted style={contentVideStyle}>
                    <source src={mainVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="videoHoverContainer">
                    <div className="videoHover-background"></div>
                    <div className="videoHover-textContainer">
                      <p className="b margin0" style={{ color: 'white' }}>{data.title}</p>
                      <p className="b margin0" style={{ color: 'white', fontSize : '15px'}}><img src={videoIcon} alt="video icon" style={{width:'12px',verticalAlign:'middle'}}></img>  {data.count} Video</p>
                    </div>
                  </div>
                </div>
                <div className="informationContainer">
                  <div className="information-firstLine">
                    <p className="b margin0" style={{ textAlign: 'left' }}>{data.title}</p>
                    <div style={{ flexGrow: '100', position: 'relative' }} className='informationSubText'>
                      <p className="b margin0" style={{ position: 'absolute', bottom: '0px', right: '0px' }}>{data.year}</p>
                    </div>
                  </div>
                  <p className="b margin0 informationSubText" style={{ textAlign: 'left' }}>{data.location}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Main;
