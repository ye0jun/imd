/* eslint-disable */
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
      filters: {
        Category: '.',
        Drone: '.',
        'Frame rate': '.',
        Resolution: '.'
      },
      filtering: [],
      filteredData: [],
      page: 1,
      maxPage: 1
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
    this.setFilter('Category', '.');
    this.videoSetting();
  }

  componentDidUpdate() {
    this.videoSetting();
  }

  setFilter(state, value) {
    const filters = this.state.filters;
    filters[state] = value;
    const filtering = [];
    for (var key in filters) {
      if (filters[key] !== '.')
        filtering.push(key);
    }

    const filteredData = [];
    videoInformationJson.data.map((value, index) => {
      let isFiltering = true;
      for (let i in filtering) {
        const key = filtering[i];
        if (filters[key] !== value[key]) {
          isFiltering = false;
          break;
        }
      }
      if (isFiltering)
        filteredData.push({ value: value, index: index });
    });

    this.setState({
      filters: filters,
      filtering: filtering,
      filteredData: filteredData,
      page: 1,
      maxPage: filteredData.length / 8
    });
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
      Category: ['ocean', 'cityscape', 'landscape', 'people', 'road', 'mountain', 'lake river'],
      Drone: ['mavic pro', 'phantom 4 pro', 'inspire'],
      'Frame rate': ['24 fps', '30 fps', '60 fps'],
      Resolution: ['1080p', '4k']
    }

    const xStyle = {
      verticalAlign: 'middle',
      width: '12px',
      marginLeft: '10px',
      marginBottom: '3px',
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

            if (this.state.filters[key] === value)
              selectedStyle.color = '#000000';
            return (
              <div className="leftContentContainer" key={value}>
                <p className="b leftContent" style={selectedStyle} onClick={() => { this.setFilter(key, value); }}>{value}</p>
                {this.state.filters[key] === value ? <img alt="filterX" src={image_x} style={xStyle} data-filter={key} onClick={
                  (e) => {
                    const tempState = this.state.filters;
                    const filter = $(e.currentTarget).data('filter');
                    this.setFilter(filter, '.');
                    // tempState[filter] = '.';
                    // const filtering = [];
                    // for (var key in tempState) {
                    //   if (tempState[key] !== '.')
                    //     filtering.push(key);
                    // }
                    // this.setState({
                    //   filters: tempState,
                    //   filtering: filtering
                    // });
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
    const MAXIMUM = 8;
    const filteredData = [];
    // 1. 데이터 가공
    // videoInformationJson.data.map((value, index) => {
    //   let isFiltering = true;
    //   for (let i in this.state.filtering) {
    //     const key = this.state.filtering[i];
    //     if (this.state.filters[key] !== value[key]) {
    //       isFiltering = false;
    //       break;
    //     }
    //   }
    //   if (isFiltering)
    //     filteredData.push({ value: value, index: index });
    // });

    for (let i = (this.state.page - 1) * MAXIMUM; i < this.state.page * MAXIMUM; i++) {
      if (this.state.filteredData[i] === undefined)
        break;
      const data = this.state.filteredData[i].value;
      const index = this.state.filteredData[i].index;
      renderData.push(
        <CSSTransition
          key={data.title}
          timeout={500}
          classNames="fade"
        >
          <div className="items" onMouseEnter={this.videoContainerMouseEnter} onMouseLeave={this.videoContainerMouseLeave}>
            <div className="videoContainer">
              <video loop muted >
                <source src={process.env.PUBLIC_URL + '/video/' + data.title + '.mp4'} type="video/mp4" />
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

    // videoInformationJson.data.map((value, index) => {
    //   const data = value;
    //   let continueFlag = false;
    //   for (const key in this.state.filters) {
    //     if (this.state.filters[key] !== '.' && this.state.filters[key] !== data[key]) {
    //       continueFlag = true;
    //     }
    //   }

    //   if (!continueFlag) {
    //     renderData.push(
    //       <CSSTransition
    //         key={data.title}
    //         timeout={500}
    //         classNames="fade"
    //       >
    //         <div className="items" onMouseEnter={this.videoContainerMouseEnter} onMouseLeave={this.videoContainerMouseLeave}>
    //           <div className="videoContainer">
    //             <video loop muted poster={process.env.PUBLIC_URL + '/video/sample_1.jpeg'}>
    //               <source src={process.env.PUBLIC_URL + data.videoUrl} type="video/mp4" />
    //               Your browser does not support the video tag.
    //           </video>
    //           </div>
    //           <div className="videoInformationContainer">
    //             <Link to={'/detail/' + index}>
    //               <div className="transparent"></div>
    //               <p className="l informationItem price">{data.price} KRW</p>
    //               <p className="l informationItem title">{data.title}</p>
    //               <p className="l informationItem duration"></p>
    //             </Link>
    //           </div>
    //         </div>
    //       </CSSTransition>
    //     );
    //   }
    //   return;
    // });

    return (
      <TransitionGroup id="itemContainer">
        {renderData}
      </TransitionGroup>
    )
  }

  paging(page){
    this.setState({
      page : page
    });
  }

  pagingRender() {
    const render = [];
    for (let i = 0; i < this.state.maxPage; i++) {
      if(this.state.page === i+1)
        render.push(<span className="b pagingText" key={i+1}>{i + 1}</span>);
      else
        render.push(<span className="b gray pagingText" key={i+1} onClick={()=>this.paging(i+1)}>{i + 1}</span>);
    }

    return (
      <div id="pagingContainer">{render}</div>
    );
  }

  render() {

    return (
      <div className="Footage">
        <div className="marginContainer" id="FootageContinaer">
          <div id="leftContainer">{this.leftRender()}</div>
          <div id="rightContainer">
            {this.rightRender()}
            {this.pagingRender()}
          </div>
        </div>
      </div>
    );
  }
}

export default Footage;
