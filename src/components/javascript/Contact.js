/* eslint-disable */
import React, { Component } from 'react';
import '../scss/Contact.scss';
import anime from 'animejs';
import $ from 'jquery';
import nextImage from '../resource/image/next.png';

class Contact extends Component {

  constructor(props) {
    super(props);
    this.messeage = ["what is your name?", "your email address", "leave us a message"];
    this.placeholder = ['My name is', 'Email address', 'Message'];
    this.showOption = (id, delay) => {
      if (delay === undefined) delay = 0;
      return {
        targets: id,
        opacity: [0, 1],
        'margin-left': ['-10px', '0px'],
        duration: 400,
        easing: 'easeInSine'
      };
    };
    this.state = {
      questionState: 0,
    }

    this.nextStep = this.nextStep.bind(this);
  }

  componentDidMount() {
    this.helloTimeline();

    $('input').keyup((e) => {
      const mrspan = document.getElementById("mrspan");
      mrspan.innerText = e.currentTarget.value;
      const width = mrspan.offsetWidth + 40 < 50 ? 50 : mrspan.offsetWidth + 40;
      $('input').width(width);
      $('input').attr("placeholder", "")
    })
  }

  componentDidUpdate() {
    if (this.state.questionState === 0) {
      this.helloTimeline();
    }
    else {
      this.defaultTimeline();
    }
  }

  helloTimeline() {
    const helloAnimation = anime(this.showOption(this.refs.animHello));
    helloAnimation.complete = () => {
      this.defaultTimeline();
    }
  }

  defaultTimeline() {
    const questionAnimation = anime(this.showOption(this.refs.animQuestion));
    questionAnimation.complete = () => {
      const answerAnimation = anime(this.showOption(this.refs.animAnswer));
    }
  }

  nextStep() {
    if(this.state.questionState == 2){
      alert('send complete');
      return;
    }
    const coverAnimationOption = {
      targets: '#blackContainer',
      left : ['-100%','0%'],
      duration: 800,
      easing: 'easeInOutQuart'
    };

    const hideTargets = [this.refs.animHello, this.refs.animQuestion, this.refs.animAnswer];
    if(this.state.questionState !== 0)
      hideTargets.shift();
    const hideAnimationOption = {
      targets: hideTargets,
      opacity : [1,0],
      duration: 800,
      easing: 'easeInOutQuart'
    }

    const coverAnimation = anime(coverAnimationOption);
    anime(hideAnimationOption);

    const current = this.state.questionState + 1;
    if(current == 2){
      // $('#textContainer p').css('color','#898888');
      $('#textContainer p').text('Send');
    }
    coverAnimation.complete = () => {
      $(this.refs.animAnswer).val('');
      $(this.refs.animAnswer).width(300);
      coverAnimationOption.left = ['0%','100%'];
      if(current == 2){
        $('#textContainer p').css('color','white');
      }
      this.setState({
        questionState: current
      });
      // $([this.refs.animHello, this.refs.animQuestion, this.refs.animAnswer]).css('opacity', 0);
      anime(coverAnimationOption);
    };
  }

  render() {
    return (
      <div className="Contact">
        <div className="container marginContainer">
          <div id="question">
            {this.state.questionState === 0 ? <p className="b ib textDefault" id="hello" ref="animHello">Hello!</p> : ''}
            <p className="b ib textDefault" ref="animQuestion">{this.messeage[this.state.questionState]}</p>
          </div>
          <div id="answer">
            <input className="textDefault" ref="animAnswer" placeholder={this.placeholder[this.state.questionState]}></input>
            <span id="mrspan" className="b" style={{ position: 'absolute', left: '-100%', opacity: 0, fontSize: '20px' }}></span>
          </div>
          <div id="button" onClick={this.nextStep}>
            <div id="textContainer">
              <p className="l">Next step</p><img src={nextImage} />
            </div>
            <div id="blackContainer"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
