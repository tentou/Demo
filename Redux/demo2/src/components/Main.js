require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

import yeomanImage from '../images/yeoman.png'
//let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classNew:{
       fontSize: '12px'
      }
    }
  }
  handleClick(e){
    this.setState({
      classNew:{
        fontSize: '59px'
      }
    })
  }
  render() {
    var stateStyle = this.state.classNew;     //这个stateStyle必须是一个对象，因为style={} 接受的参数是一个对象
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <div style={stateStyle} onClick={this.handleClick.bind(this)}>Please edi to get started!</div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
