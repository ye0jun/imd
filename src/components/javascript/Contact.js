/* eslint-disable */ 
import React, { Component } from 'react';
import '../scss/Contact.scss';
import ScrollReveal from 'scrollreveal'
import $ from 'jquery';

class Contact extends Component {
  componentDidMount(){
    const srInformationOption = {
      reset: false,
      origin: 'left',
      delay: 250,
    }
    let tapeAnimation = function(){
      ScrollReveal().reveal(".askName", srInformationOption);
    };

    let $root = $("#root");
    $root.show();
    tapeAnimation();
  }
  render() {
    return (
      
      <div className="Contact">
        <div id="contact" >
          <div className="askContainer marginContainer">
            <div className="askName b">
            Hello!
            <br></br> What is your name?
            </div>
            <input className="b" type="text" ref={this.input} />
            <div className="inputStyle"></div>
          </div> 
        </div>
      </div>
    );
  }
}

export default Contact;
