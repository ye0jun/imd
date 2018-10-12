import React, { Component } from 'react';
import '../scss/Footage.scss';

class Footage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      Category: 'landscape',
      Drone: 'mavic pro',
      'Frame rate': '24 fps',
      'Curated Gallery': '.'
    }
  }

  setFilter(state,value){
    const settingValue = {};
    settingValue[state] = value;
    this.setState(settingValue);
  }

  leftRender() {
    const leftData = {
      Category: ['landscape', 'cityscape', 'road', 'ocean', 'mountain', 'people'],
      Drone: ['mavic pro', 'phantom 4 pro', 'inspire'],
      'Frame rate': ['24 fps', '30 fps', '60 fps'],
      'Curated Gallery': ['iceburg in iceland', 'music festival', 'flying the ocean']
    }

    let renderData = [];
    for (const key in leftData) {
      renderData.push(
        (<div className="itemContainer" key={key}>
          <p className="b margin0 leftTitle" >{key}</p>
          {leftData[key].map((value, index) => {
            const selectedStyle = {
              color: '#898888'
            }
            if (this.state[key] === value)
              selectedStyle.color = '#000000';
            return (
              <div className="leftContentContainer" key={value}>
                <p className="b leftContent" style={selectedStyle} onClick={()=>{this.setFilter(key,value);}}>{value}</p>
              </div>
            );
          })}
        </div>));
    }
    return renderData;
  }

  render() {

    return (
      <div className="Footage">
        <div className="marginContainer" id="FootageContinaer">
          <div id="leftContainer">{this.leftRender()}</div>
          <div id="rightContainer"></div>
        </div>
      </div>
    );
  }
}

export default Footage;
