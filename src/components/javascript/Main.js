import React, { Component } from 'react';
import '../scss/Main.scss';
import mainVideo from '../resource/video/main.mp4';
import mainJson from '../resource/json/Main.json';

class Main extends Component {
  constructor(props) {
    super(props);
    console.log(mainJson);
  }

  componentDidMount() {
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
          {mainJson.data.map((e, i) => {
            const contentContainerStyle = {
              width: '640px',
              height: '400px',
              background: '#3366FF',
              marginTop: '120px'
            }

            if (i % 2 == 0) {
              contentContainerStyle.marginLeft = '11%';
              contentContainerStyle.marginRight = 'auto';
            }
            else {
              contentContainerStyle.marginRight = '11%';
              contentContainerStyle.marginLeft = 'auto';
            }
            console.log(contentContainerStyle);
            return (
              <div className="contentContainer" key={i} style={contentContainerStyle}>
                <div className="videoContainer">
                  <video autoPlay loop muted style={contentVideStyle}>
                    <source src={mainVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
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
