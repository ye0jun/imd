import React, { Component } from 'react';
import '../scss/Footage.scss';
import { Link } from 'react-router-dom'
import videoInformationJson from '../resource/json/VideoInformation.json';
import image_x from '../resource/image/x.png';
import $ from 'jquery';

import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

class Footage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      Category: '.',
      Drone: '.',
      'Frame rate': '.',
      Resolution: '.'
    }
  }

  videoSetting() {
    const videoContainers = $('.videoContainer');
    for (let i = 0; i < videoContainers.length; i++) {
      const container = $(videoContainers[i]);
      const video = $(container).find('video');
      const durationTag = $($($(container).siblings()[0]).find('.duration')[0]);
      const ratio = 9 / 16;
      video.width(container.width());
      video.height(container.width() * ratio);

      if (container.height() - video.height() > 0) {
        video.width(container.height() / ratio);
        video.height(container.height());
      }

      video.get(0).oncanplay = function () {
        const duration = video.get(0).duration;
        const durationText = duration.toFixed(2) + '';
        durationTag.text(durationText.replace('.', ':'));
        this.oncanplay = undefined;
      };
    }
  }

  componentDidMount() {
    this.videoSetting();
  }

  componentDidUpdate() {
    this.videoSetting();
  }

  setFilter(state, value) {
    const settingValue = {};
    settingValue[state] = value;
    this.setState(settingValue);
  }

  videoContainerMouseEnter(e) {
    $($(e.currentTarget).find('.videoInformationContainer')[0]).fadeIn();
    $($(e.currentTarget).find('video')[0].play());
  }

  videoContainerMouseLeave(e) {
    $($(e.currentTarget).find('.videoInformationContainer')[0]).fadeOut();
    $($(e.currentTarget).find('video')[0].pause());
    $(e.currentTarget).find('video')[0].currentTime = 0;
  }

  leftRender() {
    const leftData = {
      Category: ['landscape', 'cityscape', 'road', 'ocean', 'mountain', 'people'],
      Drone: ['mavic pro', 'phantom 4 pro', 'inspire'],
      'Frame rate': ['24 fps', '30 fps', '60 fps'],
      Resolution: ['1080p', '4k']
    }

    const xStyle = {
      verticalAlign: 'middle',
      width: '18px',
      marginLeft: '10px',
      cursor: 'pointer'
    };

    let renderData = [];
    for (const key in leftData) {

      renderData.push(
        (<div className="itemContainer" key={key}>
          <p className="b margin0 leftTitle" >{key}</p>
          {leftData[key].map((value, index) => {
            const selectedStyle = {
              color: '#898888'
            };

            if (this.state[key] === value)
              selectedStyle.color = '#000000';
            return (
              <div className="leftContentContainer" key={value}>
                <p className="b leftContent" style={selectedStyle} onClick={() => { this.setFilter(key, value); }}>{value}</p>
                {this.state[key] === value ? <img src={image_x} style={xStyle} data-filter={key} onClick={
                  (e) => {
                    const tempState = {};
                    const filter = $(e.currentTarget).data('filter');
                    tempState[filter] = '.';
                    this.setState(tempState);
                  }
                } /> : ''}
              </div>
            );
          })}
        </div>));
    }
    return renderData;
  }

  rightRender() {
    const renderData = [];
    videoInformationJson.data.map((value, index) => {
      const data = value;
      let continueFlag = false;
      for (const key in this.state) {
        if (this.state[key] != '.' && this.state[key] !== data[key]) {
          continueFlag = true;
        }
      }

      if (!continueFlag) {
        renderData.push(
          <CSSTransition
            key={data.title}
            timeout={500}
            classNames="fade"
          >
            <div className="items" onMouseEnter={this.videoContainerMouseEnter} onMouseLeave={this.videoContainerMouseLeave}>
              <div className="videoContainer">
                <video loop muted poster={process.env.PUBLIC_URL + '/video/sample_1.jpeg'}>
                  <source src={process.env.PUBLIC_URL + data.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
              </video>
              </div>
              <div className="videoInformationContainer">
                <Link to={'/detail/' + index}>
                  <div className="transparent"></div>
                  <p className="l informationItem price">{data.price} KRW</p>
                  <p className="l informationItem title">{data.title}</p>
                  <p className="l informationItem duration"></p>
                </Link>
              </div>
            </div>
          </CSSTransition>
        );
      }
    });

    return (
      <TransitionGroup id="itemContainer">
        {renderData}
      </TransitionGroup>
    )
  }

  render() {

    return (
      <div className="Footage">
        <div className="marginContainer" id="FootageContinaer">
          <div id="leftContainer">{this.leftRender()}</div>
          <div id="rightContainer">{this.rightRender()}</div>
        </div>
      </div>
    );
  }
}

export default Footage;
