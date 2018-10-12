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
      position : pathName === '/' ? 'absolute' : 'relative',
      zIndex : pathName === '/' ? '1' : '0',
      color : pathName === '/' ? 'white' : 'black',
      pathName : pathName
    };
  }

  componentDidUpdate(){
    const pathName = this.props.location.pathname;
    if(this.state.pathName !== pathName){
      this.setState({
        position : pathName === '/' ? 'absolute' : 'relative',
        zIndex : pathName === '/' ? '1' : '0',
        color : pathName === '/' ? 'white' : 'black',
        pathName : pathName
      })
    }
  }

  render() {
    const logo = this.props.location.pathname === '/' ?  logoWhite : logoBlack;
    const headerStyle = {
      position: this.state.position,
      zIndex: this.state.zIndex
    }
    const menus = ['footage','about','work','contact','sign in'];

    
    return (
      <div className="Header" style={headerStyle}>
        <div className="gnb-container">
          <div id="logo">
            <Link to=""><img id="logo-image" src={logo} alt="logo"/></Link>
          </div>
          <ul className="menu-items">
          {menus.map((value,key)=>{
            const headerFontStyle = {
              color: this.state.color,
              fontFamily : "CamptonLight"
            }
            if(this.state.pathName === '/'){
              headerFontStyle.fontFamily = "CamptonBold";
            }
            else if(this.state.pathName.substr(1,this.state.pathName.length-1) === value){
              headerFontStyle.fontFamily = "CamptonBold";
            }
            
            return <li key={key}><Link style={headerFontStyle} to={value}>{value}</Link></li>;
          })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Header;
