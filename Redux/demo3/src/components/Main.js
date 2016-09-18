require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import {connect} from 'react-redux';
import {changeStyle} from '../actions/actions.js'

import yeomanImage from '../images/yeoman.png'
//let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   classNew:{
    //     fontSize: '12px'
    //   }
    // }
  }
  handleClick(e){
    this.props.changeStyles;
    // this.setState({
    //   classNew:{
    //     fontSize: '59px'
    //   }
    // })
  }
  render() {
    const {dispatch,propsStyle} = this.props;

    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        {/*<div style={stateStyle} onClick={this.handleClick.bind(this)}>Please edi to get started!</div>*/}
        <div style={propsStyle} changeStyle={dispatch(changeStyle())} onClick={this.handleClick.bind(this)}>Please edi to get started!</div>
      </div>
    );
  }
}

function select(state) {
  return {
    propsStyle:state.propsStyle  //后边这个propsStyle是从reducers传来的
  }
}

 export default connect(select)(AppComponent);
//export default AppComponent;
