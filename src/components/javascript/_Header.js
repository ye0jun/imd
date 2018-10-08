import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../scss/_Header.scss';
import logoBlack from '../resource/image/imd_logo_black.png';
import logoWhite from '../resource/image/imd_logo_white.png';

class Header extends Component {

  constructor(props) {
    super(props);
    const pathName = this.props.location.pathname;
    this.state = {
      position : pathName == '/' ? 'absolute' : 'relative',
      zIndex : pathName == '/' ? '1' : '0',
      color : pathName == '/' ? 'white' : 'black',
      pathName : pathName
    };
  }

  componentDidUpdate(){
    const pathName = this.props.location.pathname;
    if(this.state.pathName != pathName){
      this.setState({
        position : pathName == '/' ? 'absolute' : 'relative',
        zIndex : pathName == '/' ? '1' : '0',
        color : pathName == '/' ? 'white' : 'black',
        pathName : pathName
      })
    }
    console.log(this.state);
  }

  render() {
    const logo = this.props.location.pathname == '/' ?  logoWhite : logoBlack;
    const headerStyle = {
      position: this.state.position,
      zIndex: this.state.zIndex
    }

    const headerFontColor = {
      color: this.state.color
    }
    return (
      <div className="Header" style={headerStyle}>
        <div className="gnb-container">
          <div id="logo">
            <Link to=""><img id="logo-image" src={logo} /></Link>
          </div>
          <ul className="menu-items">
            <li><Link style={headerFontColor} to="footage">footage</Link></li>
            <li><Link style={headerFontColor} to="about">about</Link></li>
            <li><Link style={headerFontColor} to="work">work</Link></li>
            <li><Link style={headerFontColor} to="contact">contact</Link></li>
            <li><Link style={headerFontColor} to="signin">sign in</Link></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Header;
