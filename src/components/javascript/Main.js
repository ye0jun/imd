/* eslint-disable */
import React, { Component } from 'react';
import '../scss/Main.scss';
import mainVideo from '../resource/video/main.mp4';
import videoInformationJson from '../resource/json/VideoInformation.json';
import videoIcon from '../resource/image/imd_vidicon.png';
import image_x from '../resource/image/x_white.png';
import image_prev from '../resource/image/prev.png';
import image_next from '../resource/image/next.png';
import ScrollReveal from 'scrollreveal'
import $ from 'jquery';
import anime from 'animejs';
import { Link } from 'react-router-dom'


const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      returnPosition: undefined,
      standard: undefined,
      currentCurated : -1,
      currentCuratedVideoIndex : 0,
      absoluteShow : '#secondAbsoluteVideoContainer',
      absoluteHide : '#firstAbsoluteVideoContainer'
    };
  }

  componentDidMount() {
    // this.disableScroll();
    this.enableScroll();
    const srVideoOption = {
      reset: false,
      delay: 200,
      distance: '120px'
    };

    const srInformationOption = {
      reset: false,
      origin: 'left',
      delay: 250,
    }
    ScrollReveal().reveal('.videoAnimate', srVideoOption);
    ScrollReveal().reveal('.informationContainer', srInformationOption);

    $(document).scroll((e) => {
      const sr1 = $('.videoAnimate');
      const sr2 = $('.informationContainer');
      for (let i = sr1.length - 1; i >= 0; i--) {
        const sr1Top = this.cumulativeOffset(sr1[i]);
        if ($(document).scrollTop() + $(window).height() < sr1Top.top) {
          if ($(sr1[i]).data('scroll') !== 'ready') {
            $(sr1[i]).data('scroll', 'ready');
            ScrollReveal().clean($('#videoAnimate' + i));
            ScrollReveal().reveal($('#videoAnimate' + i), srVideoOption);
            ScrollReveal().clean($(sr2[i]));
            ScrollReveal().reveal($(sr2[i]), srInformationOption);
          }
        }
        else {
          $(sr1[i]).data('scroll', 'notReady');
        }
      }
    });
    $('.videoContainer').height($('body')[0].clientHeight);

    this.videoSetting();
    // var xhrReq = new XMLHttpRequest();
    // xhrReq.open('GET', mainVideo, true);
    // xhrReq.responseType = 'blob';

    // xhrReq.onload = function () {
    //   if (this.status === 200) {
    //     var vid = URL.createObjectURL(this.response);
    //     const tVideo = $('video');
    //     for(var i=0; i<tVideo.length; i++){
    //       tVideo[i].src = vid;
    //     }
    //   }
    // }
    // xhrReq.onerror = function () {
    //   console.log('err', arguments);
    // }
    // xhrReq.onprogress = function (e) {
    //   if (e.lengthComputable) {
    //     var percentComplete = ((e.loaded / e.total) * 100 | 0) + '%';
    //     console.log('progress: ', percentComplete);
    //   }
    // }
    // xhrReq.send();
  }

  cumulativeOffset(element) {
    var top = 0, left = 0;
    do {
      top += element.offsetTop || 0;
      left += element.offsetLeft || 0;
      element = element.offsetParent;
    } while (element);

    return {
      top: top,
      left: left
    };
  };

  videoContainerMouseEnter(e) {
    $($(e.currentTarget).find('.videoHoverContainer')[0]).show();
  }

  videoContainerMouseLeave(e) {
    $($(e.currentTarget).find('.videoHoverContainer')[0]).hide();
  }

  videoSetting() {
    const container = $('#mainVideoContainer');
    const video = $(container).find('video');
    const ratio = 9 / 16;
    video.width(container.width());
    video.height(container.width() * ratio);

    if (container.height() - video.height() > 0) {
      video.width(container.height() / ratio);
      video.height(container.height());
    }
  }

  preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
      e.preventDefault();
    e.returnValue = false;
  }

  preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
      this.preventDefault(e);
      return false;
    }
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

  changeCuratedVideo(state){
    //  -1=left , 1=right
    const current = parseInt($('#curated-paging-text').text()[0]);
    const total = videoInformationJson.curated[this.state.currentCurated].video.length;
    let next = current+state;
    if(next <= 0)
      next = total;
    else if(next > total)
      next = 1; 
    
    this.makeCuratedPageNumber(next,this.state.currentCurated);
    const curatedData = videoInformationJson.curated[this.state.currentCurated];
    const soonShowVideoObject = $(this.state.absoluteShow).find('video')[0];

    $(soonShowVideoObject).html('<source src="' + process.env.PUBLIC_URL + '/video/'+ videoInformationJson.data[curatedData.video[next-1]].title +'.mp4" type="video/mp4"></source>');
    $(soonShowVideoObject)[0].load();
    $(soonShowVideoObject)[0].play();

    $(this.state.absoluteHide).css('zIndex',-11);
    $(this.state.absoluteShow).css('zIndex',-10);
    const animeShowOption = {
      targets: this.state.absoluteShow,
      opacity: [0, 1],
      duration: 500,
      easing: 'linear'
    };

    anime(animeShowOption);


    const temp = this.state.absoluteShow;
    this.setState({
      'absoluteShow' : this.state.absoluteHide,
      'absoluteHide' : temp,
      'currentCuratedVideoIndex' : curatedData.video[next-1]
    });
  }

  makeCuratedPageNumber(current,index){
    const total = videoInformationJson.curated[index].video.length;
    const output = current + ' / ' + total;
    $('#curated-paging-text').text(output);
  }

  openCurated(e) {
    const position = this.cumulativeOffset(e.currentTarget);
    const fixedTop = position.top - $(window).scrollTop();
    const currentTime = $(e.currentTarget).find('video')[0].currentTime;
    const curatedIndex = $(e.currentTarget).data('index');
    const curatedData = videoInformationJson.curated[curatedIndex];
    this.makeCuratedPageNumber(1,curatedIndex);
    this.setState({
      currentCurated : curatedIndex,
      currentCuratedVideoIndex : curatedData.video[0]
    });


    $('#curatedVideoContainer').hide();
    $('#curatedVideoContainer').css('top', fixedTop + 'px');
    $('#curatedVideoContainer').css('left', (position.left) + 'px');
    $("#absoluteVideo").html('<source src="' + process.env.PUBLIC_URL + '/video/'+ videoInformationJson.data[curatedData.video[0]].title +'.mp4" type="video/mp4"></source>');
    $("#absoluteVideo")[0].load();
    $("#absoluteVideo")[0].play();
    $("#absoluteVideo")[0].currentTime = currentTime;
    $('#absolute-text1').text($($(e.currentTarget).find('p')[0]).text());
    $('#absolute-text2').html($($(e.currentTarget).find('p')[1]).html());
    $('#curated-information-text-title').text(curatedData.title);
    $('#curated-information-text-location').text(curatedData.description);
    $('#curatedVideoContainer').show();

    // calculate start //
    const windowSize = {
      width: $(window).width(),
      height: $(window).height()
    };
    const containerSize = {
      width: 640,
      height: 340
    };

    const standard = {
      vertical: fixedTop + containerSize.height / 2 < windowSize.height / 2 ? 'top' : 'bottom',
      horizontal: position.left + containerSize.width / 2 < windowSize.width / 2 ? 'left' : 'right'
    };

    const scaleDistance = {
      top: fixedTop,
      bottom: windowSize.height - (fixedTop + containerSize.height),
      left: position.left,
      right: windowSize.width - (position.left + containerSize.width)
    };

    const returnPosition = {
      vertical: fixedTop,
      horizontal: position.left
    };

    if (standard.vertical === 'bottom') {
      $('#curatedVideoContainer').css('top', 'auto')
      $('#curatedVideoContainer').css('bottom', scaleDistance.bottom);
      returnPosition.vertical = scaleDistance.bottom;
    }

    if (standard.horizontal === 'right') {
      $('#curatedVideoContainer').css('left', 'auto')
      $('#curatedVideoContainer').css('right', scaleDistance.right);
      returnPosition.horizontal = scaleDistance.right;
    }

    this.setState({
      returnPosition: returnPosition,
      standard: standard
    });

    const animeDynamicOption = {
      targets: '#curatedVideoContainer',
      width: ['640px', windowSize.width + 'px'],
      height: ['340px', windowSize.height + 'px'],
      duration: 500,
      easing: 'easeInSine'
    }
    animeDynamicOption[standard.horizontal] = 0;
    animeDynamicOption[standard.vertical] = 0;

    const animeHoverHideOption = {
      targets: '#curatedVideoContainer .videoHoverContainer',
      opacity: [1, 0],
      duration: 500,
      easing: 'easeInSine'
    }

    const animeInformationShowOption = {
      targets: '#curated-informationContainer',
      opacity: [0, 1],
      duration: 500,
      easing: 'easeInSine'
    }
    anime(animeInformationShowOption);

    const animeTitleTextShowOption = {
      targets: '#curated-information-text-title',
      opacity: [0, 1],
      bottom: [250, 290],
      duration: 500,
      easing: 'easeOutSine'
    }

    const animeLocationTextShowOption = {
      targets: '#curated-information-text-location',
      opacity: [0, 1],
      bottom: [220, 260],
      delay: 250,
      duration: 500,
      easing: 'easeOutSine'
    }

    const animeBuyButtonShowOption = {
      targets: '#curated-buyButton',
      opacity: [0, 1],
      bottom: [50, 90],
      delay: 500,
      duration: 500,
      easing: 'easeOutSine'
    }

    this.disableScroll();
    const animeHoverHide = anime(animeHoverHideOption);
    const animeDynamic = anime(animeDynamicOption);
    animeDynamic.complete = () => {
      anime(animeTitleTextShowOption);
      anime(animeLocationTextShowOption);
      anime(animeBuyButtonShowOption);
    }
  }

  closeCurated() {
    const windowSize = {
      width: $(window).width(),
      height: $(window).height()
    };

    const animeDynamicReturnOption = {
      targets: '#curatedVideoContainer',
      width: [windowSize.width + 'px', '640px'],
      height: [windowSize.height + 'px', '340px'],
      duration: 500,
      easing: 'easeInSine'
    }
    animeDynamicReturnOption[this.state.standard.horizontal] = this.state.returnPosition.horizontal;
    animeDynamicReturnOption[this.state.standard.vertical] = this.state.returnPosition.vertical;

    // curated-informationContainer

    const animeInformationHideOption = {
      targets: ['#curated-informationContainer', '#curated-information-text-title', '#curated-information-text-location', '#curated-buyButton'],
      opacity: [1, 0],
      duration: 300,
      easing: 'easeInSine'
    }
    anime(animeInformationHideOption);
    const animeDynamicReturn = anime(animeDynamicReturnOption);
    animeDynamicReturn.complete = () => {
      $('#curatedVideoContainer').hide();
      this.enableScroll();
    }

    this.setState({
      absoluteShow : '#secondAbsoluteVideoContainer',
      absoluteHide : '#firstAbsoluteVideoContainer'
    });

    $('#firstAbsoluteVideoContainer').css('zIndex',-10);
    $('#secondAbsoluteVideoContainer').css('zIndex',-11);
    $('#firstAbsoluteVideoContainer').css('opacity',1);
    $('#secondAbsoluteVideoContainer').css('opacity',0);
  }

  curatedVideoRender() {
    const contentVideoStyle = {
      position: 'relative',
      width: '100%',
      height: '340px',
      objectFit: 'cover'
    }

    return (
      <div id="curatedVideoContainer">
        <div className="videoContainer animationSetting" id="firstAbsoluteVideoContainer">
          <video id="absoluteVideo" autoPlay loop muted style={contentVideoStyle} />
          <div className="videoHoverContainer" style={{ display: 'block' }}>
            <div className="videoHover-background"></div>
            <div className="videoHover-textContainer">
              <p id="absolute-text1" className="b margin0" style={{ color: 'white' }}>hello</p>
              <p id="absolute-text2" className="b margin0" style={{ color: 'white', fontSize: '15px' }}><img src={videoIcon} alt="video icon" style={{ width: '12px', verticalAlign: 'middle' }}></img>  12 Video</p>
            </div>
          </div>
        </div>
        <div className="videoContainer animationSetting" id="secondAbsoluteVideoContainer">
          <video id="absoluteVideo2" autoPlay loop muted style={contentVideoStyle} />
          <div className="videoHoverContainer" style={{ display: 'block' }}>
            <div className="videoHover-background"></div>
            <div className="videoHover-textContainer">
              <p id="absolute-text1" className="b margin0" style={{ color: 'white' }}>hello</p>
              <p id="absolute-text2" className="b margin0" style={{ color: 'white', fontSize: '15px' }}><img src={videoIcon} alt="video icon" style={{ width: '12px', verticalAlign: 'middle' }}></img>  12 Video</p>
            </div>
          </div>
        </div>
        <div id="curated-informationContainer">
          <span className="b" id="curated-information-text-title">Iceberg in Iceland</span><br />
          <span className="b" id="curated-information-text-location">Vik, Iceland zoom in footage</span>
          {/* <div id="curated-information-textContainer">
          </div> */}
          <div id="curated-buyButton"><Link style={{textDecoration : 'none', color : 'white'}}to={"/checkout/" + this.state.currentCuratedVideoIndex}><p className="b">buy</p></Link></div>
          <div id="curated-X" onClick={() => { this.closeCurated() }}><img src={image_x} /></div>
          <div id="curated-paging"><span id="curated-paging-text">1 / 5</span></div>
          <div id="curated-information-buttonContainer">
            <img src={image_prev} onClick={()=>{this.changeCuratedVideo(-1)}}/>
            <img src={image_next} onClick={()=>{this.changeCuratedVideo(1)}}/>
          </div>
        </div>
      </div>
    );
  }

  curatedRender() {
    const output = [];

    const contentVideoStyle = {
      position: 'relative',
      width: '100%',
      height: '340px',
      objectFit: 'cover'
    };

    for (let i=0; i<videoInformationJson.curated.length; i++) {
      const data = videoInformationJson.curated[i];

      const contentContainerStyle = {
        width: '640px',
        marginTop: '120px'
      };

      if (i % 2 === 0) {
        contentContainerStyle.marginLeft = '11%';
        contentContainerStyle.marginRight = 'auto';
      }
      else {
        contentContainerStyle.marginRight = '11%';
        contentContainerStyle.marginLeft = 'auto';
      }

      output.push(
        <div className="contentContainer" key={i} style={contentContainerStyle}>
          <div className="videoContainer videoAnimate" id={'videoAnimate' + i} style={{ height: '340px' }} onClick={(e) => { this.openCurated(e) }} onMouseEnter={this.videoContainerMouseEnter} onMouseLeave={this.videoContainerMouseLeave} data-index={i}>
            <video autoPlay loop muted style={contentVideoStyle}>
              <source src={process.env.PUBLIC_URL + '/video/' + videoInformationJson.data[data.video[0]].title + '.mp4'} type="video/mp4" />
              Your browser does not support the video tag.
              </video>
            <div className="videoHoverContainer">
              <div className="videoHover-background"></div>
              <div className="videoHover-textContainer">
                <p className="b margin0" style={{ color: 'white' }}>{data.title}</p>
                <p className="b margin0" style={{ color: 'white', fontSize: '15px' }}><img src={videoIcon} alt="video icon" style={{ width: '12px', verticalAlign: 'middle' }}></img>  {data.video.length} Video</p>
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
    }
    return output;
  }

  render() {
    return (
      <div className="Main">
        {this.curatedVideoRender()}
        <div className="videoContainer" id="mainVideoContainer">
          <video autoPlay loop muted id="mainVideo">
            <source src={mainVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div id="mainContainer">
          <p className="b" style={{ marginBottom: '0px' }}>Curated Collection</p>
          {this.curatedRender()}
        </div>
      </div>
    );
  }
}

export default Main;
