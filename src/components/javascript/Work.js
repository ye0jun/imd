/* eslint-disable */
import React, { Component } from 'react';
import '../scss/Work.scss';
import AnimationText from './_AnimationText';
import image_prev from '../resource/image/back.png';
import image_next from '../resource/image/forward.png';
import workJson from '../resource/json/Work.json';
import $ from 'jquery';
import anime from 'animejs';
import Plyr from 'plyr';

class Work extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: 0,
      max: 4,
      currentMore: false,
    };

    this.transforming = false;

    this.projectName = [[], []];
    this.subjectName = [[], []];
    workJson.data.map((value) => {
      this.projectName[0].push(value.firstTitleLine);
      this.projectName[1].push(value.secondTitleLine);
      this.subjectName[0].push(value.firstSubjectLine);
      this.subjectName[1].push(value.secondSubjectLine);
    });
    // this.projectName[0] = ["a light on", "programmatic"];
    // this.projectName[1] = ["performance", "solution"];
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.seeMore = this.seeMore.bind(this);
    this.seeMoreClose = this.seeMoreClose.bind(this);
  }

  next() {
    if (this.transforming)
      return;

    this.transforming = true;

    const current = this.state.current;
    const next = this.state.current + 1 >= this.state.max ? 0 : this.state.current + 1;

    this.child1.hide(current, 'up');
    this.child2.hide(current, 'up', 300);
    this.child4.hide(current, 'up');
    this.child5.hide(current, 'up', 300);

    this.child1.show(next, 'up', 700);
    this.child2.show(next, 'up', 1000);
    this.child4.show(next, 'up', 700);
    this.child5.show(next, 'up', 1000);

    this.child3.hide(current, 'up');
    this.child3.show(next, 'up', 300);

    let delay = 0;
    let lastHideAnimation;
    for (let i = 0; i < 2; i++) {
      const hideAnimationOption = {
        targets: [],
        top: ['0%', '-100%'],
        duration: 800,
        delay: delay,
        easing: 'easeInOutQuart'
      }
      hideAnimationOption.targets.push(this.refs['animationObject' + (i + 2)]);
      delay += 300;
      lastHideAnimation = anime(hideAnimationOption);
    }
    lastHideAnimation.complete = () => {
      let lastShowAnimation;
      delay = 0;
      for (let i = 0; i < 2; i++) {
        $($('.smallImage')[i]).css('background-image', 'url("/image/work/' + next + "/" + 0 + '.png")');
        const showAnimationOption = {
          targets: [],
          top: ['100%', '0%'],
          duration: 800,
          delay: delay,
          easing: 'easeInOutQuart'
        }
        showAnimationOption.targets.push(this.refs['animationObject' + (i + 2)]);
        delay += 300;
        lastShowAnimation = anime(showAnimationOption);
      }
      lastShowAnimation.complete = () => {
        this.transforming = false;
      }
    }

    this.setState({
      current: next
    })
  }

  prev() {
    if (this.transforming)
      return;

    this.transforming = true;

    const current = this.state.current;
    const next = this.state.current - 1 < 0 ? this.state.max - 1 : this.state.current - 1;

    this.child1.hide(current, 'down');
    this.child4.hide(current, 'down');
    this.child2.hide(current, 'down', 300);
    this.child5.hide(current, 'down', 300);

    this.child1.show(next, 'down', 700);
    this.child4.show(next, 'down', 700);
    this.child2.show(next, 'down', 1000);
    this.child5.show(next, 'down', 1000);

    this.child3.hide(current, 'down');
    this.child3.show(next, 'down', 300);

    let delay = 0;
    let lastHideAnimation;
    for (let i = 0; i < 2; i++) {
      const hideAnimationOption = {
        targets: [],
        top: ['0%', '100%'],
        duration: 800,
        delay: delay,
        easing: 'easeInOutQuart'
      }
      hideAnimationOption.targets.push(this.refs['animationObject' + (i + 2)]);
      delay += 300;
      lastHideAnimation = anime(hideAnimationOption);
    }
    lastHideAnimation.complete = () => {
      delay = 0;
      let lastShowAnimation;
      for (let i = 0; i < 2; i++) {
        $($('.smallImage')[i]).css('background-image', 'url("/image/work/' + next + "/" + 0 + '.png")');
        const showAnimationOption = {
          targets: [],
          top: ['-100%', '0%'],
          duration: 800,
          delay: delay,
          easing: 'easeInOutQuart'
        }
        showAnimationOption.targets.push(this.refs['animationObject' + (i + 2)]);
        delay += 300;
        lastShowAnimation = anime(showAnimationOption);
      }
      lastShowAnimation.complete = () => {
        this.transforming = false;
      }
    }

    this.setState({
      current: next
    })
  }

  seeMore() {
    if (this.transforming)
      return;

    this.transforming = true;
    this.props.setMore(true);
    let delay = 0;
    for (let i = 0; i < 4; i++) {
      const hideAnimationOption = {
        targets: [],
        top: ['0%', '100%'],
        duration: 800,
        delay: delay,
        easing: 'easeInOutQuart'
      }
      hideAnimationOption.targets.push(this.refs['animationObject' + i]);
      delay += 300;
      anime(hideAnimationOption);
    }

    const hideAnimationOption2 = {
      targets: [this.refs['animationObject4'], this.refs['animationObject5']],
      opacity: [1, 0],
      duration: 800,
      easing: 'easeInOutQuart'
    }
    anime(hideAnimationOption2).complete = () => {
      $(this.refs.animationObject4).hide();
      $(this.refs.animationObject5).hide();
    };

    delay += 500;
    const hideAnimationOption3 = {
      targets: this.refs['animationObject6'],
      top: [this.imageBigTop, 0],
      duration: 800,
      delay: delay,
      easing: 'easeInOutQuart'
    }

    const bigImageDownAnimation = anime(hideAnimationOption3);
    bigImageDownAnimation.complete = () => {
      $('#additionalContainer').show();
      $('#stillContainer').show();
      delay = 0;

      const opacityAnimationOption = {
        targets: ['#additionalContainer', '#stillContainer'],
        opacity: [0, 1],
        duration: 800,
        delay: delay,
        easing: 'easeInOutQuart'
      }
      const zoomSettingNeed = anime(opacityAnimationOption);
      zoomSettingNeed.complete = () => {
        this.zoomSetting()
        this.transforming = false;
      }
    }
  }

  seeMoreClose() {
    if (this.transforming)
      return;

    if (this.player !== undefined)
      this.player.stop();

    $(this.refs.animationObject4).show();
    $(this.refs.animationObject5).show();
    let delay = 0;
    const opacityAnimationOption = {
      targets: ['#additionalContainer', '#stillContainer'],
      opacity: [1, 0],
      duration: 800,
      delay: delay,
      easing: 'easeInOutQuart'
    }
    const opacityAnimation = anime(opacityAnimationOption);
    opacityAnimation.complete = () => {
      $('#additionalContainer').hide();
      $('#stillContainer').hide();

      const hideAnimationOption3 = {
        targets: this.refs['animationObject6'],
        top: [0, this.imageBigTop],
        duration: 800,
        delay: delay,
        easing: 'easeInOutQuart'
      }
      delay += 300;
      anime(hideAnimationOption3);

      for (let i = 3; i >= 0; i--) {
        const hideAnimationOption = {
          targets: [],
          top: ['100%', '0%'],
          duration: 800,
          delay: delay,
          easing: 'easeInOutQuart'
        }
        hideAnimationOption.targets.push(this.refs['animationObject' + i]);
        delay += 300;
        anime(hideAnimationOption);
      }

      const hideAnimationOption2 = {
        targets: [this.refs['animationObject4'], this.refs['animationObject5']],
        opacity: [0, 1],
        duration: 800,
        delay: 2000,
        easing: 'easeInOutQuart'
      }
      anime(hideAnimationOption2);
    }
  }


  zoomSetting() {
    const imageOfFirstLine = $('.firstImageLine');
    const imageOfSecondLine = $('.secondImageLine');
    const imageWidth = $(imageOfFirstLine[0]).width();
    const firstLineLeftStart = -420;
    const secondLineLeftStart = -60;
    for (let i = 0; i < imageOfFirstLine.length; i++) {
      $(imageOfFirstLine[i]).css('left', i * imageWidth + firstLineLeftStart + i * 10);
      if (i > 2) continue;
      $(imageOfSecondLine[i]).css('left', i * imageWidth + secondLineLeftStart + i * 10);
    }
  }

  bigVideoSetting() {
    if (this.myCurrent === this.state.current)
      return;

    $('#imageBig').width($('#rightContainer').width() + 64);
    $('#imageBig').height($('.Header').height() + 480);
    $('#imageBig').css('z-index', 3);
    this.imageBigTop = -$('#imageBig').height();
    $('#imageBig').css('top', this.imageBigTop);

    if (this.state.current === 3) {
      this.player = undefined;
      return;
    }


    if (this.player === undefined) {
      this.player = new Plyr('#player', {
        // controls : ['play-lar ge', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen']	
        // controls: ['play-large']
      });
    }


    this.player.source = {
      type: 'video',
      sources: [
        {
          src: process.env.PUBLIC_URL + "/video/work" + this.state.current + ".mp4",
          type: 'video/mp4',
          // size: 720,
        },
      ],
      poster: process.env.PUBLIC_URL + "/image/work/" + this.state.current + "/0.png",
    };

    $('#imageBig .plyr').height('100%');
    $('#imageBig .plyr').css('background', 'white');

    $('#imageBig .plyr .plyr__video-wrapper').height('100%');
    $('#imageBig .plyr .plyr__video-wrapper').css('background', 'white');
    $('#imageBig .plyr .plyr__video-wrapper video').height('100%');
    $('#imageBig .plyr .plyr__video-wrapper video').width('100%');

    if(this.state.current !== 2){
      $('#imageBig .plyr .plyr__video-wrapper video').css('object-fit', 'cover');
    }
    else{
      $('#imageBig .plyr .plyr__controls').css('width','59%');
      $('#imageBig .plyr .plyr__controls').css('left','20.5%');
    }
      
    setTimeout(() => {
      $($('#imageBig .plyr').get(0)).addClass('plyr--hide-controls');
    }, 1000);

    this.myCurrent = this.state.current;
  }

  componentDidUpdate() {
    if (this.state.currentMore != this.props.more) {
      if (!this.props.more) {
        this.seeMoreClose();
      }
      this.setState({
        currentMore: this.props.more
      });
    }
    this.bigVideoSetting();
  }

  componentDidMount() {
    $('#left-videoTextContainer').width($('#left-videoText').width());
    $('#left-videoTextContainer').height($('#left-videoText').height());

    const childrenWidth = $($('#left-videoPageContainer .AnimationText').children().get(0)).width();
    $('#left-videoPageContainer .AnimationText').width(childrenWidth + 2);
    $('#left-videoPageContainer .AnimationText').css('align-self', 'flex-end');
    $('#left-videoPageContainer').height($('#left-videoPage').height());

    //small image setting
    const imageContainerWidth = $('#imageContainer').width();
    const imageContainerHeight = $('#imageContainer').height();
    $('.smallImage').width(imageContainerWidth);
    $('.smallImage').height(imageContainerHeight);
    $('#smallImageLeft').css('top', '-12.5%');
    $('#smallImageRight').css('left', (-imageContainerWidth / 2) + 'px');

    this.bigVideoSetting();

    //zoom
    const zoomMount = [0.25, 0.75, 0.4, 0.6, 0.9, 0.3, 0.4];
    const zoomableImage = $('.zoomableImage');
    $(document).scroll(() => {
      const scrollVisible = $(document).scrollTop() + $(window).height();
      const stillVisible = 104 + $('.Work #container').height() + 100;
      const scrollEnd = stillVisible + 713;

      for (let i = 0; i < 7; i++) {
        const percent = 1 - ((713 - (scrollEnd - scrollVisible)) / 713);
        const scale = 1 + (zoomMount[i] * percent);
        $(zoomableImage[i]).css('transform', 'scale(' + scale + ')');
      }
    });

    // this.bigVideoSetting();

    // $('#imageBig').width($('#rightContainer').width() + 64);
    // $('#imageBig').height($('.Header').height() + 480);
    // this.imageBigTop = -$('#imageBig').height();
  }

  stillRender() {
    const output = [];
    const firstLine = [];
    const secondLine = [];
    for (let i = 0; i < 4; i++) {
      firstLine.push(
        <div className="zoomableImageContainer firstImageLine" key={"ZIC" + i}>
          <img className="zoomableImage" src={process.env.PUBLIC_URL + "/image/work/" + this.state.current + "/" + i + ".png"} />
        </div>
      )
      if (i > 2)
        continue; //아랫줄

      secondLine.push(
        <div className="zoomableImageContainer secondImageLine" key={"ZIC" + i + 4}>
          <img className="zoomableImage" src={process.env.PUBLIC_URL + "/image/work/" + this.state.current + "/" + (i + 4) + ".png"} />
        </div>
      )
    }
    output.push(
      <div id="stillContainer" key="?">
        <div className="line">
          {firstLine}
        </div>
        <div className="line">
          {secondLine}
        </div>
      </div>
    )
    return output;
  }

  bigRender() {
    const current = this.state.current;
    const output_image = <img id="imageBig" onClick={this.seeMoreClose} ref="animationObject6" src={process.env.PUBLIC_URL + "/image/work/" + current + "/0.png"} />;
    const output_video = (
      <div id="imageBig" ref="animationObject6">

        <video id="player" style={{ width: '100%', height: '100%', }}>
          <source src={process.env.PUBLIC_URL + "/video/work" + current + ".mp4"} type="video/mp4" />
        </video>
      </div>
    );

    if (current < 3)
      return output_video;
    else
      return output_image;
  }

  render() {
    return (
      <div className="Work">
        <div id="container" className="marginContainer">
          <div id="leftContainer" className="ib">
            <div id="namedProjectContainer">
              <AnimationText onRef={ref => (this.child4 = ref)} text={this.subjectName[0]} bold={true} option={{
                fontSize: '30px'
              }} />
              <AnimationText onRef={ref => (this.child5 = ref)} text={this.subjectName[1]} bold={true} option={{
                fontSize: '30px'
              }} />
            </div>
            <div id="left-videoTextContainer">
              <span id="left-videoText" className="leftEtc l" style={{width : '50px'}} ref="animationObject0">Video</span>
            </div>
            <div id="left-videoPageContainer">
              <div ref="animationObject1" style={{ display: 'flex', width: '100%', position: 'absolute'}}>
                <AnimationText onRef={ref => (this.child3 = ref)} text={[1, 2, 3, 4, 5, 6, 7, 8, 9]} option={{
                  fontSize: '15px', color: '#898888'
                }} />
                <span id="left-videoPage" className="leftEtc l"><span style={{fontFamily : 'Roboto'}}>&nbsp;/</span> 4</span>
              </div>
            </div>
          </div>
          <div id="centerContainer" className="ib">
            <div id="titleContainer">
              <div id="title-first" className="title">
                <AnimationText onRef={ref => (this.child1 = ref)} text={this.projectName[0]} option={{
                  fontSize: '50px'
                }} />
              </div>
              <div id="title-second" className="title">
                <AnimationText onRef={ref => (this.child2 = ref)} text={this.projectName[1]} option={{
                  fontSize: '50px'
                }} />
              </div>
            </div>
            <div id="seeMore" ref="animationObject4" className="b" onClick={this.seeMore}><p className="margin0 disableselect">See more</p></div>
          </div>
          <div id="rightContainer" className="ib">
            <div id="imageContainer">
              <div className="smallImageContainer">
                <div className="ib smallImageAnimation gradient" ref="animationObject2">
                  <div className="smallImage" id="smallImageLeft" style={{
                    backgroundImage: 'url("/image/work/0/0.png")',
                  }} />
                </div>
              </div>
              <div className="smallImageContainer" style={{ height: '100%' }}>
                <div className="ib smallImageAnimation" ref="animationObject3">
                  <div className="smallImage" id="smallImageRight" style={{
                    backgroundImage: 'url("/image/work/0/0.png")',
                  }} />
                </div>
              </div>
            </div>
            <div id="arrowContainer" ref="animationObject5">
              <img src={image_prev} onClick={this.prev} />
              <img src={image_next} onClick={this.next} />
            </div>
          </div>
          <div id="additionalContainer">
            <div className="Container">
              <div className="title b">about</div>
              <div className="content l">{workJson.data[this.state.current].about}</div>
            </div>
            <div className="Container">
              <div className="title b">detail</div>
              <div className="content l">{workJson.data[this.state.current].detail}</div>
            </div>
            <div className="Container" style={{ margin: '0px' }}>
              <div className="title b" style={{ width: '100%' }}>still image</div>
            </div>
          </div>
        </div>
        {this.stillRender()}
        {/* <img id="imageBig" onClick={this.seeMoreClose} ref="animationObject6" src={process.env.PUBLIC_URL + "/image/work/" + this.state.current + "/0.png"} /> */}
        {this.bigRender()}
      </div>
    );
  }
}

export default Work;
