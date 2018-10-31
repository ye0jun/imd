/* eslint-disable */
import React, { Component } from 'react';
import '../scss/_AnimationText.scss';
import $ from 'jquery';
import anime from 'animejs';

class AnimationText extends Component {

  constructor(props) {
    super(props);
    this.state = {
      containerWidth: 0,
      containerHeight: 0,
      textHeight: 0
    };

    this.show = this.show.bind(this);
  }

  componentDidMount() {

    const containerWidth = $(this.refs.container).width();
    const textHeight = $(this.refs.text_0).height();
    $(this.refs.container).height(textHeight-(textHeight*(1/11)));
    const containerHeight = $(this.refs.container).height();

    this.setState({
      containerWidth: containerWidth,
      containerHeight: containerHeight
    });

    $('.f-t').css('display', 'flex');
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  show(index, direction, delay, callback) {
    const startPosition = direction === 'up' ? this.state.containerHeight : -this.state.containerHeight;
    const topCSS = [startPosition, 0];
    $(this.refs['text_' + index]).css('display', 'inline-table');
    delay = delay === undefined ? 0 : delay;
    const animeOption = {
      targets: this.refs['text_' + index],
      top: topCSS,
      duration: 800,
      delay : delay,
      easing: 'easeInOutQuart'
    }

    const animation = anime(animeOption);
    if (callback !== undefined)
      animation.complete = callback;
  }

  hide(index, direction, delay, callback) {
    const endPosition = direction === 'down' ? this.state.containerHeight : -this.state.containerHeight;
    const topCSS = [0, endPosition];
    delay = delay === undefined ? 0 : delay;
    const animeOption = {
      targets: this.refs['text_' + index],
      top: topCSS,
      duration: 800,
      delay : delay,
      easing: 'easeInOutQuart'
    }

    const animation = anime(animeOption);
    if (callback !== undefined)
      animation.complete = callback;
  }

  render() {
    const option = this.props.option;
    const textStyle = {};
    for (let key in option) {
      textStyle[key] = option[key];
    }

    let thickness = this.props.bold ? 'b' : 'l';
    let className = thickness + " margin0 f-t";

    return (
      <div className="AnimationText" ref="container">
        {this.props.text.map((value, index) => {
          if (index === 1)
            className = thickness + " margin0";

          return (
            <span className={className} ref={"text_" + index} style={textStyle} key={index}>
              {value}
            </span>
          );
        })}
      </div>
    );
  }
}

export default AnimationText;
